"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AlertCircle, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState([]);
  const [dismissed, setDismissed] = useState(false);
  const { isUrdu } = useLanguage();

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (data.announcements && data.announcements.length > 0) {
          setAnnouncements(data.announcements);
        }
      })
      .catch(() => {});
  }, []);

  if (dismissed || announcements.length === 0) return null;

  const current = announcements[0];
  const title = isUrdu && current.urduTitle ? current.urduTitle : current.title;
  const message = isUrdu && current.urduMessage ? current.urduMessage : current.message;

  return (
    <div
      role="region"
      aria-label="Public Health Announcement"
      className="bg-brand-navy text-white text-sm py-2 px-4 border-b border-brand-teal/40 relative"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-brand-navy">
            <AlertCircle className="w-3.5 h-3.5" />
          </span>
          <p className="truncate text-xs md:text-sm">
            <strong className="font-semibold text-amber-300 mr-2">{title}:</strong>
            <span className="text-slate-200">{message}</span>
          </p>
          {current.link && (
            <Link
              href={current.link}
              className="hidden sm:inline-flex items-center gap-1 text-xs text-brand-mint hover:underline font-medium flex-shrink-0"
            >
              <span>{isUrdu ? "مزید تفصیلات" : "Read Advisory"}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-white/10 rounded text-slate-300 hover:text-white transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
