"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { suggest } from "@/lib/searchSuggest";
import Link from "next/link";
import { Search, X, Loader2, FileText, Pill, Stethoscope, Building2, Activity, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function highlight(text, q) {
  const needle = q.trim().toLowerCase();
  const i = needle ? text.toLowerCase().indexOf(needle) : -1;
  if (i < 0) return text;
  return (<>{text.slice(0, i)}<mark className="bg-yellow-200 text-inherit rounded px-0.5">{text.slice(i, i + needle.length)}</mark>{text.slice(i + needle.length)}</>);
}

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { t, isUrdu } = useLanguage();
  const router = useRouter();
  const barRef = useRef(null);
  const [active, setActive] = useState(-1);
  const [showSugg, setShowSugg] = useState(true);

  // instant suggestions: pages + topics, plus matching conditions already returned by the database search
  const sugg = useMemo(() => {
    const dbItems = ((results && results.results && results.results.conditions) || []).slice(0, 3)
      .map((c) => ({ key: "db" + c.id, en: c.name, ur: c.name, href: `/health/conditions/${c.slug}` }));
    return suggest(query, isUrdu, dbItems);
  }, [query, isUrdu, results]);

  const pick = (s) => { setShowSugg(false); setActive(-1); if (s.href) { onClose(); router.push(s.href); } else setQuery(s.label); };
  const onKey = (e) => {
    if (!showSugg || !sugg.length) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => (a + 1) % sugg.length); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => (a <= 0 ? sugg.length - 1 : a - 1)); }
    else if (e.key === "Enter" && active >= 0) { e.preventDefault(); pick(sugg[active]); }
  };
  useEffect(() => {
    const away = (e) => { if (barRef.current && !barRef.current.contains(e.target)) setShowSugg(false); };
    document.addEventListener("mousedown", away);
    return () => document.removeEventListener("mousedown", away);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults(null);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults(null);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query.trim())}&type=${activeTab}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (e) {
        console.error("Search error:", e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query, activeTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm p-4 sm:p-6 md:p-20 flex justify-center">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Global Health Search"
      >
        {/* Search Input Bar */}
        <div ref={barRef} className="relative flex items-center border-b border-brand-border px-4 py-3 bg-brand-bg/50">
          <Search className="w-5 h-5 text-brand-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSugg(true); setActive(-1); }}
            onFocus={() => setShowSugg(true)}
            onKeyDown={onKey}
            role="combobox"
            aria-expanded={showSugg && query.trim().length > 0}
            aria-autocomplete="list"
            autoComplete="off"
            placeholder={isUrdu ? "بیماریاں، ادویات، ڈاکٹر، ہسپتال یا مضامین تلاش کریں..." : "Search conditions, medicines, doctors, hospitals, symptoms..."}
            className="w-full bg-transparent px-3 py-2 text-brand-text placeholder-brand-muted text-base focus:outline-none"
          />
          {loading && <Loader2 className="w-5 h-5 text-brand-teal animate-spin flex-shrink-0" />}
          {query && (
            <button type="button" onClick={() => { setQuery(""); setResults(null); setActive(-1); inputRef.current && inputRef.current.focus(); }}
              className="px-2 py-1 ml-2 text-xs font-semibold text-brand-muted hover:text-brand-text rounded-lg hover:bg-slate-200/80" aria-label={isUrdu ? "تلاش کا متن صاف کریں" : "Clear search text"}>
              {isUrdu ? "صاف کریں" : "Clear"}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 ml-2 hover:bg-slate-200/80 rounded-lg text-brand-muted hover:text-brand-text transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live suggestions */}
        {showSugg && query.trim().length >= 1 && (
          <div role="listbox" dir={isUrdu ? "rtl" : "ltr"} className="border-b border-brand-border bg-white max-h-72 overflow-y-auto">
            {sugg.length === 0 ? (
              <p className="px-4 py-3 text-sm text-brand-muted">{isUrdu ? "کوئی تجویز نہیں ملی" : "No suggestions found"}</p>
            ) : (
              sugg.map((s, i) => (
                <button key={s.key} type="button" role="option" aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()} onClick={() => pick(s)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 text-start text-sm transition-colors ${i === active ? "bg-brand-mint" : "hover:bg-brand-mint/60"}`}>
                  <span className="text-brand-navy font-medium">{highlight(s.label, query)}</span>
                  <span className="text-[11px] text-brand-muted flex-shrink-0">{s.kind}</span>
                </button>
              ))
            )}
          </div>
        )}

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-brand-border bg-white overflow-x-auto text-xs font-medium">
          {[
            { id: "all", label: isUrdu ? "تمام نتائج" : "All Results" },
            { id: "conditions", label: isUrdu ? "بیماریاں" : "Conditions" },
            { id: "medicines", label: isUrdu ? "ادویات" : "Medicines" },
            { id: "symptoms", label: isUrdu ? "علامات" : "Symptoms" },
            { id: "providers", label: isUrdu ? "ڈاکٹرز" : "Doctors" },
            { id: "facilities", label: isUrdu ? "ہسپتال و لیب" : "Hospitals & Labs" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-brand-teal text-white shadow-sm font-semibold"
                  : "bg-slate-100 text-brand-muted hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Results Display */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {!query && (
            <div className="py-8 text-center text-brand-muted">
              <Search className="w-10 h-10 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium">
                {isUrdu ? "تلاش کے لیے کم از کم 2 حروف درج کریں" : "Type at least 2 characters to search across tandrust.pk"}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Dengue Fever", "Type 2 Diabetes", "Paracetamol", "Cardiology", "Rescue 1122", "Augmentin"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-2.5 py-1 text-xs bg-brand-mint text-brand-teal-dark rounded-md hover:bg-brand-teal hover:text-white transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && results && results.total === 0 && !loading && (
            <div className="py-12 text-center text-brand-muted">
              <p className="text-base font-semibold text-brand-navy">
                {isUrdu ? "کوئی نتیجہ نہیں ملا" : `No results found for "${query}"`}
              </p>
              <p className="text-sm mt-1">
                {isUrdu ? "ہجے چیک کریں یا دوسرا لفظ تلاش کریں" : "Please check your spelling or try searching for another symptom, condition, or medicine."}
              </p>
            </div>
          )}

          {results && (
            <div className="space-y-5">
              {/* Conditions */}
              {results.results.conditions.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{isUrdu ? "بیماریاں (Conditions)" : "Health Conditions"}</span>
                  </h3>
                  <div className="space-y-1.5">
                    {results.results.conditions.map((item) => (
                      <Link
                        key={item.id}
                        href={`/health/conditions/${item.slug}`}
                        onClick={onClose}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-brand-mint/60 transition-colors border border-transparent hover:border-brand-teal/20"
                      >
                        <div>
                          <p className="font-semibold text-brand-navy group-hover:text-brand-teal transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-brand-muted line-clamp-1">{item.overview}</p>
                        </div>
                        <span className="text-xs text-brand-teal font-medium flex items-center gap-1 flex-shrink-0 ml-3">
                          {item.category}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Medicines */}
              {results.results.medicines.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-brand-blue" />
                    <span>{isUrdu ? "ادویات (Medicines)" : "Medicines"}</span>
                  </h3>
                  <div className="space-y-1.5">
                    {results.results.medicines.map((item) => (
                      <Link
                        key={item.id}
                        href={`/medicines/${item.slug}`}
                        onClick={onClose}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-brand-pale-blue/60 transition-colors border border-transparent hover:border-brand-blue/20"
                      >
                        <div>
                          <p className="font-semibold text-brand-navy group-hover:text-brand-blue transition-colors">
                            {item.name} <span className="text-xs font-normal text-brand-muted">({item.genericName})</span>
                          </p>
                          <p className="text-xs text-brand-muted">Common brands: {item.brandNames}</p>
                        </div>
                        <span className="text-xs text-brand-blue font-medium flex items-center gap-1 flex-shrink-0 ml-3">
                          {item.category}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Symptoms */}
              {results.results.symptoms.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-amber-600" />
                    <span>{isUrdu ? "علامات (Symptoms)" : "Symptoms"}</span>
                  </h3>
                  <div className="space-y-1.5">
                    {results.results.symptoms.map((item) => (
                      <Link
                        key={item.id}
                        href={`/health/symptoms/${item.slug}`}
                        onClick={onClose}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-amber-50/70 transition-colors border border-transparent hover:border-amber-200"
                      >
                        <div>
                          <p className="font-semibold text-brand-navy group-hover:text-amber-800 transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-brand-muted line-clamp-1">{item.description}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          item.urgencyLevel === "EMERGENCY" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                        }`}>
                          {item.urgencyLevel}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctors / Providers */}
              {results.results.providers.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{isUrdu ? "معالجین (Doctors)" : "Verified Doctors"}</span>
                  </h3>
                  <div className="space-y-1.5">
                    {results.results.providers.map((item) => (
                      <Link
                        key={item.id}
                        href={`/services/${item.slug}`}
                        onClick={onClose}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200"
                      >
                        <div>
                          <p className="font-semibold text-brand-navy group-hover:text-emerald-700 transition-colors">
                            {item.title} {item.fullName}
                          </p>
                          <p className="text-xs text-brand-muted">{item.specialty} • {item.city}</p>
                        </div>
                        <span className="text-xs font-semibold text-brand-teal">
                          PKR {item.consultationFee}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Hospitals & Facilities */}
              {results.results.facilities.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isUrdu ? "ہسپتال و لیبز (Facilities)" : "Hospitals & Diagnostics"}</span>
                  </h3>
                  <div className="space-y-1.5">
                    {results.results.facilities.map((item) => (
                      <Link
                        key={item.id}
                        href={`/services/hospitals`}
                        onClick={onClose}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-200"
                      >
                        <div>
                          <p className="font-semibold text-brand-navy group-hover:text-indigo-700 transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-brand-muted">{item.type} • {item.area}, {item.city}</p>
                        </div>
                        <span className="text-xs text-brand-muted">{item.phone}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Health Articles */}
              {results.results.articles.length > 0 && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{isUrdu ? "طبی مضامین (Articles)" : "Articles & Guides"}</span>
                  </h3>
                  <div className="space-y-1.5">
                    {results.results.articles.map((item) => (
                      <Link
                        key={item.id}
                        href={`/live-well/${item.slug}`}
                        onClick={onClose}
                        className="group flex items-start justify-between p-2.5 rounded-xl hover:bg-brand-mint/60 transition-colors border border-transparent hover:border-brand-teal/20"
                      >
                        <div>
                          <p className="font-semibold text-brand-navy group-hover:text-brand-teal transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-brand-muted line-clamp-1">{item.summary}</p>
                        </div>
                        <span className="text-xs text-brand-muted flex-shrink-0 ml-3">
                          {item.readTime} min read
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer info in modal */}
        <div className="px-4 py-2.5 bg-brand-bg/80 border-t border-brand-border text-xs text-brand-muted flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-brand-border rounded text-[11px] font-mono">ESC</kbd> to close</span>
          <span>tandrust.pk Search Index</span>
        </div>
      </div>
    </div>
  );
}
