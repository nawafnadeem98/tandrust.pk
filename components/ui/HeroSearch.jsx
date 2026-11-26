"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Loader2,
  Activity,
  Pill,
  Stethoscope,
  Building2,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced live fetch
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}&type=${selectedCategory}`
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Hero search error:", err);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => clearTimeout(timer);
  }, [query, selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsOpen(false);
    if (selectedCategory === "medicines") {
      router.push(`/medicines?q=${encodeURIComponent(query.trim())}`);
    } else if (selectedCategory === "providers") {
      router.push(`/services/doctors?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push(`/health?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const categories = [
    { id: "all", label: "All Topics" },
    { id: "conditions", label: "Conditions & Symptoms" },
    { id: "medicines", label: "Medicines (DRAP)" },
    { id: "providers", label: "Doctors & Specialists" },
  ];

  const totalResults = results?.total || 0;

  return (
    <div ref={dropdownRef} className="relative w-full max-w-2xl space-y-2">
      {/* Category selector pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.id
                ? "bg-brand-teal text-white shadow-xs"
                : "bg-white/80 text-brand-navy hover:bg-white border border-brand-border/60"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Search Input Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-2 rounded-2xl shadow-lg border border-brand-border/80 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-brand-teal"
      >
        <div className="flex items-center pl-2 flex-1">
          <Search className="w-5 h-5 text-brand-teal mr-2.5 flex-shrink-0" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (results && totalResults > 0) setIsOpen(true);
            }}
            placeholder={
              selectedCategory === "medicines"
                ? "Search Panadol, Augmentin, Metformin, ORS..."
                : selectedCategory === "providers"
                ? "Search Cardiologist, Pediatrician, Dr. Tariq, Lahore..."
                : "Search symptoms, conditions, medicines, verified doctors..."
            }
            className="w-full bg-transparent text-sm text-brand-text placeholder-brand-muted focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults(null);
                setIsOpen(false);
              }}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center gap-1.5"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Search</span>}
        </button>
      </form>

      {/* Autocomplete Dropdown Preview */}
      {isOpen && results && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-brand-border py-3 px-4 z-50 max-h-[420px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150 space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border pb-2 text-xs">
            <span className="font-bold text-brand-navy">
              Found {totalResults} result{totalResults === 1 ? "" : "s"}
            </span>
            <span className="text-brand-muted text-[11px]">Click any item to view details</span>
          </div>

          {totalResults === 0 ? (
            <div className="py-6 text-center text-xs text-brand-muted">
              No matching records found. Press <strong>Search</strong> to browse complete directories.
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              {/* Conditions */}
              {results.results?.conditions?.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-teal mb-1.5 flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Health Conditions</span>
                  </div>
                  <div className="space-y-1">
                    {results.results.conditions.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        href={`/health/conditions/${item.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-xl hover:bg-brand-mint/60 flex items-center justify-between text-brand-navy group transition-colors"
                      >
                        <div>
                          <p className="font-bold group-hover:text-brand-teal">{item.name}</p>
                          <p className="text-[11px] text-brand-muted line-clamp-1">{item.overview}</p>
                        </div>
                        <span className="text-[10px] font-bold text-brand-teal bg-white px-2 py-0.5 rounded-md border border-brand-teal/20 ml-2">
                          {item.category}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Medicines */}
              {results.results?.medicines?.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-blue mb-1.5 flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5" />
                    <span>Medicines (DRAP Registered)</span>
                  </div>
                  <div className="space-y-1">
                    {results.results.medicines.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        href={`/medicines/${item.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-xl hover:bg-brand-pale-blue/60 flex items-center justify-between text-brand-navy group transition-colors"
                      >
                        <div>
                          <p className="font-bold group-hover:text-brand-blue">
                            {item.name} <span className="font-normal text-slate-500">({item.genericName})</span>
                          </p>
                          <p className="text-[11px] text-brand-muted">Brands: {item.brandNames}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-brand-blue group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctors */}
              {results.results?.providers?.length > 0 && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1.5 flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Doctors & Consultants</span>
                  </div>
                  <div className="space-y-1">
                    {results.results.providers.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        href={`/services/${item.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="p-2 rounded-xl hover:bg-emerald-50 flex items-center justify-between text-brand-navy group transition-colors"
                      >
                        <div>
                          <p className="font-bold group-hover:text-emerald-700">
                            {item.title} {item.fullName}
                          </p>
                          <p className="text-[11px] text-brand-muted">{item.specialty} • {item.city}</p>
                        </div>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          PKR {item.consultationFee}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Link to Full Search Page */}
          <div className="pt-2 border-t border-brand-border flex justify-between items-center text-xs">
            <span className="text-[11px] text-brand-muted">Search tandrust.pk</span>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-brand-teal font-bold hover:underline flex items-center gap-1"
            >
              <span>View all results for &quot;{query}&quot;</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
