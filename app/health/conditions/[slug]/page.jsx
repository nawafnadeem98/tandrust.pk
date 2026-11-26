import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Calendar,
  UserCheck,
  AlertOctagon,
  PhoneCall,
  CheckCircle2,
  Stethoscope,
  ChevronRight,
  BookOpen,
  Share2,
} from "lucide-react";
import ArticleToolbar from "@/components/health/ArticleToolbar";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const condition = await prisma.condition.findUnique({
    where: { slug: params.slug },
  });

  if (!condition) return { title: "Condition Not Found — tandrust.pk" };

  return {
    title: `${condition.name} — Symptoms, Diagnosis & Treatment | tandrust.pk`,
    description: condition.overview.slice(0, 160),
  };
}

export default async function ConditionDetailPage({ params }) {
  const condition = await prisma.condition.findUnique({
    where: { slug: params.slug },
  });

  if (!condition) notFound();

  // Fetch related conditions
  const relatedConditions = await prisma.condition.findMany({
    where: {
      id: { not: condition.id },
      category: condition.category,
    },
    take: 3,
  });

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health" className="hover:text-brand-teal transition-colors">Health A–Z</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health/conditions" className="hover:text-brand-teal transition-colors">Conditions</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold truncate">{condition.name}</span>
      </nav>

      {/* Main Condition Header Banner */}
      <header className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-mint text-brand-teal-dark">
            {condition.category}
          </span>
          {condition.isDemonstration && (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
              Demonstration Clinical Sample
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {condition.name}
          </h1>
          {condition.urduName && (
            <span className="text-xl sm:text-2xl font-bold font-urdu text-brand-teal">
              {condition.urduName}
            </span>
          )}
        </div>

        {/* Clinical Review Credentials Box */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-brand-border text-xs text-brand-muted">
          <div className="flex items-center gap-1.5 text-brand-navy font-medium">
            <UserCheck className="w-4 h-4 text-brand-teal" />
            <span>Clinically Reviewed by {condition.reviewerName}</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-muted" />
            <span>Last reviewed: {new Date(condition.reviewDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Evidence-Informed Protocol</span>
          </div>
        </div>
      </header>

      {/* Interactive Article Toolbar (Font resize, Text-to-Speech audio, Save bookmark, Print) */}
      <ArticleToolbar
        title={condition.name}
        articleId={condition.id}
        articleType="CONDITION"
        textContent={`${condition.name}. Overview: ${condition.overview}. Common symptoms: ${condition.symptoms}. Prevention and care: ${condition.selfCare || condition.treatment}`}
      />

      {/* URGENT CARE WARNING STRIP (When to seek immediate emergency care) */}
      {condition.whenUrgent && (
        <section
          aria-label="Urgent Warning"
          className="bg-red-50 border-2 border-red-300 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0">
              <AlertOctagon className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-red-900">
                When to Seek Immediate Emergency Hospital Care
              </h2>
              <p className="text-xs text-red-700">
                Do not wait for a clinic consultation if you or a family member shows these red-flag symptoms:
              </p>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-4 border border-red-200 text-xs sm:text-sm text-red-950 font-medium whitespace-pre-line leading-relaxed">
            {condition.whenUrgent}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="tel:1122"
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Rescue 1122 (Ambulance)</span>
            </a>
            <a
              href="tel:115"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Edhi 115</span>
            </a>
            <Link
              href="/emergency"
              className="text-xs font-semibold text-red-800 hover:underline ml-auto"
            >
              View emergency protocols →
            </Link>
          </div>
        </section>
      )}

      {/* Detailed Clinical Content Sections */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-8">
        {/* 1. Overview */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-teal" />
            <span>1. Overview</span>
          </h2>
          <p className="text-sm sm:text-base text-brand-text leading-relaxed">
            {condition.overview}
          </p>
        </section>

        {/* 2. Common Symptoms */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            2. Common Symptoms
          </h2>
          <div className="bg-brand-bg rounded-2xl p-5 border border-brand-border/60 text-sm text-brand-text leading-relaxed whitespace-pre-line">
            {condition.symptomsList}
          </div>
        </section>

        {/* 3. Causes & Transmission */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            3. Possible Causes
          </h2>
          <p className="text-sm sm:text-base text-brand-text leading-relaxed">
            {condition.causes}
          </p>
        </section>

        {/* 4. Risk Factors */}
        {condition.riskFactors && (
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
              4. Risk Factors in Pakistan
            </h2>
            <p className="text-sm sm:text-base text-brand-text leading-relaxed">
              {condition.riskFactors}
            </p>
          </section>
        )}

        {/* 5. Diagnosis */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            5. Clinical Diagnosis & Lab Testing
          </h2>
          <p className="text-sm sm:text-base text-brand-text leading-relaxed">
            {condition.diagnosis}
          </p>
        </section>

        {/* 6. Treatment Options */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            6. Treatment Options
          </h2>
          <p className="text-sm sm:text-base text-brand-text leading-relaxed">
            {condition.treatments}
          </p>
        </section>

        {/* 7. Self-Care & Recovery */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            7. Self-Care & Practical Measures
          </h2>
          <div className="bg-brand-mint/40 rounded-2xl p-5 border border-brand-teal/20 text-sm text-brand-text leading-relaxed whitespace-pre-line">
            {condition.selfCare}
          </div>
        </section>

        {/* 8. Prevention */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            8. Prevention Guidance
          </h2>
          <p className="text-sm sm:text-base text-brand-text leading-relaxed">
            {condition.prevention}
          </p>
        </section>

        {/* 9. When to see a doctor */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            9. When to Contact a Healthcare Professional
          </h2>
          <p className="text-sm sm:text-base text-brand-text leading-relaxed">
            {condition.whenToSeeDoctor}
          </p>
          <div className="pt-2">
            <Link
              href="/services/doctors"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark shadow-sm transition-colors"
            >
              <Stethoscope className="w-4 h-4" />
              <span>Find a Qualified Specialist Doctor</span>
            </Link>
          </div>
        </section>

        {/* 10. References & Sources */}
        {condition.references && (
          <section className="pt-6 border-t border-brand-border text-xs text-brand-muted space-y-1">
            <h3 className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
              Authoritative References & Guidelines
            </h3>
            <p className="leading-relaxed">{condition.references}</p>
          </section>
        )}
      </div>

      {/* Official Medical Disclaimer */}
      <aside
        aria-label="Medical Disclaimer"
        className="bg-brand-bg rounded-2xl p-6 border border-brand-border text-xs text-brand-muted space-y-2"
      >
        <p className="font-bold text-brand-navy">Medical Disclaimer for Patients in Pakistan:</p>
        <p className="leading-relaxed">
          The information contained on tandrust.pk is for educational and public health awareness purposes only.
          It is not intended to be a substitute for direct clinical examination, diagnostic workup, or personalized prescription
          by a registered doctor or healthcare specialist. Always consult a PMDC-registered physician with any questions you may have
          regarding a medical condition.
        </p>
      </aside>

      {/* Related Conditions Cards */}
      {relatedConditions.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-navy">Related Health Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedConditions.map((rel) => (
              <Link
                key={rel.id}
                href={`/health/conditions/${rel.slug}`}
                className="p-4 rounded-2xl bg-white border border-brand-border hover:border-brand-teal hover:shadow-sm transition-all block group"
              >
                <h3 className="font-bold text-brand-navy group-hover:text-brand-teal transition-colors text-sm">
                  {rel.name}
                </h3>
                <p className="text-xs text-brand-muted line-clamp-2 mt-1">{rel.overview}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
