// Provider-agnostic AI call. Configure with env vars (see .env.example). Keys stay on the server.
const SYSTEM = (lang) =>
  "You are the AI Health Assistant of tandrust.pk, a healthcare information website for Pakistan. " +
  "Give general, easy-to-understand health information. Never claim to diagnose or to be a doctor, never give prescription doses, and never invent facts, statistics, clinics or doctors. " +
  "Treat women's health questions respectfully and sensitively. For serious or urgent symptoms tell the user to get professional care now and call Rescue 1122 in Pakistan. " +
  "Keep answers under 150 words and remind the user to consult a qualified healthcare professional when relevant. Reply in " + (lang === "ur" ? "Urdu" : "English") + ".";

async function callAI(messages, lang, system, maxTokens) {
  const provider = (process.env.AI_PROVIDER || "anthropic").toLowerCase();
  const key = process.env.AI_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (!key) { const e = new Error("AI is not configured"); e.code = "NOT_CONFIGURED"; throw e; }
  const ctl = new AbortController();
  const tm = setTimeout(() => ctl.abort(), 20000);
  try {
    if (provider === "anthropic") {
      const r = await fetch((process.env.AI_BASE_URL || "https://api.anthropic.com") + "/v1/messages", {
        method: "POST", signal: ctl.signal,
        headers: { "content-type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: process.env.AI_MODEL || "claude-sonnet-4-6", max_tokens: maxTokens || 500, system: system || SYSTEM(lang), messages }),
      });
      if (!r.ok) throw new Error("upstream " + r.status);
      const j = await r.json();
      return (j.content || []).map((b) => b.text || "").join("").trim();
    }
    // any OpenAI-compatible provider
    const r = await fetch((process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "") + "/chat/completions", {
      method: "POST", signal: ctl.signal,
      headers: { "content-type": "application/json", authorization: "Bearer " + key },
      body: JSON.stringify({ model: process.env.AI_MODEL, max_tokens: maxTokens || 500, messages: [{ role: "system", content: system || SYSTEM(lang) }, ...messages] }),
    });
    if (!r.ok) throw new Error("upstream " + r.status);
    const j = await r.json();
    return ((j.choices && j.choices[0] && j.choices[0].message.content) || "").trim();
  } finally { clearTimeout(tm); }
}
module.exports = { callAI };
