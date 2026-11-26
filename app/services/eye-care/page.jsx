import React from "react";
import Link from "next/link";
import { Eye, ChevronRight, Stethoscope } from "lucide-react";
import EyeCareDirectory from "@/components/services/EyeCareDirectory";

export const revalidate = 60;

export const metadata = {
  title: "Eye Care & Ophthalmology Hospitals in Punjab | tandrust.pk",
  description: "Find ophthalmologists, cataract surgeons, and eye care hospitals across Punjab.",
};

export default async function EyeCarePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Eye Care</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Ophthalmology & Vision Health</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Eye Care & Ophthalmology in Punjab</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Certified eye surgeons, diabetic retinopathy clinics, glaucoma evaluation, cataract microsurgery, and LASIK centers in Punjab.
        </p>
      </div>

      <EyeCareDirectory />
    </div>
  );
}
