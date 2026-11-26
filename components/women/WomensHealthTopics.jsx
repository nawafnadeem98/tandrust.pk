"use client";

import { useState, useMemo } from "react";
import { Droplets, Activity, Flower2, Baby, ShieldCheck, Droplet, Sparkles, AlertTriangle, ChevronDown, Search } from "lucide-react";
import { CATEGORIES, SOURCES } from "@/lib/womensHealthData";

const ICONS = { Droplets, Activity, Flower2, Baby, ShieldCheck, Droplet, Sparkles };
const SECTIONS = [
  ["symptoms", "Common symptoms"], ["causes", "Possible causes"], ["risks", "Risk factors"],
  ["manage", "Prevention and self-care"], ["doctor", "When to see a doctor"], ["treatment", "Treatment options"],
];

function List({ items }) {
  return <ul className="list-disc ps-5 space-y-1 text-sm text-burgundy-text">{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

export default function WomensHealthTopics() {
  const [cat, setCat] = useState(CATEGORIES[0].id);
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const current = CATEGORIES.find((c) => c.id === cat);
  const shown = useMemo(() => {
    if (!query) return current.topics.map((t) => ({ ...t, cat: current }));
    return CATEGORIES.flatMap((c) => c.topics.map((t) => ({ ...t, cat: c })))
      .filter((t) => t.name.toLowerCase().includes(query) || t.def.toLowerCase().includes(query));
  }, [cat, query, current]);

  return (
    <section aria-labelledby="wh-topics" className="rounded-3xl bg-burgundy-rose/50 border border-burgundy/20 p-5 sm:p-8 space-y-6">
      <div className="space-y-2">
        <h2 id="wh-topics" className="text-2xl sm:text-3xl font-extrabold text-burgundy-deep">Women’s Health Topics</h2>
        <p className="text-sm text-burgundy-text">Choose a category to explore common health problems, their symptoms and when to seek care.</p>
      </div>

      <div className="relative">
        <Search className="absolute top-3.5 start-3 w-4 h-4 text-burgundy" aria-hidden="true" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search health topics" aria-label="Search health topics"
          className="w-full ps-9 pe-3 py-3 rounded-xl border border-burgundy/30 bg-white text-base text-burgundy-text focus:outline-none focus:ring-2 focus:ring-burgundy" />
      </div>

      {!query && (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Health categories">
          {CATEGORIES.map((c) => {
            const Icon = ICONS[c.icon];
            const on = c.id === cat;
            return (
              <button key={c.id} type="button" role="tab" aria-selected={on} onClick={() => setCat(c.id)}
                className={"inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-full border text-sm font-semibold transition-colors " +
                  (on ? "bg-burgundy text-white border-burgundy" : "bg-white text-burgundy-deep border-burgundy/30 hover:bg-burgundy-rose")}>
                <Icon className="w-4 h-4" aria-hidden="true" />{c.name}
              </button>
            );
          })}
        </div>
      )}

      {!query && current.urgent && (
        <div role="note" className="flex gap-3 rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-900">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
          <p><strong>Get urgent help:</strong> {current.urgent}</p>
        </div>
      )}

      {shown.length === 0 && <p className="text-burgundy-text">No topics found.</p>}

      <div className="space-y-3">
        {shown.map((t) => {
          const Icon = ICONS[t.cat.icon];
          return (
            <details key={t.id} className="group rounded-2xl bg-white border border-burgundy/20 open:shadow-md">
              <summary className="flex items-center gap-3 cursor-pointer list-none p-4 min-h-[56px] select-none">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-burgundy-rose text-burgundy flex-shrink-0"><Icon className="w-5 h-5" aria-hidden="true" /></span>
                <span className="flex-1 font-bold text-burgundy-deep">{t.name}</span>
                <ChevronDown className="w-5 h-5 text-burgundy transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="px-4 pb-5 space-y-4 border-t border-burgundy/10 pt-4">
                <div>
                  <h3 className="text-sm font-bold text-burgundy-deep mb-1">What is it?</h3>
                  <p className="text-sm text-burgundy-text">{t.def}</p>
                </div>
                {t.urgent && (
                  <div role="note" className="flex gap-2 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-900">
                    <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p><strong>Get urgent help:</strong> {t.urgent}</p>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  {SECTIONS.map(([k, label]) => (
                    <div key={k} className="rounded-xl bg-burgundy-cream border border-burgundy/10 p-3">
                      <h3 className="text-sm font-bold text-burgundy-deep mb-1.5">{label}</h3>
                      <List items={t[k]} />
                    </div>
                  ))}
                </div>
              </div>
            </details>
          );
        })}
      </div>

      <div className="space-y-2 text-xs text-burgundy-text">
        <p>This information is for education only. It is not a diagnosis. Please see a qualified doctor for advice about your health.</p>
        <p className="font-semibold">In an emergency call Rescue 1122.</p>
        <p className="font-semibold">Sources consulted</p>
        <ul className="list-disc ps-5 space-y-0.5">
          {SOURCES.map((s) => <li key={s.url}><a className="underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a></li>)}
        </ul>
      </div>
    </section>
  );
}
