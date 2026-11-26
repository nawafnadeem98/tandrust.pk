import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Users, Target, ChevronRight } from "lucide-react";

export const metadata = {
  title: "About tandrust.pk — Mission & Standards | tandrust.pk",
  description: "Learn about the mission, governance, and clinical integrity of tandrust.pk.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">About Us</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
          National Digital Health Initiative
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          About tandrust.pk
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          tandrust.pk was built to create one trusted, comprehensive digital health destination where people across Pakistan can discover reliable, evidence-informed health information and connect directly with verified healthcare providers.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-8">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            Our Purpose & Vision
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            In an era of rampant social media misinformation, self-prescribed antibiotics, and unverified herbal remedies, Pakistani citizens deserve a reliable, ad-free health portal that puts clinical safety and patient dignity first. Inspired by the breadth and accessibility of public healthcare portals such as the UK&apos;s NHS.uk, tandrust.pk is tailored specifically for our nation&apos;s epidemiological realities, language needs, and provincial health systems.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            Non-Commercial & Independent
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            tandrust.pk is entirely free from commercial pharmaceutical advertising and algorithm-driven promotional bias. Doctor recommendations are based strictly on PMDC credentials and facility accreditations, not paid sponsored listings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-brand-navy border-b border-brand-border pb-2">
            Language Accessibility
          </h2>
          <p className="text-sm text-brand-text leading-relaxed">
            Information is developed in clear English and natural Urdu with right-to-left typographic support, ensuring life-saving medical guidance reaches every home.
          </p>
        </section>
      </div>
    </div>
  );
}
