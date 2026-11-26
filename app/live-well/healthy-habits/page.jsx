import React from "react";
import Link from "next/link";
import { HeartPulse, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Healthy Daily Habits | tandrust.pk",
  description: "Practical habits for hydration, sun safety, smoking cessation, and oral health.",
};

export default function HealthyHabitsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/live-well" className="hover:text-brand-teal transition-colors">Live Well</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Healthy Habits</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Daily Routines</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Healthy Daily Habits</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Small, consistent daily decisions—from smoking cessation to hydration during Pakistani summers—dramatically alter long-term cardiovascular health.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Summer Heatwave Hydration</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            During peak summer in interior Sindh and Punjab where temperatures exceed 44°C, maintain fluid balance with clean water, lassi, and ORS. Avoid carbonated sugary sodas.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Tobacco & Gutka Cessation</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Smoking and chewing gutka/naswar are the leading causes of preventable oral and esophageal cancers in Pakistan. Quitting reduces cardiac mortality within 12 months.
          </p>
        </div>
      </div>
    </div>
  );
}
