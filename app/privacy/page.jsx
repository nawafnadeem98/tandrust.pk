import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy & Patient Data Protection | tandrust.pk",
  description: "How tandrust.pk secures and protects patient health information and medical records.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Privacy Policy</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Data Protection & Confidentiality</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Privacy Policy</h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Healthcare data is deeply personal. tandrust.pk treats all patient information, medical records, and consultations with the highest levels of security and confidentiality.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 text-xs sm:text-sm text-brand-text leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">1. Data Minimization</h2>
          <p>
            You are never required to register or provide personal health history simply to browse our public Health A–Z, medicines database, or emergency guides. We collect personal identifiers only when you explicitly create an account or book an appointment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">2. Zero Sale of Health Information</h2>
          <p>
            We do not sell, rent, or trade patient information or search logs to commercial advertising brokers, data aggregators, or pharmaceutical marketing entities.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">3. Medical File Encryption & Isolation</h2>
          <p>
            Uploaded lab reports and patient records are stored in private, strictly isolated containers accessible only to you and authorized clinical providers with explicit consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">4. Account Deletion & Right to be Forgotten</h2>
          <p>
            You have the right to request the permanent deletion of your profile, family records, and appointment history at any time through your account settings or by contacting our data protection desk at privacy@tandrust.pk.
          </p>
        </section>
      </div>
    </div>
  );
}
