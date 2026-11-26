import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Pill,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  FileText,
  AlertOctagon,
  Sparkles,
} from "lucide-react";
import ArticleToolbar from "@/components/health/ArticleToolbar";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const medicine = await prisma.medicine.findUnique({
    where: { slug: params.slug },
  });

  if (!medicine) return { title: "Medicine Not Found — tandrust.pk" };

  return {
    title: `${medicine.name} (${medicine.genericName}) — Uses, Brands & Side Effects | tandrust.pk`,
    description: `Safe patient guide for ${medicine.name}. Pakistani brand names (${medicine.brandNames}), DRAP safety alerts, and storage.`,
  };
}

export default async function MedicineDetailPage({ params }) {
  const medicine = await prisma.medicine.findUnique({
    where: { slug: params.slug },
  });

  if (!medicine) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/medicines" className="hover:text-brand-teal transition-colors">Medicines A–Z</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold truncate">{medicine.name}</span>
      </nav>

      {/* Header */}
      <header className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-pale-blue text-brand-blue">
            {medicine.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              medicine.prescriptionRequired
                ? "bg-purple-100 text-purple-900 border border-purple-200"
                : "bg-emerald-100 text-emerald-900 border border-emerald-200"
            }`}
          >
            {medicine.prescriptionRequired
              ? "Prescription Required in Pakistan"
              : "Over-the-Counter (OTC)"}
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            {medicine.name}
          </h1>
          <p className="text-base text-brand-muted font-medium mt-1">
            Active Generic Ingredient: <strong className="text-brand-navy">{medicine.genericName}</strong>
          </p>
        </div>

        {/* Brand Names Pill Box */}
        <div className="bg-brand-bg rounded-2xl p-4 border border-brand-border/70 text-xs">
          <span className="font-bold text-brand-navy">Common Brand Names in Pakistan: </span>
          <span className="text-brand-text font-medium">{medicine.brandNames}</span>
        </div>

        {/* Review & Regulatory Source */}
        <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-brand-border text-xs text-brand-muted">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-4 h-4" /> {medicine.regulatorySource}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> Last reviewed: {new Date(medicine.reviewDate).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </span>
        </div>
      </header>

      {/* Interactive Article Toolbar */}
      <ArticleToolbar
        title={`${medicine.name} (${medicine.genericName})`}
        articleId={medicine.id}
        articleType="MEDICINE"
        textContent={`${medicine.name}, generic ingredient ${medicine.genericName}. Indicated for: ${medicine.uses}. Dosage instructions: ${medicine.dosage}. Common side effects: ${medicine.sideEffects}`}
      />

      {/* DRAP Safety Warning */}
      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2.5 text-red-900 font-bold text-base">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span>Patient Safety Warning</span>
        </div>
        <p className="text-xs sm:text-sm text-red-950 leading-relaxed font-medium">
          Do not exceed the recommended dose. Never take medicines prescribed for another person.
          Keep all medications strictly out of reach of infants and young children.
        </p>
      </div>

      {/* Structured Clinical Sections */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-8">
        {/* Approved Uses */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            1. Approved Uses & Indications
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            {medicine.approvedUses}
          </p>
        </section>

        {/* Available Formulations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            2. Available Formulations in Pakistan
          </h2>
          <div className="bg-brand-bg rounded-2xl p-4 border border-brand-border/60 text-sm text-brand-text font-medium">
            {medicine.formulations}
          </div>
        </section>

        {/* Safety & Dosing Guidance */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            3. Safety & General Instructions
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            {medicine.safetyInfo}
          </p>
        </section>

        {/* Side Effects */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            4. Potential Side Effects
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">
                Common Side Effects:
              </h3>
              <p className="text-sm text-brand-text leading-relaxed bg-brand-mint/40 p-3.5 rounded-xl border border-brand-teal/20">
                {medicine.sideEffects}
              </p>
            </div>

            {medicine.seriousSideEffects && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
                  Serious Side Effects (Contact Doctor Immediately):
                </h3>
                <p className="text-sm text-red-950 leading-relaxed bg-red-50 p-3.5 rounded-xl border border-red-200 font-medium">
                  {medicine.seriousSideEffects}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Precautions & Interactions */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            5. Precautions & Medical Interactions
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            {medicine.precautions}
          </p>
          {medicine.interactions && (
            <p className="text-xs text-brand-muted pt-1">
              <strong>Drug Interactions:</strong> {medicine.interactions}
            </p>
          )}
        </section>

        {/* Storage */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            6. Safe Storage Instructions
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            {medicine.storageInstructions}
          </p>
        </section>

        {/* Action Link */}
        <div className="pt-4 border-t border-brand-border flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/services/pharmacies"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-blue text-white rounded-xl text-xs font-semibold hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Pill className="w-4 h-4" />
            <span>Find Licensed Pharmacies in Pakistan</span>
          </Link>
          <Link
            href="/medicines"
            className="text-xs font-semibold text-brand-muted hover:text-brand-navy"
          >
            ← Back to Medicines A–Z
          </Link>
        </div>
      </div>
    </article>
  );
}
