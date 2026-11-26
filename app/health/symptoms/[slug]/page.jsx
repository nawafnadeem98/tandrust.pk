import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  AlertTriangle,
  PhoneCall,
  ChevronRight,
  ShieldAlert,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import ClinicalCallout from "@/components/ui/ClinicalCallout";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const symptom = await prisma.symptom.findUnique({
    where: { slug: params.slug },
  });

  if (!symptom) return { title: "Symptom Not Found — tandrust.pk" };

  return {
    title: `${symptom.name} — Symptoms & When to Seek Care | tandrust.pk`,
    description: symptom.description.slice(0, 160),
  };
}

export default async function SymptomDetailPage({ params }) {
  const symptom = await prisma.symptom.findUnique({
    where: { slug: params.slug },
  });

  if (!symptom) notFound();

  const isEmergency = symptom.urgencyLevel === "EMERGENCY";

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health" className="hover:text-brand-teal transition-colors">Health A–Z</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health/symptoms" className="hover:text-brand-teal transition-colors">Symptoms</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold truncate">{symptom.name}</span>
      </nav>

      {/* Header */}
      <header className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              isEmergency
                ? "bg-red-100 text-red-800 border border-red-200"
                : "bg-amber-100 text-amber-800 border border-amber-200"
            }`}
          >
            {symptom.urgencyLevel} Urgency
          </span>
          {symptom.urduName && (
            <span className="text-xl font-bold font-urdu text-brand-teal">
              {symptom.urduName}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
          {symptom.name}
        </h1>

        <p className="text-base text-brand-text leading-relaxed">
          {symptom.description}
        </p>
      </header>

      {/* Emergency Callout based on urgency */}
      {symptom?.urgencyLevel === "EMERGENCY" && (
        <ClinicalCallout
          type="emergency"
          title="Call 1122 immediately"
          message="These symptoms may indicate a medical emergency. Do not wait — call Rescue 1122 or go to your nearest emergency room right now."
          ctaText="Call 1122"
          ctaHref="tel:1122"
        />
      )}
      {symptom?.urgencyLevel === "URGENT" && (
        <ClinicalCallout
          type="urgent"
          title="See a doctor urgently"
          message="You should see a doctor or visit a clinic today. Do not delay if symptoms are worsening."
          ctaText="Find Urgent Care"
          ctaHref="/services/emergency-care"
        />
      )}
      {(!symptom?.urgencyLevel || symptom?.urgencyLevel === "ROUTINE") && (
        <ClinicalCallout
          type="info"
          title="When to seek medical advice"
          message="If your symptoms persist for more than a few days, worsen, or you are concerned, contact a healthcare provider."
          ctaText="Find a Doctor"
          ctaHref="/services/doctors"
        />
      )}

      {/* Immediate care warning */}
      <div
        className={`rounded-3xl p-6 sm:p-8 space-y-4 border ${
          isEmergency
            ? "bg-red-50 border-red-300 text-red-950"
            : "bg-amber-50 border-amber-300 text-amber-950"
        }`}
      >
        <div className="flex items-center gap-3">
          <ShieldAlert className={`w-8 h-8 ${isEmergency ? "text-red-600" : "text-amber-600"}`} />
          <div>
            <h2 className="text-lg font-bold">When to Seek Immediate Medical Attention</h2>
            <p className="text-xs opacity-90">Watch out for these critical danger signs:</p>
          </div>
        </div>

        <div className="bg-white/80 rounded-2xl p-4 border border-current/20 text-sm font-semibold leading-relaxed">
          {symptom.immediateCareSign}
        </div>

        {isEmergency && (
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="tel:1122"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Rescue 1122 Immediately</span>
            </a>
            <a
              href="tel:115"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Edhi 115</span>
            </a>
          </div>
        )}
      </div>

      {/* Common Causes & Self Care */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            Common Underlying Causes
          </h2>
          <p className="text-sm sm:text-base text-brand-text leading-relaxed">
            {symptom.commonCauses}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            Home Care & Safe Measures
          </h2>
          <div className="p-4 bg-brand-mint/40 rounded-2xl border border-brand-teal/20 text-sm text-brand-text leading-relaxed whitespace-pre-line">
            {symptom.selfCareTips}
          </div>
        </section>

        <div className="pt-4 border-t border-brand-border flex items-center justify-between">
          <Link
            href="/services/doctors"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark shadow-sm transition-colors"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Consult a Doctor in Your City</span>
          </Link>
          <Link
            href="/health/symptoms"
            className="text-xs font-semibold text-brand-muted hover:text-brand-navy"
          >
            ← Back to all symptoms
          </Link>
        </div>
      </div>
    </article>
  );
}
