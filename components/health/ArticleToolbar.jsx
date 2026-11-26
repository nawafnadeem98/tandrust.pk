"use client";

import React, { useState, useEffect } from "react";
import {
  Bookmark,
  Printer,
  Share2,
  Volume2,
  VolumeX,
  Type,
  Check,
  Loader2,
} from "lucide-react";

export default function ArticleToolbar({ title, articleId, articleType = "CONDITION", textContent }) {
  const [fontSize, setFontSize] = useState("normal"); // 'normal' | 'large' | 'xl'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // Apply font size class to article body
  useEffect(() => {
    const articleBody = document.querySelector("article");
    if (!articleBody) return;

    articleBody.classList.remove("text-base", "text-lg", "text-xl");
    if (fontSize === "large") {
      articleBody.classList.add("text-lg");
    } else if (fontSize === "xl") {
      articleBody.classList.add("text-xl");
    } else {
      articleBody.classList.add("text-base");
    }
  }, [fontSize]);

  // Audio Speech Synthesis
  const handleToggleSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported by your current browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = textContent || `${title}. Welcome to tandrust.pk medical awareness portal.`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  // Save Bookmark
  const handleToggleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/patient/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: articleType,
          itemId: articleId,
          title,
        }),
      });

      if (res.ok) {
        setIsSaved(true);
      } else {
        // If not logged in, prompt user
        if (res.status === 401) {
          alert("Please sign in to your My tandrust.pk account to bookmark articles.");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  // Copy Link
  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Print
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-brand-bg rounded-2xl border border-brand-border text-xs text-brand-navy">
      {/* Font Size Adjuster */}
      <div className="flex items-center gap-1.5">
        <span className="font-semibold text-brand-muted flex items-center gap-1">
          <Type className="w-3.5 h-3.5" />
          <span>Text:</span>
        </span>
        <button
          onClick={() => setFontSize("normal")}
          className={`px-2 py-1 rounded-lg font-bold transition-colors ${
            fontSize === "normal" ? "bg-white shadow-2xs text-brand-teal" : "text-brand-muted hover:text-brand-navy"
          }`}
          title="Normal Text Size"
        >
          A
        </button>
        <button
          onClick={() => setFontSize("large")}
          className={`px-2 py-1 rounded-lg font-bold text-sm transition-colors ${
            fontSize === "large" ? "bg-white shadow-2xs text-brand-teal" : "text-brand-muted hover:text-brand-navy"
          }`}
          title="Large Text Size"
        >
          A+
        </button>
        <button
          onClick={() => setFontSize("xl")}
          className={`px-2 py-1 rounded-lg font-bold text-base transition-colors ${
            fontSize === "xl" ? "bg-white shadow-2xs text-brand-teal" : "text-brand-muted hover:text-brand-navy"
          }`}
          title="Extra Large Text Size"
        >
          A++
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Audio Reader */}
        <button
          onClick={handleToggleSpeech}
          className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
            isPlayingAudio
              ? "bg-amber-100 text-amber-900 border border-amber-300"
              : "bg-white border border-brand-border hover:bg-slate-50 text-brand-navy"
          }`}
          title={isPlayingAudio ? "Stop Audio" : "Listen to this guide"}
        >
          {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5 text-amber-700 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5 text-brand-teal" />}
          <span>{isPlayingAudio ? "Stop Audio" : "Listen (Audio)"}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={handleToggleSave}
          disabled={saving}
          className={`px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 transition-colors ${
            isSaved
              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
              : "bg-white border border-brand-border hover:bg-slate-50 text-brand-navy"
          }`}
          title="Save to My tandrust.pk Account"
        >
          {saving ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-emerald-700 text-emerald-700" : "text-brand-muted"}`} />
          )}
          <span>{isSaved ? "Bookmarked" : "Save"}</span>
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          className="px-3 py-1.5 bg-white border border-brand-border hover:bg-slate-50 rounded-xl font-semibold flex items-center gap-1.5 text-brand-navy transition-colors print:hidden"
          title="Print or Save PDF"
        >
          <Printer className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Print / PDF</span>
        </button>

        {/* Share */}
        <button
          onClick={handleCopyLink}
          className="px-3 py-1.5 bg-white border border-brand-border hover:bg-slate-50 rounded-xl font-semibold flex items-center gap-1.5 text-brand-navy transition-colors print:hidden"
          title="Share Link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
          <span>{copied ? "Copied!" : "Share"}</span>
        </button>
      </div>
    </div>
  );
}
