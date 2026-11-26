import React from "react";
import Link from "next/link";
import { Activity, ChevronRight, Stethoscope } from "lucide-react";

export const metadata = {
  title: "Healthy Ageing & Senior Care | tandrust.pk",
  description: "Joint health, arthritis, blood pressure management, and fall prevention for senior citizens.",
};

export default function HealthyAgeingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/family-health" className="hover:text-brand-teal transition-colors">Family Health</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Healthy Ageing</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-800">Geriatric Care</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Healthy Ageing & Senior Care</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Supporting dignity, mobility, and vitality in senior years: osteoarthritis knee pain, osteoporosis bone density scans, hypertension control, and cognitive health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Managing Osteoarthritis Knee Pain</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Quadriceps strengthening exercises and low-impact stationary cycling preserve cartilage. Avoid prolonged squatting on hard floors if experiencing acute flare-ups.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Home Fall Prevention</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Install grab bars in bathrooms, ensure adequate nightlighting in hallways, remove loose rugs, and wear anti-slip indoor footwear to prevent hip fractures.
          </p>
        </div>
      </div>
    </div>
  );
}
