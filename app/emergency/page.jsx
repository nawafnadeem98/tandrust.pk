import React from "react";
import Link from "next/link";
import { PhoneCall, AlertOctagon, Heart, ShieldAlert, ArrowRight, ChevronRight, Activity, Flame, Zap } from "lucide-react";
const { EMERGENCY_SERVICES } = require("@/lib/constants");

export const metadata = {
  title: "Emergency Help & Verified Helplines | tandrust.pk",
  description: "Immediate emergency numbers for Rescue 1122, Edhi 115 and mental health crisis support in Punjab.",
};

export default function EmergencyHubPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Emergency</span>
      </nav>

      {/* Primary Emergency Banner (Fast, high contrast, zero delay) */}
      <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-12 shadow-2xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center flex-shrink-0">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-red-200">
              National Emergency Medical Response
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Emergency Help in Pakistan
            </h1>
          </div>
        </div>

        <p className="text-base sm:text-lg text-red-100 max-w-3xl leading-relaxed font-medium">
          If someone is unresponsive, choking, having crushing chest pain, experiencing severe bleeding, or suffering from acute breathing difficulty, call emergency services immediately.
        </p>

        {/* Large One-Tap Calling Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <a
            href="tel:1122"
            className="p-5 bg-white text-red-700 hover:bg-red-50 rounded-2xl text-center shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center"
          >
            <PhoneCall className="w-6 h-6 mb-1 text-red-600" />
            <span className="text-2xl font-black">Rescue 1122</span>
            <span className="text-xs text-slate-600 font-semibold mt-0.5">Punjab</span>
          </a>

          <a
            href="tel:115"
            className="p-5 bg-red-800 text-white hover:bg-red-900 rounded-2xl text-center shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center border border-red-700"
          >
            <PhoneCall className="w-6 h-6 mb-1 text-amber-400" />
            <span className="text-2xl font-black">Edhi 115</span>
            <span className="text-xs text-red-200 font-semibold mt-0.5">Nationwide Ambulance Fleet</span>
          </a>

        </div>
      </div>

      {/* Sub-sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/emergency/when-to-seek-help"
          className="bg-white p-6 rounded-3xl border border-brand-border hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-brand-navy text-lg group-hover:text-red-700 transition-colors">
              When to Seek Emergency Help
            </h2>
            <p className="text-xs text-brand-muted mt-2 leading-relaxed">
              Clear clinical checklists distinguishing minor illness from life-threatening red flags (stroke signs, anaphylaxis, severe chest pain).
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-red-700">
            <span>Read guide</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/emergency/first-aid"
          className="bg-white p-6 rounded-3xl border border-brand-border hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-brand-navy text-lg group-hover:text-amber-800 transition-colors">
              Basic First Aid Protocols
            </h2>
            <p className="text-xs text-brand-muted mt-2 leading-relaxed">
              Step-by-step guidance for CPR, choking relief, heatstroke management, burn dressing, and controlling severe bleeding while an ambulance is en route.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-amber-800">
            <span>Read protocols</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/emergency/contacts"
          className="bg-white p-6 rounded-3xl border border-brand-border hover:border-red-300 hover:shadow-md transition-all flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
              <PhoneCall className="w-6 h-6" />
            </div>
            <h2 className="font-bold text-brand-navy text-lg group-hover:text-blue-700 transition-colors">
              All Emergency Helplines
            </h2>
            <p className="text-xs text-brand-muted mt-2 leading-relaxed">
              Verified phone numbers, operating hours, and provincial coverage for ambulances, mental health counseling, poison control, and maternal emergencies.
            </p>
          </div>
          <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-bold text-blue-700">
            <span>View all numbers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Directory of Emergency Services */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-navy">National Emergency Services Directory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EMERGENCY_SERVICES.map((srv) => (
            <div key={srv.name} className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-brand-navy text-lg">{srv.name}</h3>
                  <a
                    href={`tel:${srv.number.replace(/[^0-9]/g, "")}`}
                    className="px-3 py-1 bg-red-50 text-red-700 font-extrabold text-sm rounded-xl border border-red-200"
                  >
                    {srv.number}
                  </a>
                </div>
                <p className="text-xs text-brand-teal font-semibold mt-1">{srv.type}</p>
                <p className="text-xs text-brand-muted mt-2 leading-relaxed">{srv.description}</p>
                <div className="mt-3 pt-2 border-t border-brand-border/60 text-[11px] text-slate-500">
                  <p>Coverage: <strong>{srv.coverage}</strong></p>
                  <p>Availability: <strong>{srv.available}</strong></p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border">
                <a
                  href={`tel:${srv.number.replace(/[^0-9]/g, "")}`}
                  className="block text-center py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Call {srv.number} Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
