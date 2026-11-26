import React from "react";
import Link from "next/link";
import { Baby, ChevronRight, ArrowRight, Stethoscope } from "lucide-react";
import PregnancyMilestoneExplorer from "@/components/family/PregnancyMilestoneExplorer";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export default async function PregnancyCategoryPage() {
  const articles = await prisma.healthArticle.findMany({
    where: { subCategory: "pregnancy", status: "PUBLISHED" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/family-health" className="hover:text-brand-teal transition-colors">Family Health</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Pregnancy</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Maternal Health</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Pregnancy & Antenatal Care</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Evidence-based guidance on trimester milestones, essential antenatal checkups, nutrition, gestational diabetes screening, and safe institutional delivery planning in Pakistan.
        </p>
      </div>

      {/* Pregnancy Week-by-Week Explorer */}
      <PregnancyMilestoneExplorer />

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-brand-navy">Antenatal Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/family-health/${art.slug}`}
              className="p-6 bg-white rounded-3xl border border-brand-border hover:border-brand-teal transition-all block group"
            >
              <h3 className="font-bold text-brand-navy group-hover:text-brand-teal text-lg">{art.title}</h3>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">{art.summary}</p>
              <span className="text-xs font-semibold text-brand-teal mt-4 inline-flex items-center gap-1">
                Read guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
