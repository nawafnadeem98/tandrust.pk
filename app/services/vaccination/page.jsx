import React from "react";
import Link from "next/link";
import { Baby, ShieldCheck, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Vaccination & Immunization Services | tandrust.pk",
  description: "Official Pakistan Expanded Programme on Immunisation (EPI) centers and vaccine schedules.",
};

export default async function VaccinationServicePage() {
  const vaccines = await prisma.vaccinationInfo.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Vaccination</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
          National Immunization Program
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Vaccination & EPI Immunization in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          The Government of Pakistan provides life-saving vaccines 100% free of cost under the Expanded Programme on Immunisation (EPI) to protect infants and children from 12 deadly diseases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vaccines.map((v) => (
          <div key={v.id} className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs space-y-3">
            <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {v.targetAgeGroup}
            </span>
            <h2 className="text-lg font-bold text-brand-navy">{v.title}</h2>
            <p className="text-xs text-brand-muted"><strong>Protects Against:</strong> {v.diseasePrevented}</p>
            <p className="text-xs text-brand-text leading-relaxed">{v.scheduleGuidance}</p>
            <div className="pt-2 border-t border-brand-border text-[11px] text-emerald-800 font-medium">
              ✓ {v.nationalProgramNotes}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-brand-mint rounded-3xl text-center space-y-2">
        <h3 className="font-bold text-brand-navy text-sm">Need help locating your nearest EPI center?</h3>
        <p className="text-xs text-brand-muted">Call the National Polio Helpline toll-free at 1166 (08:00 AM - 10:00 PM).</p>
      </div>
    </div>
  );
}
