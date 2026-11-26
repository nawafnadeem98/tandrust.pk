import React from "react";
import Link from "next/link";
import { Heart, ChevronRight, Stethoscope } from "lucide-react";
import WomensHealthTopics from "@/components/women/WomensHealthTopics";

export const metadata = {
  title: "Women's Health Guidance | tandrust.pk",
  description: "PCOS, anemia, breast self-examination, and reproductive healthcare in Pakistan.",
};

export default function WomensHealthPage() {
  return (
    <div className="bg-burgundy-cream">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-burgundy transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/family-health" className="hover:text-burgundy transition-colors">Family Health</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-burgundy-deep font-semibold">Women&apos;s Health</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-burgundy-rose shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Female Wellness</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-burgundy-deep">Women&apos;s Health & Hormonal Care</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Comprehensive clinical guidance covering Polycystic Ovary Syndrome (PCOS), iron-deficiency anemia, annual clinical breast exams, cervical screening, and osteoporosis prevention.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-burgundy-rose space-y-3">
          <h2 className="text-lg font-bold text-burgundy-deep">PCOS & Insulin Resistance</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            High prevalence among South Asian women. Lifestyle intervention, targeted resistance training, inositol/metformin, and dietary carbohydrate reduction are key treatment pillars.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-burgundy-rose space-y-3">
          <h2 className="text-lg font-bold text-burgundy-deep">Screening for Iron Deficiency Anemia</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Fatigue, brittle nails, and dizziness are common signs of low serum ferritin. Annual CBC testing ensures timely oral iron supplementation.
          </p>
        </div>
      </div>
      <WomensHealthTopics />
    </div>
    </div>
  );
}
