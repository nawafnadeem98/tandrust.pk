import React from "react";
import Link from "next/link";
import { Baby, ChevronRight, Stethoscope } from "lucide-react";

export const metadata = {
  title: "Child Health & Development in Pakistan | tandrust.pk",
  description: "Growth tracking, pediatric nutrition, and managing childhood illnesses.",
};

export default function ChildrenCategoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/family-health" className="hover:text-brand-teal transition-colors">Family Health</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Children</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Pediatric Care</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Children&apos;s Health & Growth</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Monitoring cognitive and motor development milestones, nutritional weaning, preventing childhood stunting, and managing winter smog respiratory infections in Pakistan.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">Consult Pediatric Specialists</h2>
        <p className="text-xs text-brand-muted leading-relaxed">
          If your child exhibits delayed speech, recurrent wheezing during winter, or poor weight gain, consult certified pediatricians.
        </p>
        <Link href="/services/doctors?specialty=Pediatrics%20%26%20Child%20Health" className="inline-block px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark">
          Find Verified Pediatricians
        </Link>
      </div>
    </div>
  );
}
