import React from "react";
import Link from "next/link";
import { Baby, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Newborn Care (First 40 Days) | tandrust.pk",
  description: "Evidence-based newborn care: exclusive breastfeeding, jaundice signs, umbilical cord care.",
};

export default function BabyCategoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/family-health" className="hover:text-brand-teal transition-colors">Family Health</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Baby</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Neonatal Health</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Newborn Care (First 40 Days)</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Debunking traditional myths vs medical evidence: cord care, exclusive breastfeeding for 6 months, and spotting neonatal jaundice danger signs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Exclusive Breastfeeding</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            No ghutti, honey, or water should be given to newborns. Colostrum (first yellow milk) is the baby&apos;s first natural vaccination packed with maternal antibodies.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-lg font-bold text-brand-navy">Neonatal Jaundice Signs</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Yellow discoloration of eyes or skin within first 24 hours requires urgent hospital checkup for serum bilirubin testing. Do not rely on sunlight as a cure.
          </p>
        </div>
      </div>
    </div>
  );
}
