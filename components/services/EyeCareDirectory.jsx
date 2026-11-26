"use client";

import { useState } from "react";
import { EYE_INSTITUTES } from "@/lib/eyeCareInstitutes";

const CITIES = Array.from(new Set(EYE_INSTITUTES.map((i) => i.city))).sort();

export default function EyeCareDirectory() {
  const [city, setCity] = useState("");
  const [q, setQ] = useState("");
  const list = EYE_INSTITUTES.filter(
    (i) => (!city || i.city === city) && (!q || (i.name + " " + i.address).toLowerCase().includes(q.trim().toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <p className="text-xs text-brand-muted bg-white border border-brand-border rounded-2xl p-4">
        Compiled from public sources in November 2026. Phone numbers, addresses and services can change, so please
        confirm with the institute before travelling. tandrust.pk does not own or endorse these institutes.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="Filter by Punjab city"
          className="rounded-xl border border-brand-border bg-white px-3 py-3 text-base">
          <option value="">All Punjab cities</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or place" aria-label="Search eye institutes"
          className="flex-1 rounded-xl border border-brand-border bg-white px-3 py-3 text-base" />
      </div>
      {list.length === 0 && <p className="text-brand-muted">No institute found for this search.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((i) => (
          <div key={i.name} className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs space-y-3">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-800">{i.type}</span>
            <h2 className="font-bold text-brand-navy text-lg">{i.name}</h2>
            <p className="text-xs text-brand-muted">{i.note}</p>
            <p className="text-xs text-brand-navy font-medium">{i.address}</p>
            {i.phone && <p className="text-xs text-brand-navy">Phone: <a className="font-semibold underline" href={"tel:" + i.phone.replace(/[^0-9+]/g, "")}>{i.phone}</a></p>}
            {i.website && <p className="text-xs"><a className="font-semibold underline text-brand-teal" href={i.website} target="_blank" rel="noopener noreferrer">Official website</a></p>}
            <p className="text-[11px] text-brand-muted">Source: <a className="underline" href={i.sourceUrl} target="_blank" rel="noopener noreferrer">{i.source}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
}
