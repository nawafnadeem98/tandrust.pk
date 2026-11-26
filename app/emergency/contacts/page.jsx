import React from "react";
import Link from "next/link";
import { PhoneCall, ChevronRight, MapPin, Clock } from "lucide-react";
const { EMERGENCY_SERVICES } = require("@/lib/constants");

export const metadata = {
  title: "All Verified Emergency Contacts & Helplines | tandrust.pk",
  description: "Verified contact phone numbers for ambulance, fire, disaster response, and mental health in Pakistan.",
};

export default function EmergencyContactsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/emergency" className="hover:text-brand-teal transition-colors">Emergency</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Contacts</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600">National Directory</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Verified Emergency Helplines in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Confirmed operational helplines for patient transport, disaster rescue, mental health support, polio vaccination, and health card coverage.
        </p>
      </div>

      <div className="space-y-4">
        {EMERGENCY_SERVICES.map((srv) => (
          <div
            key={srv.name}
            className="bg-white rounded-2xl p-6 border border-brand-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-brand-navy">{srv.name}</h2>
              <p className="text-xs text-brand-teal font-semibold">{srv.type}</p>
              <p className="text-xs text-brand-muted max-w-lg">{srv.description}</p>
              <div className="pt-2 text-[11px] text-slate-500 flex flex-wrap gap-4">
                <span>Coverage: <strong>{srv.coverage}</strong></span>
                <span>Hours: <strong>{srv.available}</strong></span>
              </div>
            </div>

            <a
              href={`tel:${srv.number.replace(/[^0-9]/g, "")}`}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-base font-extrabold transition-colors flex items-center justify-center gap-2 flex-shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call {srv.number}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
