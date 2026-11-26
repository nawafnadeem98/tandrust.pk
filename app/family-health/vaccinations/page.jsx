import React from "react";
import Link from "next/link";
import { Baby, ShieldCheck, ChevronRight, PhoneCall } from "lucide-react";
import VaccineCalculator from "@/components/family/VaccineCalculator";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Official Pakistan EPI Child Vaccination Schedule | tandrust.pk",
  description:
    "Government of Pakistan Expanded Programme on Immunisation schedule. Free vaccines against Polio, TB, Hepatitis B, Measles, and XDR Typhoid.",
};

export default async function VaccinationsSchedulePage() {
  const vaccines = await prisma.vaccinationInfo.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/family-health" className="hover:text-brand-teal transition-colors">Family Health</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Vaccinations</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          Pakistan EPI National Schedule
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Child Routine Immunization Schedule
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Every child born in Pakistan is entitled to free vaccines at government basic health units, tehsil hospitals, and outreach EPI drives. Complete immunization prevents severe disability and death.
        </p>

        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between gap-4">
          <span>Need vaccine card replacement or missed a dose? Call the National Polio Helpline:</span>
          <a href="tel:1166" className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg whitespace-nowrap">
            Call 1166 (Toll-Free)
          </a>
        </div>
      </div>

      {/* Interactive Child Vaccination Due Date Calculator */}
      <VaccineCalculator />

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-brand-navy">Complete EPI Schedule</h2>
        <div className="space-y-4">
          {vaccines.map((v) => (
            <div key={v.id} className="bg-white rounded-2xl p-6 border border-brand-border shadow-2xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  Target Age: {v.targetAgeGroup}
                </span>
                {v.urduTitle && <span className="text-xs font-urdu text-brand-teal font-medium">{v.urduTitle}</span>}
              </div>
              <h3 className="text-lg font-bold text-brand-navy">{v.title}</h3>
              <p className="text-xs text-brand-muted"><strong>Diseases Prevented:</strong> {v.diseasePrevented}</p>
              <p className="text-xs text-brand-text leading-relaxed">{v.scheduleGuidance}</p>
              <p className="text-[11px] text-emerald-700 font-medium pt-1 border-t border-brand-border/60">
                ✓ {v.nationalProgramNotes}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
