import React from "react";
import Link from "next/link";
import { UserCheck, ShieldCheck, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Medical Review Policy & Clinical Board | tandrust.pk",
  description: "Learn about the clinical board and medical review standards at tandrust.pk.",
};

export default function MedicalReviewPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Medical Review Policy</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Governance & Oversight</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Medical Review Board Policy</h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          How our clinical reviewers verify safety, validate dosages, check for regional epidemic relevance, and ensure guidance is culturally appropriate for Pakistan.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 text-xs sm:text-sm text-brand-text leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">Reviewer Criteria</h2>
          <p>
            Reviewers must hold an MBBS and a recognized postgraduate fellowship/membership (FCPS, MRCP, MRCOG, MCPS, or equivalent) with at least 5 years of active bedside clinical experience in Pakistan.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">Annual Re-Verification Cycle</h2>
          <p>
            Health condition and medicine articles are reviewed on a rolling 12-month schedule or sooner whenever updated therapeutic protocols are released by DRAP or the Ministry of National Health Services.
          </p>
        </section>
      </div>
    </div>
  );
}
