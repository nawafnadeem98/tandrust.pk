import React from "react";
import Link from "next/link";
import { Shield, ChevronRight, ArrowRight } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Preventive Healthcare & Smog Guidance | tandrust.pk",
  description: "Protecting against winter smog in Punjab, dengue mosquito safety, and routine adult screenings.",
};

export default async function PreventionPage() {
  const articles = await prisma.healthArticle.findMany({
    where: { subCategory: "prevention", status: "PUBLISHED" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/live-well" className="hover:text-brand-teal transition-colors">Live Well</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Prevention</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Preventive Medicine</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Preventive Healthcare & Environmental Safety</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Proactive clinical screenings, seasonal environmental protection against hazardous smog, and vector control for dengue in Pakistan.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-brand-navy">Guides & Clinical Advisories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/live-well/${art.slug}`}
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
