import React from "react";
import Link from "next/link";
import { Search, Activity, ArrowRight, ChevronRight } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Medical Conditions A–Z — tandrust.pk",
  description: "Browse comprehensive, clinically reviewed medical conditions in Pakistan.",
};

export default async function ConditionsDirectoryPage({ searchParams }) {
  const query = searchParams?.q || "";
  const selectedCategory = searchParams?.category || "ALL";

  const where = {
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { overview: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(selectedCategory !== "ALL" ? { category: selectedCategory } : {}),
  };

  const conditions = await prisma.condition.findMany({
    where,
    orderBy: { name: "asc" },
  });

  const categories = ["ALL", "Infectious Diseases", "Metabolic & Endocrine", "Cardiovascular", "Respiratory"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health" className="hover:text-brand-teal transition-colors">Health A–Z</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Conditions</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
          Evidence-Based Encyclopedia
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Medical Conditions Directory
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Explore evidence-based guides for common chronic and acute conditions affecting patients in Pakistan.
          Clinically reviewed for accuracy, safety, and local relevance.
        </p>

        {/* Search */}
        <form method="GET" action="/health/conditions" className="max-w-md flex gap-2 pt-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search conditions (e.g. Dengue, Diabetes)..."
            className="flex-1 px-4 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-teal text-white rounded-xl text-sm font-semibold hover:bg-brand-teal-dark transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 text-xs font-medium">
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/health/conditions?category=${cat}${query ? `&q=${query}` : ""}`}
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              selectedCategory === cat
                ? "bg-brand-teal text-white font-bold shadow-2xs"
                : "bg-white text-brand-navy hover:bg-brand-mint border border-brand-border"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Condition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {conditions.map((item) => (
          <Link
            key={item.id}
            href={`/health/conditions/${item.slug}`}
            className="bg-white rounded-2xl p-6 border border-brand-border hover:border-brand-teal/40 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between">
                <h2 className="font-bold text-brand-navy text-lg group-hover:text-brand-teal transition-colors">
                  {item.name}
                </h2>
                {item.urduName && (
                  <span className="text-sm font-urdu text-brand-teal font-medium">
                    {item.urduName}
                  </span>
                )}
              </div>
              <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-mint px-2 py-0.5 rounded-full">
                {item.category}
              </span>
              <p className="text-xs text-brand-muted mt-3 line-clamp-3 leading-relaxed">
                {item.overview}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-teal">
              <span>Read complete guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
