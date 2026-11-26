import React from "react";
import Link from "next/link";
import { FlaskConical, MapPin, Phone, ShieldCheck, ChevronRight, CheckCircle2 } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Diagnostic Laboratories & Pathology Centers | tandrust.pk",
  description:
    "Find ISO 15189 accredited pathology laboratories, radiology scan centers, and home sample collection across Pakistan.",
};

export default async function LaboratoriesPage() {
  const labs = await prisma.facility.findMany({
    where: { type: "LABORATORY" },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Laboratories</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
          <FlaskConical className="w-4 h-4" />
          <span>Accredited Pathology & Diagnostics</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Diagnostic Laboratories in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Locate verified diagnostic and pathology networks providing blood tests, CBC, Dengue NS1 testing, molecular PCR, radiology, ultrasound, and home blood sampling.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labs.map((lab) => (
          <div
            key={lab.id}
            className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 mb-2 inline-block">
                ISO 15189 Accredited
              </span>
              <h2 className="font-bold text-brand-navy text-lg">{lab.name}</h2>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                {lab.description}
              </p>

              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs text-brand-muted space-y-2">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span>{lab.address}, {lab.city}</span>
                </p>
                <p className="flex items-center gap-1.5 font-bold text-brand-navy">
                  <Phone className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                  <a href={`tel:${lab.phone}`} className="hover:underline">{lab.phone}</a>
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-border">
              <a
                href={`tel:${lab.phone}`}
                className="block text-center py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Book Home Sampling
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
