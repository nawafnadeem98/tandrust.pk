import { NextResponse } from "next/server";
const { callAI } = require("@/lib/ai");

const RED = /chest pain|can.?t breathe|cannot breathe|difficulty breathing|unconscious|seizure|stroke|heavy bleeding|vomiting blood|suicid|kill myself|overdose|poison|snake ?bite|سینے میں درد|سانس|بے ?ہوش|دورہ|فالج|زہر|خودکشی/i;
const hits = new Map(); // simple per-IP limit (use Redis/Upstash in multi-server deployments)

export async function POST(request) {
  const ip = (request.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 600000);
  if (recent.length >= 20) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 }); }
  let msgs = Array.isArray(body.messages) ? body.messages : [];
  msgs = msgs.filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10).map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length || msgs[msgs.length - 1].role !== "user") return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });

  const lang = body.lang === "ur" ? "ur" : "en";
  if (RED.test(msgs[msgs.length - 1].content)) {
    return NextResponse.json({ reply: lang === "ur"
      ? "یہ ہنگامی صورتحال ہو سکتی ہے۔ فوراً 1122 پر کال کریں یا قریبی ہسپتال جائیں۔"
      : "This may be an emergency. Call Rescue 1122 now or go to the nearest hospital. Do not wait for an online answer." });
  }
  try {
    const reply = await callAI(msgs, lang);
    if (!reply) throw new Error("empty");
    return NextResponse.json({ reply });
  } catch (e) {
    if (e.code === "NOT_CONFIGURED") return NextResponse.json({ code: "NOT_CONFIGURED", error: "AI is not configured" }, { status: 503 });
    console.error("assistant error:", e.message);
    return NextResponse.json({ error: "AI_UNAVAILABLE" }, { status: 502 });
  }
}
