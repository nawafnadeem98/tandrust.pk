import React from "react";
import Link from "next/link";
import { HelpCircle, Search, Calendar, ShieldCheck, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Help & Frequently Asked Questions | tandrust.pk",
  description: "How to use tandrust.pk: search health topics, find PMC doctors, and book appointments.",
};

export default function HelpPage() {
  const faqs = [
    {
      q: "Is tandrust.pk affiliated with any specific hospital or drug company?",
      a: "No. tandrust.pk is an independent digital healthcare portal. We do not accept pharmaceutical advertising, nor are doctor recommendations based on sponsorship.",
    },
    {
      q: "How are doctor qualifications verified?",
      a: "Our provider verification desk verifies that every listed medical doctor possesses valid PMC / PMDC registration numbers and recognized postgraduate degrees (e.g. FCPS, MRCP, MCPS).",
    },
    {
      q: "Can I use tandrust.pk for medical emergencies?",
      a: "No website can substitute for immediate hands-on emergency resuscitation. If you are experiencing chest pain, difficulty breathing, or severe trauma, dial Rescue 1122 or Edhi 115 immediately.",
    },
    {
      q: "Is my personal data and medical history secure?",
      a: "Yes. All sensitive health documents, appointment records, and family profiles are protected behind server-side authentication, role-based authorization, and encryption. We never sell your data.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Help & FAQs</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Support & User Guidance</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Frequently Asked Questions</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Guidance on navigating the platform, booking appointments, and understanding our medical review process.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 border border-brand-border shadow-xs space-y-2">
            <h2 className="font-bold text-brand-navy text-base">{faq.q}</h2>
            <p className="text-xs sm:text-sm text-brand-text leading-relaxed opacity-90">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
