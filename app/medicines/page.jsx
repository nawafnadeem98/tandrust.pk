import React from "react";
import Link from "next/link";
import { Search, Pill, ShieldCheck, ArrowRight, ChevronRight, AlertCircle } from "lucide-react";
import { FadeUpSection, StaggerSection, StaggerItem, HoverCard } from "@/components/ui/AnimationWrappers";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Medicines A–Z — DRAP Verified Drug Safety | tandrust.pk",
  description:
    "Search verified medicine information, active generic ingredients, Pakistani brand names, side effects, and safe storage instructions.",
};

export default async function MedicinesPage({ searchParams }) {
  const query = searchParams?.q || "";
  const selectedLetter = searchParams?.letter || "ALL";

  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { genericName: { contains: query, mode: "insensitive" } },
          { brandNames: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
        ],
      }
    : {};

  const allMedicines = await prisma.medicine.findMany({
    where,
    orderBy: { name: "asc" },
  });

  const filtered =
    selectedLetter === "ALL"
      ? allMedicines
      : allMedicines.filter((m) =>
          m.name.toUpperCase().startsWith(selectedLetter.toUpperCase())
        );

  const letters = ["ALL", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Medicines</span>
      </nav>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-pale-blue to-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
          <Pill className="w-4 h-4" />
          <span>DRAP Aligned Drug Information</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Medicines A–Z
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Find evidence-based information on medications commonly prescribed and dispensed in Pakistan.
          Learn about brand names, generic formulations, approved uses, potential interactions, and side effects.
        </p>

        {/* Search */}
        <form method="GET" action="/medicines" className="max-w-xl flex gap-2 pt-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search by generic or Pakistani brand name (e.g. Panadol, Metformin)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-brand-border text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-blue shadow-2xs"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-sm transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Safety Notice Strip */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Prescription Medication Safety Notice:</p>
          <p className="leading-relaxed opacity-90">
            Never start, stop, or adjust prescription medicines without consulting a qualified medical doctor.
            Misuse of antibiotics fuels antimicrobial resistance in Pakistan. Always complete full antibiotic courses as prescribed.
          </p>
        </div>
      </div>

      {/* A-Z Letter Nav */}
      <div className="bg-white p-3 rounded-2xl border border-brand-border shadow-2xs">
        <div className="text-xs font-semibold text-brand-muted mb-2 px-1">
          Jump to letter:
        </div>
        <div className="flex flex-wrap gap-1">
          {letters.map((l) => (
            <Link
              key={l}
              href={`/medicines?letter=${l}${query ? `&q=${query}` : ""}`}
              className={`min-w-[34px] h-[34px] px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                selectedLetter === l
                  ? "bg-brand-blue text-white shadow-2xs scale-105"
                  : "bg-brand-bg text-brand-navy hover:bg-brand-pale-blue hover:text-brand-blue"
              }`}
            >
              {l}
            </Link>
          ))}
        </div>
      </div>

      {/* Medicines List */}
      <div className="space-y-4">
        <FadeUpSection>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-navy">
              Medications {selectedLetter !== "ALL" && `starting with "${selectedLetter}"`}
            </h2>
            <span className="text-xs text-brand-muted">
              {filtered.length} medicine{filtered.length === 1 ? "" : "s"} listed
            </span>
          </div>
        </FadeUpSection>

        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-brand-border space-y-3">
            <Pill className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-semibold text-brand-navy">No medicines found</p>
            <p className="text-xs text-brand-muted">
              We could not find any medicine matching your search.
            </p>
            <Link href="/medicines" className="inline-block text-xs font-bold text-brand-blue hover:underline">
              Clear search
            </Link>
          </div>
        ) : (
          <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <StaggerItem key={item.id}>
                <Link
                  href={`/medicines/${item.slug}`}
                  className="bg-white rounded-2xl p-6 border border-brand-border hover:border-brand-blue/50 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-brand-navy text-lg group-hover:text-brand-blue transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-brand-muted font-medium mt-0.5">
                          {item.genericName}
                        </p>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full flex-shrink-0 ${
                          item.prescriptionRequired
                            ? "bg-purple-100 text-purple-800 border border-purple-200"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {item.prescriptionRequired ? "Prescription Only" : "Over The Counter"}
                      </span>
                    </div>

                    <div className="mt-3 text-xs text-slate-600 bg-brand-bg p-2.5 rounded-xl border border-brand-border/60">
                      <span className="font-semibold text-brand-navy">Common Brands: </span>
                      <span>{item.brandNames}</span>
                    </div>

                    <p className="text-xs text-brand-muted mt-3 line-clamp-2 leading-relaxed">
                      {item.approvedUses}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-blue">
                    <span>View safety & side effects</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerSection>
        )}
      </div>
    </div>
  );
}
