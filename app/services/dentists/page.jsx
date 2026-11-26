import React from "react";
import Link from "next/link";
import { Smile, ChevronRight, Stethoscope } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Dental Care & Orthodontic Specialists in Pakistan | tandrust.pk",
  description: "Find verified dentists, dental surgeons, and oral healthcare clinics across Pakistan.",
};

export default async function DentistsPage() {
  const dentists = await prisma.provider.findMany({
    where: { specialty: { contains: "Dentist", mode: "insensitive" } },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Dentists</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Oral Health & Dental Surgery</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Dental Care Clinics & Specialists</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Search qualified dental surgeons, orthodontists, root canal specialists, and pediatric dentists in Pakistani cities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dentists.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-10 text-center border border-brand-border space-y-3">
            <Smile className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-semibold text-brand-navy">Dental Directory</p>
            <p className="text-xs text-brand-muted max-w-md mx-auto">
              Dental clinics and hospital oral surgery wards are available across Punjab, including Lahore, Faisalabad, Rawalpindi and Multan.
            </p>
            <Link href="/services/doctors" className="inline-block mt-2 px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold">
              Browse Doctors Directory
            </Link>
          </div>
        ) : (
          dentists.map((dr) => (
            <div key={dr.id} className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-brand-navy text-lg">{dr.title} {dr.fullName}</h2>
                <p className="text-xs text-brand-teal font-medium">{dr.specialty}</p>
                <p className="text-xs text-brand-muted mt-2">{dr.clinicAddress}, {dr.city}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-brand-border">
                <Link href={`/services/${dr.slug}`} className="block text-center py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold">
                  Book Appointment
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
