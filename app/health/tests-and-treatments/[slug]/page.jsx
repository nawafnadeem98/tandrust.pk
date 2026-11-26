import React from "react";
import Link from "next/link";
import { ChevronRight, FlaskConical, Clock, ShieldCheck, Stethoscope } from "lucide-react";

export async function generateMetadata({ params }) {
  const formatted = params.slug.replace(/-/g, " ");
  return {
    title: `${formatted.toUpperCase()} — Patient Guide | tandrust.pk`,
    description: `Understand the purpose, preparation, risks, and results interpretation for ${formatted}.`,
  };
}

export default function TestDetailPage({ params }) {
  const name = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health" className="hover:text-brand-teal transition-colors">Health A–Z</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health/tests-and-treatments" className="hover:text-brand-teal transition-colors">Tests & Treatments</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold truncate">{name}</span>
      </nav>

      {/* Header */}
      <header className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-brand-mint px-3 py-1 rounded-full">
          Diagnostic Investigation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
          {name}
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Comprehensive patient information regarding clinical purpose, pre-test preparation, procedure expectations, and interpreting findings at Pakistani diagnostics facilities.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-brand-border text-xs text-brand-muted">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Standardized Clinical Protocol
          </span>
          <span>•</span>
          <span>Available at public DHQ/THQ and private accredited labs nationwide</span>
        </div>
      </header>

      {/* Details Sections */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            1. Why is this test performed?
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            Doctors order {name} to evaluate systemic clinical symptoms, monitor existing chronic conditions, confirm suspected infections, or establish baseline physiological health before medical interventions or surgeries.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            2. Preparation & Fasting Requirements
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            Depending on specific doctor instructions, some blood panels require 8 to 12 hours of overnight fasting (water is usually permitted). Notify your laboratory phlebotomist if you take routine medications like antihypertensives or blood thinners.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            3. Understanding Your Results
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            Laboratory reference ranges may vary slightly between diagnostic platforms. Never alter your prescription drugs or self-medicate based solely on a numerical lab printout—always present your official report to your treating doctor for context.
          </p>
        </section>

        <div className="pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/services/laboratories"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark shadow-sm transition-colors"
          >
            <FlaskConical className="w-4 h-4" />
            <span>Find an ISO Accredited Diagnostic Lab</span>
          </Link>
          <Link
            href="/health/tests-and-treatments"
            className="text-xs font-semibold text-brand-muted hover:text-brand-navy"
          >
            ← Back to Tests Directory
          </Link>
        </div>
      </div>
    </article>
  );
}
