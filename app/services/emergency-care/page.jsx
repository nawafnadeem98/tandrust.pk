import React from "react";
import Link from "next/link";
import { PhoneCall, AlertTriangle, ShieldCheck, ChevronRight, MapPin, Clock } from "lucide-react";
const { EMERGENCY_SERVICES } = require("@/lib/constants");

export const metadata = {
  title: "Emergency Care & Trauma Services in Pakistan | tandrust.pk",
  description: "Verified 24/7 emergency response numbers including Rescue 1122, Edhi 115, and trauma centers.",
};

export default function EmergencyCarePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Emergency Care</span>
      </nav>

      {/* Urgent Alert Banner */}
      <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-200">
          <AlertTriangle className="w-4 h-4 text-amber-300" />
          <span>Immediate Life-Threatening Action</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Emergency Care & Trauma Helplines in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-red-100 max-w-2xl leading-relaxed">
          If someone is unresponsive, choking, having acute crushing chest pain, experiencing severe bleeding, or showing signs of a stroke, call an emergency ambulance immediately.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="tel:1122"
            className="px-6 py-3 bg-white text-red-700 hover:bg-red-50 rounded-xl text-sm font-extrabold shadow-md transition-colors flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>Call Rescue 1122</span>
          </a>
          <a
            href="tel:115"
            className="px-6 py-3 bg-red-800 hover:bg-red-900 text-white rounded-xl text-sm font-extrabold shadow-md transition-colors flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Edhi 115</span>
          </a>
        </div>
      </div>

      {/* Directory of Verified Emergency Services */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-navy">
          Verified Emergency Helplines & Coverage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EMERGENCY_SERVICES.map((srv) => (
            <div
              key={srv.name}
              className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs hover:border-red-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg">{srv.name}</h3>
                    <p className="text-xs text-brand-teal font-semibold mt-0.5">{srv.type}</p>
                  </div>
                  <a
                    href={`tel:${srv.number.replace(/[^0-9]/g, "")}`}
                    className="px-3.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-600 hover:text-white rounded-xl text-sm font-extrabold border border-red-200 transition-colors flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{srv.number}</span>
                  </a>
                </div>

                <p className="text-xs text-brand-muted mt-3 leading-relaxed">
                  {srv.description}
                </p>

                <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs text-brand-muted space-y-1">
                  <p><strong>Geographic Coverage:</strong> {srv.coverage}</p>
                  <p><strong>Operating Hours:</strong> {srv.available}</p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-border">
                <a
                  href={`tel:${srv.number.replace(/[^0-9]/g, "")}`}
                  className="block text-center py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Dial {srv.number}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
