import React from "react";
import Link from "next/link";
import { Brain, PhoneCall, ChevronRight, Heart } from "lucide-react";
import ClinicalCallout from "@/components/ui/ClinicalCallout";

export const metadata = {
  title: "Mental Wellbeing & Emotional Health | tandrust.pk",
  description: "Evidence-based stress reduction, anxiety management, and crisis helplines in Pakistan.",
};

export default function MentalWellbeingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/live-well" className="hover:text-brand-teal transition-colors">Live Well</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Mental Wellbeing</span>
      </nav>

      <ClinicalCallout
        type="urgent"
        title="In mental health crisis? You are not alone."
        message="If you are having thoughts of harming yourself or others, please call Umang helpline: 0317-4288665 (24/7) or Rozan Counselling Helpline: 051-2890505. Emergency services: 1122."
        ctaText="Find Crisis Support"
        ctaHref="/emergency"
      />

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Psychological Wellness</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Mental Wellbeing</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Mental wellbeing is just as critical as physical health. Learn how to manage chronic stress, identify anxiety triggers, and access qualified clinical counseling.
        </p>

        <div className="pt-2 flex flex-wrap gap-3">
          <a
            href="tel:03117786264"
            className="px-5 py-2.5 bg-indigo-700 text-white rounded-xl text-xs font-bold hover:bg-indigo-800 transition-colors flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Umang 24/7 Helpline: 0311-7786264</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Box Breathing for Acute Anxiety</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, and hold for 4 seconds. Repeat for 3 cycles to activate the parasympathetic nervous system during panic surges.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Professional Psychotherapy</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Cognitive Behavioral Therapy (CBT) with an accredited clinical psychologist provides lasting cognitive restructuring for generalized anxiety and depressive episodes.
          </p>
        </div>
      </div>
    </div>
  );
}
