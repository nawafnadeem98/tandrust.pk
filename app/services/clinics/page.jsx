import React from "react";
import Link from "next/link";
import { Building2, MapPin, Phone, ChevronRight, Stethoscope } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Clinics & Primary Healthcare Centers | tandrust.pk",
  description: "Find outpatient clinics, family medical centers, and BHUs across Pakistan.",
};

export default async function ClinicsPage() {
  const clinics = await prisma.facility.findMany({
    where: { type: "CLINIC" },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Clinics</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Outpatient & Primary Care</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Clinics & Medical Centers</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Primary outpatient healthcare centers, executive medical clinics, and community dispensaries in urban and rural Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinics.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-brand-border space-y-3">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-semibold text-brand-navy">Clinics Directory Active</p>
            <p className="text-xs text-brand-muted max-w-md mx-auto">
              Primary healthcare clinics and outpatient dispensaries are currently listed through affiliated hospital departments and verified doctors.
            </p>
            <Link href="/services/doctors" className="inline-block mt-2 px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold">
              Browse Doctors Directory
            </Link>
          </div>
        ) : (
          clinics.map((clinic) => (
            <div key={clinic.id} className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs">
              <h2 className="font-bold text-brand-navy text-lg">{clinic.name}</h2>
              <p className="text-xs text-brand-muted mt-2">{clinic.address}, {clinic.city}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
