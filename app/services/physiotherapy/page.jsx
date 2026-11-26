import React from "react";
import Link from "next/link";
import { Activity, ChevronRight, Stethoscope } from "lucide-react";

export const metadata = {
  title: "Physiotherapy & Physical Rehabilitation Services | tandrust.pk",
  description: "Find certified physiotherapists, post-stroke rehabilitation units, and sports physical therapy in Pakistan.",
};

export default function PhysiotherapyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Physiotherapy</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Musculoskeletal & Neurological Rehab</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Physiotherapy & Physical Rehabilitation</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Doctor of Physical Therapy (DPT) verified practitioners specializing in spine care, post-surgical orthopedic recovery, stroke mobility, and geriatric balance training.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-brand-border shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">Physical Rehabilitation Centers</h2>
        <p className="text-xs text-brand-muted leading-relaxed">
          Available at major medical institutes across Punjab, including Lahore, Faisalabad, Rawalpindi and Multan. Contact hospital physiotherapy departments for scheduled outpatient rehabilitation.
        </p>
        <Link href="/services/doctors" className="inline-block px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark">
          Find Orthopedic & Rehab Specialists
        </Link>
      </div>
    </div>
  );
}
