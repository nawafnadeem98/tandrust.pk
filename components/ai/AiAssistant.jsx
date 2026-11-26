"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const TXT = {
  en: { ph: "Type your health question", send: "Send", empty: "Ask a general health question. You can type, or tap the microphone and speak.", think: "Thinking…",
    disc: "General information only. This assistant is not a doctor and cannot diagnose. In an emergency call Rescue 1122.", listen: "🔊 Listen to Answer", stop: "Stop", pause: "Pause", resume: "Resume", again: "Listen again",
    mic: "Start voice input", micStop: "Stop voice input", noSr: "Voice input is not supported in this browser. Please type your question.", noTts: "Listening to answers is not supported in this browser. The written answer is still available.",
    denied: "Microphone permission was denied. Allow microphone access in your browser settings, or type your question.", srErr: "Voice input failed. Please try again or type.", hear: "Listening… speak now",
    notCfg: "The AI service is not configured on this server yet (an API key is required).", fail: "The assistant could not answer. Check your connection and try again.", retry: "Retry", auto: "Read answers aloud automatically",
    ex: ["What are common signs of anaemia?", "How can I prepare for a doctor's visit?", "What should I know about PCOS?", "When is a fever an emergency?"] },
  ur: { ph: "اپنا صحت کا سوال لکھیں", send: "بھیجیں", empty: "صحت سے متعلق عمومی سوال پوچھیں۔ آپ لکھ سکتے ہیں یا مائیک دبا کر بول سکتے ہیں۔", think: "سوچ رہا ہے…",
    disc: "صرف عمومی معلومات۔ یہ اسسٹنٹ ڈاکٹر نہیں ہے اور تشخیص نہیں کر سکتا۔ ہنگامی صورت میں 1122 پر کال کریں۔", listen: "🔊 جواب سنیں", stop: "روکیں", pause: "وقفہ", resume: "جاری رکھیں", again: "دوبارہ سنیں",
    mic: "آواز سے سوال شروع کریں", micStop: "آواز بند کریں", noSr: "اس براؤزر میں آواز سے سوال ممکن نہیں۔ براہ کرم لکھیں۔", noTts: "اس براؤزر میں جواب سننا ممکن نہیں۔ تحریری جواب موجود ہے۔",
    denied: "مائیک کی اجازت نہیں ملی۔ براؤزر کی سیٹنگز میں اجازت دیں یا لکھ کر پوچھیں۔", srErr: "آواز پہچاننے میں مسئلہ آیا۔ دوبارہ کوشش کریں یا لکھیں۔", hear: "سن رہا ہے… بولیں",
    notCfg: "اس سرور پر AI سروس ابھی سیٹ نہیں ہے (API کلید درکار ہے)۔", fail: "اسسٹنٹ جواب نہیں دے سکا۔ انٹرنیٹ چیک کریں اور دوبارہ کوشش کریں۔", retry: "دوبارہ کوشش", auto: "جوابات خود بخود سنائیں",
    ex: ["خون کی کمی کی عام علامات کیا ہیں؟", "ڈاکٹر کے پاس جانے کی تیاری کیسے کروں؟", "PCOS کے بارے میں کیا جاننا چاہیے؟", "بخار کب ایمرجنسی بنتا ہے؟"] },
};

