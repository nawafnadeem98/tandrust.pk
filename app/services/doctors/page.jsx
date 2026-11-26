import React from "react";
import Link from "next/link";
import {
  Search,
  Stethoscope,
  MapPin,
  Calendar,
  ShieldCheck,
  Star,
  ChevronRight,
  Filter,
} from "lucide-react";
const { prisma } = require("@/lib/prisma");
const { PAKISTAN_CITIES, HEALTHCARE_SPECIALTIES } = require("@/lib/constants");

export const revalidate = 60;

export const metadata = {
  title: "Find Verified Doctors & Specialists in Pakistan | tandrust.pk",
  description:
    "Search PMDC/PMC verified specialist doctors across Punjab, including Lahore, Faisalabad, Rawalpindi and Multan.",
};

export default async function DoctorsDirectoryPage({ searchParams }) {
  const query = searchParams?.q || "";
  const city = searchParams?.city || "ALL";
  const specialty = searchParams?.specialty || "ALL";

  const where = {
    isVerified: true,
    ...(query
      ? {
          OR: [
            { fullName: { contains: query, mode: "insensitive" } },
            { specialty: { contains: query, mode: "insensitive" } },
            { qualifications: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(city !== "ALL" ? { city: { equals: city, mode: "insensitive" } } : {}),
    ...(specialty !== "ALL" ? { specialty: { equals: specialty, mode: "insensitive" } } : {}),
  };

  const doctors = await prisma.provider.findMany({
    where,
    include: {
      facility: {
        select: { name: true, city: true },
      },
    },
    orderBy: { rating: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Doctors</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal">
          <Stethoscope className="w-4 h-4" />
          <span>PMC Registered Specialists</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Find a Verified Doctor in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Book appointments with verified consultant physicians, surgeons, pediatricians, and gynecologists. Every doctor listed has valid PMDC/PMC registration.
        </p>

        {/* Filter Controls Bar */}
        <form method="GET" action="/services/doctors" className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          <div className="relative">
            <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Doctor name or condition..."
              className="w-full pl-10 pr-3 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>

          <div>
            <select
              name="city"
              defaultValue={city}
              className="w-full px-3 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              <option value="ALL">All Cities in Pakistan</option>
              {PAKISTAN_CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <select
              name="specialty"
              defaultValue={specialty}
              className="flex-1 px-3 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              <option value="ALL">All Specialties</option>
              {HEALTHCARE_SPECIALTIES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark transition-colors shadow-2xs"
            >
              Filter
            </button>
          </div>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-brand-muted">
        <span>Found {doctors.length} verified doctor{doctors.length === 1 ? "" : "s"}</span>
        {(query || city !== "ALL" || specialty !== "ALL") && (
          <Link href="/services/doctors" className="font-semibold text-brand-teal hover:underline">
            Reset filters
          </Link>
        )}
      </div>

      {/* Doctors Grid */}
      {doctors.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-brand-border space-y-3">
          <Stethoscope className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-brand-navy text-lg">No doctors matched your criteria</h3>
          <p className="text-xs text-brand-muted max-w-sm mx-auto">
            Try broadening your city or specialty filter. You can also contact our support desk for referrals.
          </p>
          <Link
            href="/services/doctors"
            className="inline-block mt-2 px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark transition-colors"
          >
            Clear All Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((dr) => (
            <div
              key={dr.id}
              className="bg-white rounded-3xl p-6 border border-brand-border hover:border-brand-teal/40 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 mb-2">
                      <ShieldCheck className="w-3 h-3" /> PMC Verified
                    </span>
                    <h2 className="font-bold text-brand-navy text-lg">
                      {dr.title} {dr.fullName}
                    </h2>
                    <p className="text-xs text-brand-teal font-semibold mt-0.5">
                      {dr.specialty}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{dr.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 font-mono mt-2 bg-brand-bg px-2.5 py-1 rounded-lg">
                  {dr.qualifications}
                </p>

                <p className="text-xs text-brand-muted mt-3 line-clamp-2 leading-relaxed">
                  {dr.bio}
                </p>

                <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs text-brand-muted space-y-1.5">
                  <p className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                    <span className="truncate">{dr.clinicAddress}, {dr.city}</span>
                  </p>
                  <p className="font-semibold text-brand-navy">
                    Fee: PKR {dr.consultationFee.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-brand-border flex gap-2">
                <Link
                  href={`/services/${dr.slug}`}
                  className="flex-1 text-center py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark shadow-xs transition-colors"
                >
                  Book Appointment
                </Link>
                <Link
                  href={`/services/${dr.slug}`}
                  className="px-3 py-2.5 bg-brand-bg hover:bg-brand-mint text-brand-navy rounded-xl text-xs font-semibold border border-brand-border transition-colors"
                >
                  Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
