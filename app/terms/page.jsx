import React from "react";
import Link from "next/link";
import { ChevronRight, FileText } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions of Use | tandrust.pk",
  description: "Terms of service and user agreements for the tandrust.pk healthcare portal.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Terms of Use</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">User Agreement</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Terms & Conditions</h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Please review these terms before using the tandrust.pk platform. By accessing our services, you agree to these clinical and operational terms.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-brand-border space-y-6 text-xs sm:text-sm text-brand-text leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">1. Educational & Informational Purpose Only</h2>
          <p>
            Content on tandrust.pk is for general educational awareness and directory discovery. It is not an individualized medical diagnosis, clinical prescription, or formal doctor-patient relationship.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">2. Emergency Exemption</h2>
          <p>
            tandrust.pk must not be used for life-threatening emergencies. Users experiencing acute cardiac, respiratory, or trauma emergencies must immediately contact local ambulance dispatchers (1122 or 115).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-brand-navy">3. Appointment Bookings</h2>
          <p>
            Users must provide accurate, truthful personal contact details when scheduling appointments. Abuse of booking slots or automated denial-of-service spamming is strictly prohibited and subject to account suspension.
          </p>
        </section>
      </div>
    </div>
  );
}