export default function AiAssistant() {
  const { isUrdu } = useLanguage();
  const t = isUrdu ? TXT.ur : TXT.en;
  const lang = isUrdu ? "ur" : "en";
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");
  const [caps, setCaps] = useState({ sr: false, tts: false });
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  const rec = useRef(null), tok = useRef(0), end = useRef(null);

  useEffect(() => {
    setCaps({ sr: !!(window.SpeechRecognition || window.webkitSpeechRecognition), tts: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window });
    return () => { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); if (rec.current) rec.current.abort(); };
  }, []);
  useEffect(() => { if (end.current) end.current.scrollIntoView({ block: "end" }); }, [msgs, busy]);

  function stopSpeech() { tok.current++; if (caps.tts) window.speechSynthesis.cancel(); setSpeaking(-1); setPaused(false); }

  function listen(i, text) {
    if (!caps.tts) { setNote(t.noTts); return; }
    stopSpeech();
    const my = tok.current;
    const parts = text.match(/[^.!?۔\n]+[.!?۔]?/g) || [text];
    parts.forEach((p, k) => {
      const u = new SpeechSynthesisUtterance(p.trim());
      u.lang = isUrdu ? "ur-PK" : "en-US";
      if (k === parts.length - 1) u.onend = u.onerror = () => { if (tok.current === my) setSpeaking(-1); };
      window.speechSynthesis.speak(u);
    });
    setSpeaking(i);
  }

  async function send(text, base) {
    const q = (text || "").trim();
    if (!q || busy) return;
    if (rec.current && listening) rec.current.abort();
    stopSpeech();
    const history = base || msgs;
    const next = [...history, { role: "user", content: q }];
    setMsgs(next); setInput(""); setErr(""); setNote(""); setBusy(true);
    try {
      const r = await fetch("/api/assistant", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next, lang }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.code === "NOT_CONFIGURED" ? "cfg" : "fail");
      setMsgs([...next, { role: "assistant", content: j.reply }]);
      if (auto && caps.tts) listen(next.length, j.reply);
    } catch (e) { setErr(e.message === "cfg" ? t.notCfg : t.fail); }
    setBusy(false);
  }

  function retry() { const last = msgs[msgs.length - 1]; if (last && last.role === "user") send(last.content, msgs.slice(0, -1)); }

  function mic() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setNote(t.noSr); return; }
    if (listening) { rec.current.stop(); return; }
    stopSpeech();
    const r = new SR();
    r.lang = isUrdu ? "ur-PK" : "en-US"; r.interimResults = true;
    r.onstart = () => { setListening(true); setNote(t.hear); };
    r.onresult = (e) => { let s = ""; for (let i = 0; i < e.results.length; i++) s += e.results[i][0].transcript; setInput(s); };
    r.onerror = (e) => setNote(e.error === "not-allowed" || e.error === "service-not-allowed" ? t.denied : t.srErr);
    r.onend = () => { setListening(false); setNote((n) => (n === t.hear ? "" : n)); };
    try { r.start(); rec.current = r; } catch (e) { setNote(t.srErr); }
  }

  const btn = "px-3 py-2 rounded-lg border border-brand-border bg-white text-brand-navy text-sm font-semibold hover:bg-brand-mint min-h-[44px]";
  return (
    <section className="bg-white border border-brand-border rounded-2xl shadow-sm p-4 sm:p-6" aria-label="AI Health Assistant">
      <p className="text-xs text-brand-muted bg-brand-bg border border-brand-border rounded-lg p-3 mb-4">{t.disc}</p>
      <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1" role="log" aria-live="polite" dir={isUrdu ? "rtl" : "ltr"}>
        {!msgs.length && (
          <div>
            <p className="text-brand-muted mb-3">{t.empty}</p>
            <div className="flex flex-wrap gap-2">{t.ex.map((q) => <button key={q} type="button" className={btn} onClick={() => send(q)}>{q}</button>)}</div>
          </div>
        )}
        {msgs.map((m, i) => (
          <div key={i} className={m.role === "user" ? "ml-auto max-w-[88%] bg-brand-teal text-white rounded-2xl p-3" : "max-w-[92%] bg-brand-bg border border-brand-border rounded-2xl p-3" + (speaking === i ? " ring-2 ring-brand-teal" : "")}>
            <p className="whitespace-pre-wrap">{m.content}</p>
            {m.role === "assistant" && (
              <div className="flex flex-wrap gap-2 mt-3">
                <button type="button" className={btn} onClick={() => listen(i, m.content)}>{speaking === i ? t.again : t.listen}</button>
                {speaking === i && (<>
                  <button type="button" className={btn} onClick={() => { if (paused) { window.speechSynthesis.resume(); } else { window.speechSynthesis.pause(); } setPaused(!paused); }}>{paused ? t.resume : t.pause}</button>
                  <button type="button" className={btn} onClick={stopSpeech}>{t.stop}</button>
                </>)}
              </div>
            )}
          </div>
        ))}
        {busy && <p className="text-brand-muted" role="status">{t.think}</p>}
        {err && <p className="text-brand-error" role="alert">{err} {msgs.length > 0 && msgs[msgs.length - 1].role === "user" && <button type="button" className="underline font-semibold" onClick={retry}>{t.retry}</button>}</p>}
        <div ref={end} />
      </div>
      <form className="flex gap-2 mt-4" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder={t.ph} aria-label={t.ph} dir="auto"
          className="flex-1 min-w-0 rounded-xl border border-brand-border px-3 py-3 text-base focus:outline-none focus:ring-2 focus:ring-brand-teal" />
        <button type="button" onClick={mic} aria-label={listening ? t.micStop : t.mic} aria-pressed={listening}
          className={"rounded-xl border px-4 min-h-[48px] font-bold " + (listening ? "bg-red-600 text-white border-red-600" : "bg-white text-brand-navy border-brand-border")}>🎤</button>
        <button type="submit" disabled={busy || !input.trim()} className="rounded-xl bg-brand-navy text-white px-5 min-h-[48px] font-semibold disabled:opacity-50">{t.send}</button>
      </form>
      {caps.tts && <label className="flex items-center gap-2 text-sm text-brand-muted mt-3"><input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />{t.auto}</label>}
      {note && <p className="text-sm text-brand-muted mt-2" role="status">{note}</p>}
    </section>
  );
}
