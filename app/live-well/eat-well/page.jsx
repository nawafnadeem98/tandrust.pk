import React from "react";
import Link from "next/link";
import { Utensils, ChevronRight, ArrowRight } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export default async function EatWellPage() {
  const articles = await prisma.healthArticle.findMany({
    where: { subCategory: "eat-well", status: "PUBLISHED" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/live-well" className="hover:text-brand-teal transition-colors">Live Well</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Eat Well</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Pakistani Nutrition</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Eat Well: Healthy Desi Diet</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          How to enjoy traditional Pakistani recipes while reducing visceral fat, lowering cardiovascular risk, and preventing early-onset Type 2 diabetes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-xl font-bold text-brand-navy">The Half-Plate Salad Principle</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Begin traditional meals with raw seasonal cucumbers, radishes, carrots, and onions. The soluble fiber slows carbohydrate absorption and prevents sudden insulin spikes from roti or rice.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 border border-brand-border space-y-3">
          <h2 className="text-xl font-bold text-brand-navy">Atta (Flour) Modification</h2>
          <p className="text-xs text-brand-muted leading-relaxed">
            Blend whole chakki atta with chickpea flour (besan) or barley (jau). This lowers the glycemic index and boosts dietary protein.
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-xl font-bold text-brand-navy">Guides in this section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((art) => (
            <Link
              key={art.id}
              href={`/live-well/${art.slug}`}
              className="p-5 bg-white rounded-2xl border border-brand-border hover:border-brand-teal hover:shadow-xs transition-all block group"
            >
              <h3 className="font-bold text-brand-navy group-hover:text-brand-teal text-base">{art.title}</h3>
              <p className="text-xs text-brand-muted mt-2 line-clamp-2">{art.summary}</p>
              <span className="text-xs font-semibold text-brand-teal mt-3 inline-flex items-center gap-1">
                Read full guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
