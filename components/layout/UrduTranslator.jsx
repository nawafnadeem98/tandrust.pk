"use client";

import { useEffect } from "react";
import { lookupCurated } from "@/lib/urduDictionary";

// When the site language is Urdu: replaces English text on the page with Urdu (curated dictionary first,
// then the server-side AI translator, cached in the browser). Switching back to English restores the original text.
const KEY = "tp-ur-cache-v1";
const SKIP = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA", "NOSCRIPT", "SVG", "INPUT"]);
const norm = (s) => s.replace(/\s+/g, " ").trim();
const needs = (s) =>
  /[A-Za-z]{2,}/.test(s) && !/[\u0600-\u06FF]/.test(s) && !/^(https?:|www\.|\S+@\S+$)/i.test(s) &&
  !/^(tandrust\.pk|Rescue 1122|Edhi 115|1122|115|Ctrl\+K)$/i.test(s) && s.length <= 400;

export default function UrduTranslator() {
  useEffect(() => {
    let cache = {};
    try { cache = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) {}
    const orig = new WeakMap();
    const pending = new Set();
    let timer = null, busy = false, unavailable = false, fails = 0, obsTimer = null;
    const isUr = () => document.documentElement.lang === "ur";
    const lookup = (en) => lookupCurated(en) || cache[en] || null;

    const walk = (fn) => {
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode: (n) => {
          const p = n.parentElement;
          if (!p || SKIP.has(p.tagName.toUpperCase()) || p.closest('[translate="no"],.notranslate,#tp-ur-note')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
      let n;
      while ((n = w.nextNode())) fn(n);
    };

    const note = (on) => {
      let el = document.getElementById("tp-ur-note");
      if (!on) { if (el) el.remove(); return; }
      if (el) return;
      el = document.createElement("div");
      el.id = "tp-ur-note"; el.setAttribute("translate", "no"); el.setAttribute("dir", "ltr");
      el.style.cssText = "position:fixed;left:8px;right:8px;bottom:8px;z-index:60;background:#fffbeb;color:#78350f;border:1px solid #fcd34d;border-radius:10px;padding:8px 12px;font:13px Arial,sans-serif;text-align:center";
      el.textContent = "Full Urdu translation needs the AI key (AI_API_KEY) on the server. Only the built-in Urdu text is shown for now.";
      document.body.appendChild(el);
    };

    const apply = () => {
      if (!isUr()) return;
      walk((n) => {
        const rec = orig.get(n);
        if (rec && n.nodeValue === rec.ur) return;
        const raw = n.nodeValue, en = norm(raw);
        if (!needs(en)) return;
        const ur = lookup(en);
        if (ur) {
          const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
          orig.set(n, { en: raw, ur: lead + ur + trail });
          n.nodeValue = lead + ur + trail;
        } else if (!unavailable) pending.add(en);
      });
      document.querySelectorAll("input[placeholder],textarea[placeholder]").forEach((el) => {
        const en = el.getAttribute("data-en-ph") || el.getAttribute("placeholder");
        if (!needs(norm(en))) return;
        const ur = lookup(norm(en));
        if (ur) { el.setAttribute("data-en-ph", en); el.setAttribute("placeholder", ur); }
        else if (!unavailable) pending.add(norm(en));
      });
      if (pending.size && !timer) timer = setTimeout(flush, 500);
    };

    const restore = () => {
      walk((n) => { const rec = orig.get(n); if (rec && n.nodeValue === rec.ur) n.nodeValue = rec.en; orig.delete(n); });
      document.querySelectorAll("[data-en-ph]").forEach((el) => { el.setAttribute("placeholder", el.getAttribute("data-en-ph")); el.removeAttribute("data-en-ph"); });
      pending.clear(); note(false);
    };

    const flush = async () => {
      timer = null;
      if (busy || !isUr()) return;
      const batch = Array.from(pending).slice(0, 25);
      if (!batch.length) return;
      busy = true;
      try {
        const r = await fetch("/api/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ texts: batch }) });
        if (r.status === 503) { unavailable = true; pending.clear(); note(true); return; }
        if (!r.ok) throw new Error("fail");
        const j = await r.json();
        batch.forEach((en, i) => { if (j.translations[i]) cache[en] = j.translations[i]; pending.delete(en); });
        try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {}
        fails = 0;
        apply();
      } catch (e) {
        batch.forEach((s) => pending.delete(s));
        if (++fails >= 3) { unavailable = true; note(true); }
      } finally { busy = false; if (pending.size && !timer) timer = setTimeout(flush, 500); }
    };

    const onMutate = () => { clearTimeout(obsTimer); obsTimer = setTimeout(apply, 200); };
    const mo = new MutationObserver(onMutate);
    mo.observe(document.body, { childList: true, subtree: true, characterData: true });
    const lo = new MutationObserver(() => { if (isUr()) { unavailable = false; fails = 0; apply(); } else restore(); });
    lo.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    apply();
    return () => { mo.disconnect(); lo.disconnect(); clearTimeout(timer); clearTimeout(obsTimer); };
  }, []);
  return null;
}
