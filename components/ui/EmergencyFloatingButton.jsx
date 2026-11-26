"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PhoneCall, X, ShieldAlert, Heart, ChevronRight, Activity } from "lucide-react";

export default function EmergencyFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 print:hidden">
      {/* Emergency Drawer / Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border-2 border-red-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-red-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-300" />
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-wider">Emergency Helplines</h3>
                <p className="text-[10px] text-red-100">Toll-free 24/7 across Pakistan</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded-full text-white transition-colors"
              aria-label="Close emergency helper"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 space-y-2 text-xs">
            {/* Rescue 1122 */}
            <a
              href="tel:1122"
              className="flex items-center justify-between p-2.5 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-red-950">Rescue 1122</p>
                  <p className="text-[10px] text-red-700">Medical, Trauma & Fire Rescue</p>
                </div>
              </div>
              <span className="text-xs font-bold text-red-700 font-mono bg-white px-2 py-1 rounded-lg border border-red-200 group-hover:bg-red-600 group-hover:text-white transition-colors">
                Dial 1122
              </span>
            </a>

            {/* Edhi 115 */}
            <a
              href="tel:115"
              className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-amber-950">Edhi Foundation</p>
                  <p className="text-[10px] text-amber-700">Nationwide Emergency Dispatch</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-800 font-mono bg-white px-2 py-1 rounded-lg border border-amber-200 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                Dial 115
              </span>
            </a>

            {/* Sehat Tahaffuz 0800 */}
            <a
              href="tel:080009009"
              className="flex items-center justify-between p-2.5 rounded-2xl bg-brand-mint/60 hover:bg-brand-mint border border-brand-teal/20 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-teal text-white flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-brand-navy">Sehat Tahaffuz</p>
                  <p className="text-[10px] text-brand-muted">Public Health Guidance Desk</p>
                </div>
              </div>
              <span className="text-xs font-bold text-brand-teal font-mono bg-white px-2 py-1 rounded-lg border border-brand-teal/20 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                0800-09009
              </span>
            </a>

            {/* Link to dedicated emergency full page */}
            <div className="pt-1 border-t border-brand-border">
              <Link
                href="/emergency"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 bg-brand-navy hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Full Emergency Triage Guide</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl hover:shadow-red-500/30 transition-all font-bold text-xs tracking-wide focus:outline-none focus:ring-4 focus:ring-red-300"
        aria-label="Open emergency numbers"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <PhoneCall className="w-4 h-4" />
        <span className="font-mono">1122 Emergency</span>
      </button>
    </div>
  );
}
