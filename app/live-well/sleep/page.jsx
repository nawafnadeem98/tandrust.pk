import React from "react";
import Link from "next/link";
import { Moon, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Sleep Hygiene & Restful Sleep | tandrust.pk",
  description: "Evidence-based guides on beating insomnia and optimizing circadian sleep cycles in Pakistan.",
};

export default function SleepPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/live-well" className="hover:text-brand-teal transition-colors">Live Well</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Sleep</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Restorative Physiology</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Sleep Hygiene & Rest</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Quality sleep is fundamental to cardiac regulation, immune function, and mental acuity. Learn the 7 rules of sleep hygiene.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-4">
        <h2 className="text-lg font-bold text-brand-navy">Core Rules for Quality Sleep in Pakistan</h2>
        <ul className="space-y-3 text-xs text-brand-text leading-relaxed">
          <li>• <strong>Cut Late-Night Caffeine:</strong> Avoid Kashmiri or black chai at least 6 hours before bedtime.</li>
          <li>• <strong>Screen Blackout:</strong> Stop scrolling smartphones 45 minutes prior to sleep to enable melatonin release.</li>
          <li>• <strong>Consistent Wake Times:</strong> Wake up at the exact same hour 7 days a week, regardless of weekend schedules.</li>
          <li>• <strong>Screen for Sleep Apnea:</strong> If you suffer from loud snoring and morning headaches, consult a pulmonologist.</li>
        </ul>
      </div>
    </div>
  );
}
