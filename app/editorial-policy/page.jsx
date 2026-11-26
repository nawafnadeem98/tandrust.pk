import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Editorial Policy & Medical Standards | tandrust.pk",
  description: "How medical content is researched, written, and peer-reviewed on tandrust.pk.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Editorial Policy</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Clinical Integrity Standards</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Editorial Policy</h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Every article published on tandrust.pk undergoes an exhaustive editorial and clinical verification process before publication.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 text-xs sm:text-sm text-brand-text leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">1. Evidence-Based Research</h2>
          <p>
            Our health contributors synthesize clinical guidance from recognized global and Pakistani medical authorities: World Health Organization (WHO), Drug Regulatory Authority of Pakistan (DRAP), National Institute of Health (NIH) Islamabad, and peer-reviewed clinical consensus from the College of Physicians and Surgeons Pakistan (CPSP).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">2. Mandatory Clinical Review</h2>
          <p>
            No article is published without formal review by a qualified medical specialist with active registration with the Pakistan Medical Commission. The reviewer&apos;s name, credentials, and review date are visibly stamped on every article.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">3. No Commercial Influence</h2>
          <p>
            Our writers and reviewers work free of commercial conflicts of interest. Pharmaceutical companies cannot purchase coverage or dictate clinical recommendations.
          </p>
        </section>
      </div>
    </div>
  );
}
