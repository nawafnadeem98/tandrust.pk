import React from "react";
import Link from "next/link";
import { Pill, MapPin, Phone, ShieldCheck, ChevronRight, Clock } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Licensed Pharmacies & Drugstores in Pakistan | tandrust.pk",
  description:
    "Find licensed retail pharmacies maintaining strict cold-chain compliance and authentic medicine dispensing across Pakistan.",
};

export default async function PharmaciesPage() {
  const pharmacies = await prisma.facility.findMany({
    where: { type: "PHARMACY" },
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
        <span className="text-brand-navy font-semibold">Pharmacies</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
          <Pill className="w-4 h-4" />
          <span>DRAP Licensed & Cold Chain Compliant</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Licensed Pharmacies in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Discover reputable pharmacy chains and retail stores that ensure authentic pharmaceutical supply, qualified pharmacists on duty, and calibrated refrigeration for temperature-sensitive biologics and vaccines.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pharmacies.map((pharmacy) => (
          <div
            key={pharmacy.id}
            className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 mb-2 inline-block">
                Licensed Retail Pharmacy
              </span>
              <h2 className="font-bold text-brand-navy text-lg">{pharmacy.name}</h2>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                {pharmacy.description}
              </p>

              <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs text-brand-muted space-y-2">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5" />
                  <span>{pharmacy.address}, {pharmacy.city}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-muted flex-shrink-0" />
                  <span>{pharmacy.openingHours}</span>
                </p>
                <p className="flex items-center gap-1.5 font-bold text-brand-navy">
                  <Phone className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                  <a href={`tel:${pharmacy.phone}`} className="hover:underline">{pharmacy.phone}</a>
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-border">
              <a
                href={`tel:${pharmacy.phone}`}
                className="block text-center py-2.5 bg-brand-navy hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Call Pharmacy Counter
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
