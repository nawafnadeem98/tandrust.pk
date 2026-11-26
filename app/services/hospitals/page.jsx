import React from "react";
import Link from "next/link";
import { Building2, MapPin, Phone, ShieldCheck, ChevronRight, Clock, AlertTriangle } from "lucide-react";
const { prisma } = require("@/lib/prisma");
const { PAKISTAN_CITIES } = require("@/lib/constants");

export const revalidate = 60;

export const metadata = {
  title: "Hospitals & Emergency Trauma Centers in Pakistan | tandrust.pk",
  description:
    "Directory of public teaching hospitals, JCI-accredited tertiary care centers, and 24/7 emergency response departments in Pakistan.",
};

export default async function HospitalsDirectoryPage({ searchParams }) {
  const city = searchParams?.city || "ALL";

  const where = {
    type: "HOSPITAL",
    ...(city !== "ALL" ? { city: { equals: city, mode: "insensitive" } } : {}),
  };

  const hospitals = await prisma.facility.findMany({
    where,
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Hospitals</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
          <Building2 className="w-4 h-4" />
          <span>Tertiary Teaching & Emergency Care</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Hospitals & Trauma Centers in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Locate major public teaching hospitals offering free and subsidized medical care, as well as internationally accredited private medical institutes with 24/7 emergency trauma response.
        </p>

        {/* City Filter */}
        <form method="GET" action="/services/hospitals" className="max-w-xs pt-2">
          <select
            name="city"
            defaultValue={city}
            className="w-full px-3.5 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-blue"
          >
            <option value="ALL">All Punjab Cities</option>
            {PAKISTAN_CITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button type="submit" className="mt-3 w-full px-3.5 py-2.5 bg-brand-teal text-white text-sm font-semibold rounded-xl hover:opacity-90">Show hospitals</button>
        </form>
      </div>

      {/* Hospital Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="bg-white rounded-3xl p-6 border border-brand-border hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                  {hospital.type}
                </span>
                {hospital.isEmergency24x7 && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                    24/7 Emergency
                  </span>
                )}
              </div>

              <h2 className="font-bold text-brand-navy text-lg leading-snug">
                {hospital.name}
              </h2>

              <p className="text-xs text-brand-muted mt-2 line-clamp-3 leading-relaxed">
                {hospital.description}
              </p>

              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs text-brand-muted space-y-2">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span>{hospital.address}, {hospital.area}, {hospital.city}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-muted flex-shrink-0" />
                  <span>{hospital.openingHours}</span>
                </p>
                <p className="flex items-center gap-1.5 font-bold text-brand-navy">
                  <Phone className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                  <a href={`tel:${hospital.phone}`} className="hover:underline">{hospital.phone}</a>
                </p>
                {hospital.emergencyPhone && (
                  <p className="flex items-center gap-1.5 font-bold text-red-700 bg-red-50 p-2 rounded-xl">
                    <Phone className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                    <span>Emergency: <a href={`tel:${hospital.emergencyPhone}`} className="hover:underline">{hospital.emergencyPhone}</a></span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-border">
              <a
                href={`tel:${hospital.emergencyPhone || hospital.phone}`}
                className="block text-center py-2.5 bg-brand-navy hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Contact Reception
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
