import React from "react";
import Link from "next/link";
import { Search, Activity, AlertTriangle, ArrowRight, ChevronRight, PhoneCall } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Symptoms Directory & First Response Guidance | tandrust.pk",
  description:
    "Understand physical symptoms, triage urgency levels, and learn when to contact emergency services or consult a physician.",
};

export default async function SymptomsDirectoryPage({ searchParams }) {
  const query = searchParams?.q || "";
  const urgency = searchParams?.urgency || "ALL";

  const where = {
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(urgency !== "ALL" ? { urgencyLevel: urgency } : {}),
  };

  const symptoms = await prisma.symptom.findMany({
    where,
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health" className="hover:text-brand-teal transition-colors">Health A–Z</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Symptoms</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Activity className="w-4 h-4" />
          <span>Symptom Guidance & Urgency Triage</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Symptoms Directory
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Explore educational guides on understanding symptoms. tandrust.pk does not automatically diagnose diseases—this tool provides conservative first-aid guidance and outlines when to seek urgent medical care.
        </p>

        {/* Search */}
        <form method="GET" action="/health/symptoms" className="max-w-md flex gap-2 pt-2">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search symptoms (e.g. Chest Pain, High Fever)..."
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

      {/* Urgency Filter Tabs */}
      <div className="flex flex-wrap gap-2 text-xs font-medium">
        {[
          { id: "ALL", label: "All Urgency Levels" },
          { id: "EMERGENCY", label: "🚨 Emergency (Call 1122)" },
          { id: "HIGH", label: "⚠️ High Urgency" },
          { id: "MODERATE", label: "⚡ Moderate" },
          { id: "LOW", label: "🌱 Mild / Self-Care" },
        ].map((tab) => (
          <Link
            key={tab.id}
            href={`/health/symptoms?urgency=${tab.id}${query ? `&q=${query}` : ""}`}
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              urgency === tab.id
                ? "bg-brand-navy text-white font-bold shadow-2xs"
                : "bg-white text-brand-navy hover:bg-brand-mint border border-brand-border"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Symptoms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {symptoms.map((symptom) => (
          <Link
            key={symptom.id}
            href={`/health/symptoms/${symptom.slug}`}
            className="bg-white rounded-2xl p-6 border border-brand-border hover:border-brand-teal/40 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-bold text-brand-navy text-base group-hover:text-brand-teal transition-colors">
                  {symptom.name}
                </h2>
                <span
                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                    symptom.urgencyLevel === "EMERGENCY"
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {symptom.urgencyLevel}
                </span>
              </div>

              {symptom.urduName && (
                <p className="text-xs font-urdu text-brand-teal font-medium mt-1">
                  {symptom.urduName}
                </p>
              )}

              <p className="text-xs text-brand-muted mt-3 line-clamp-3 leading-relaxed">
                {symptom.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-teal">
              <span>View care advice</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
