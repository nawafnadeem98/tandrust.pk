import React from "react";
import Link from "next/link";
import { Brain, PhoneCall, ChevronRight, ShieldCheck, Heart } from "lucide-react";

export const metadata = {
  title: "Mental Health & Counseling Resources in Pakistan | tandrust.pk",
  description: "Find certified clinical psychologists, psychiatric departments, and free crisis counseling helplines in Pakistan.",
};

export default function MentalHealthPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Mental Health</span>
      </nav>

      {/* Urgent Mental Health Crisis Helpline Strip */}
      <div className="bg-indigo-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-300">
          <Brain className="w-4 h-4" />
          <span>Confidential Psychological Crisis Support</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Mental Health & Emotional Wellbeing
        </h1>
        <p className="text-sm sm:text-base text-indigo-100 max-w-2xl leading-relaxed">
          You are not alone. If you are experiencing overwhelming sadness, anxiety, panic attacks, or thoughts of self-harm, confidential clinical help is available free of cost.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="tel:03117786264"
            className="px-5 py-2.5 bg-white text-indigo-900 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-sm"
          >
            <PhoneCall className="w-4 h-4 text-indigo-700" />
            <span>Call Umang 24/7 Helpline: 0311-7786264</span>
          </a>
          <a
            href="tel:080022444"
            className="px-5 py-2.5 bg-indigo-700 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Rozan Toll-Free: 0800-22444</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Overcoming Stigma in Pakistan</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Mental health struggles are legitimate medical conditions that respond to evidence-based psychotherapy (CBT) and clinical psychiatric support. Asking for help is a sign of courage.
          </p>
          <Link href="/live-well/mental-wellbeing" className="inline-block text-xs font-bold text-brand-teal hover:underline pt-2">
            Read our clinical guide on stress & anxiety →
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Clinical Psychiatric Consultations</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Consult accredited psychiatrists at major teaching hospitals including Shifa International Islamabad, AKUH Karachi, and Mayo Hospital Lahore.
          </p>
          <Link href="/services/doctors?specialty=Psychiatry%20%26%20Mental%20Health" className="inline-block text-xs font-bold text-brand-teal hover:underline pt-2">
            Find verified psychiatrists →
          </Link>
        </div>
      </div>
    </div>
  );
}
