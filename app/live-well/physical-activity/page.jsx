import React from "react";
import Link from "next/link";
import { Flame, ChevronRight, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Physical Activity & Exercise in Pakistan | tandrust.pk",
  description: "Brisk walking, aerobic fitness, and overcoming sedentary habits in Pakistan.",
};

export default function PhysicalActivityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/live-well" className="hover:text-brand-teal transition-colors">Live Well</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Physical Activity</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Cardiovascular Fitness</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Physical Activity & Movement</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Adults need at least 150 minutes of moderate aerobic physical activity per week. Learn practical ways to incorporate brisk walking and resistance training into daily life in Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">30-Minute Daily Brisk Walk</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Walking at a pace where your breathing quickens but you can still converse drops HbA1c by up to 0.7% and improves resting blood pressure.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Overcoming Sedentary Office Habits</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Take a 2-minute standing or pacing break for every 45 minutes of desk sitting. Incorporate post-meal walks (shatavari) to assist glycemic clearance.
          </p>
        </div>
      </div>
    </div>
  );
}
