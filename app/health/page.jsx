import React from "react";
import Link from "next/link";
import { Search, Activity, BookOpen, AlertCircle, ArrowRight } from "lucide-react";
import { FadeUpSection, StaggerSection, StaggerItem, HoverCard } from "@/components/ui/AnimationWrappers";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Health A–Z — Conditions, Symptoms & Treatments | tandrust.pk",
  description:
    "Explore evidence-informed health conditions, symptom checkers, and treatments reviewed by certified Pakistani specialists.",
};

async function getHealthData(search = "") {
  const whereCondition = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { overview: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};

  const [conditions, symptoms] = await Promise.all([
    prisma.condition.findMany({
      where: whereCondition,
      orderBy: { name: "asc" },
    }),
    prisma.symptom.findMany({
      orderBy: { name: "asc" },
      take: 12,
    }),
  ]);

  return { conditions, symptoms };
}

export default async function HealthAZPage({ searchParams }) {
  const query = searchParams?.q || "";
  const selectedLetter = searchParams?.letter || "ALL";

  const { conditions, symptoms } = await getHealthData(query);

  const filteredConditions =
    selectedLetter === "ALL"
      ? conditions
      : conditions.filter((c) =>
          c.name.toUpperCase().startsWith(selectedLetter.toUpperCase())
        );

  const letters = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-mint/80 to-brand-pale-blue/80 rounded-3xl p-6 sm:p-10 border border-brand-teal/20">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
            Clinical Reference Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Health A–Z</h1>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
            A comprehensive, clinically reviewed medical reference guide for patients in Pakistan.
            Understand medical conditions, common symptoms, tests, and when to seek urgent emergency care.
          </p>
        </div>

        {/* Search bar inside header */}
        <form method="GET" action="/health" className="mt-6 max-w-xl flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search condition or symptom (e.g. Dengue, Diabetes)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal shadow-2xs"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Quick Nav Sub-tabs */}
      <div className="flex flex-wrap gap-2 border-b border-brand-border pb-4">
        <Link
          href="/health"
          className="px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-bold shadow-2xs"
        >
          All Topics
        </Link>
        <Link
          href="/health/conditions"
          className="px-4 py-2 bg-white hover:bg-brand-mint text-brand-navy rounded-xl text-xs font-medium border border-brand-border transition-colors"
        >
          Conditions ({conditions.length})
        </Link>
        <Link
          href="/health/symptoms"
          className="px-4 py-2 bg-white hover:bg-brand-mint text-brand-navy rounded-xl text-xs font-medium border border-brand-border transition-colors"
        >
          Symptoms
        </Link>
        <Link
          href="/health/tests-and-treatments"
          className="px-4 py-2 bg-white hover:bg-brand-mint text-brand-navy rounded-xl text-xs font-medium border border-brand-border transition-colors"
        >
          Tests & Procedures
        </Link>
      </div>

      {/* A–Z Alphabet Navigation Buttons */}
      <div className="bg-white p-3 rounded-2xl border border-brand-border shadow-2xs">
        <div className="text-xs font-semibold text-brand-muted mb-2 px-1">
          Jump to letter:
        </div>
        <div className="flex flex-wrap gap-1">
          {letters.map((l) => (
            <Link
              key={l}
              href={`/health?letter=${l}${query ? `&q=${query}` : ""}`}
              className={`min-w-[34px] h-[34px] px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                selectedLetter === l
                  ? "bg-brand-teal text-white shadow-2xs scale-105"
                  : "bg-brand-bg text-brand-navy hover:bg-brand-mint hover:text-brand-teal-dark"
              }`}
            >
              {l}
            </Link>
          ))}
        </div>
      </div>

      {/* Conditions Listing */}
      <div className="space-y-4">
        <FadeUpSection>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-navy">
              Medical Conditions {selectedLetter !== "ALL" && `starting with "${selectedLetter}"`}
            </h2>
            <span className="text-xs text-brand-muted">
              Showing {filteredConditions.length} condition{filteredConditions.length === 1 ? "" : "s"}
            </span>
          </div>
        </FadeUpSection>

        {filteredConditions.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-brand-border space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-semibold text-brand-navy">No conditions found</p>
            <p className="text-xs text-brand-muted">
              We could not find any conditions matching your current letter or search query.
            </p>
            <Link
              href="/health"
              className="inline-block mt-2 text-xs font-bold text-brand-teal hover:underline"
            >
              Reset filters
            </Link>
          </div>
        ) : (
          <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredConditions.map((condition) => (
              <StaggerItem key={condition.id}>
                <Link
                  href={`/health/conditions/${condition.slug}`}
                  className="bg-white rounded-2xl p-5 border border-brand-border hover:border-brand-teal/40 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold text-brand-navy text-base group-hover:text-brand-teal transition-colors">
                        {condition.name}
                      </h3>
                      {condition.urduName && (
                        <span className="text-xs font-urdu text-brand-teal font-medium flex-shrink-0">
                          {condition.urduName}
                        </span>
                      )}
                    </div>
                    <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-mint px-2 py-0.5 rounded-full">
                      {condition.category}
                    </span>
                    <p className="text-xs text-brand-muted mt-3 line-clamp-3 leading-relaxed">
                      {condition.overview}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-teal">
                    <span>View clinical guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerSection>
        )}
      </div>

      {/* Common Symptoms Quick Access Strip */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border space-y-4">
        <FadeUpSection>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-brand-navy">Common Symptoms & Urgent Checks</h2>
            </div>
            <Link
              href="/health/symptoms"
              className="text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1"
            >
              <span>All Symptoms</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </FadeUpSection>

        <StaggerSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {symptoms.map((symptom) => (
            <StaggerItem key={symptom.id}>
              <Link
                href={`/health/symptoms/${symptom.slug}`}
                className="p-3.5 rounded-xl bg-brand-bg hover:bg-amber-50/60 border border-brand-border/70 hover:border-amber-200 transition-colors flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-brand-navy">{symptom.name}</p>
                  {symptom.urduName && (
                    <p className="text-[11px] text-brand-muted font-urdu">{symptom.urduName}</p>
                  )}
                </div>
                <span
                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    symptom.urgencyLevel === "EMERGENCY"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {symptom.urgencyLevel}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerSection>
      </div>
    </div>
  );
}
