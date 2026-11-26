import { NextResponse } from "next/server";
const { callAI } = require("@/lib/ai");

const SYSTEM =
  "You translate website text for tandrust.pk, a healthcare website for Punjab, Pakistan, into natural, simple, grammatically correct Urdu. " +
  "Keep brand names (tandrust.pk), phone numbers, numbers, URLs and abbreviations such as CPR, BMI, PCOS in their original form or with the common Urdu name. " +
  "Medical meaning must stay accurate. Do not add explanations. Return ONLY a JSON array of strings with exactly the same number of items, in the same order.";
const hits = new Map();

export async function POST(request) {
  const ip = (request.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (recent.length >= 60) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 }); }
  const texts = Array.isArray(body.texts) ? body.texts : [];
  const total = texts.reduce((n, s) => n + (typeof s === "string" ? s.length : 99999), 0);
  if (!texts.length || texts.length > 30 || total > 8000 || texts.some((s) => typeof s !== "string" || !s.trim() || s.length > 400))
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });

  try {
    const prompt = `Translate these ${texts.length} texts into Urdu. Return a JSON array of exactly ${texts.length} strings.\n` + JSON.stringify(texts);
    const reply = await callAI([{ role: "user", content: prompt }], "ur", SYSTEM, 2500);
    const m = reply.match(/\[[\s\S]*\]/);
    const out = m ? JSON.parse(m[0]) : null;
    if (!Array.isArray(out) || out.length !== texts.length || out.some((s) => typeof s !== "string")) throw new Error("bad shape");
    return NextResponse.json({ translations: out });
  } catch (e) {
    if (e.code === "NOT_CONFIGURED") return NextResponse.json({ code: "NOT_CONFIGURED" }, { status: 503 });
    console.error("translate error:", e.message);
    return NextResponse.json({ error: "AI_UNAVAILABLE" }, { status: 502 });
  }
}
