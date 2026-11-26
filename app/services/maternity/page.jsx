import React from "react";
import Link from "next/link";
import { Baby, Stethoscope, ChevronRight, ArrowRight } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Maternity & Obstetric Services in Pakistan | tandrust.pk",
  description: "Find verified gynecologists, maternity hospitals, and antenatal care units across Pakistan.",
};

export default async function MaternityServicesPage() {
  const providers = await prisma.provider.findMany({
    where: { specialty: { contains: "Gynecology", mode: "insensitive" } },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Maternity</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
          Maternal & Fetal Medicine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Maternity & Women's Healthcare Services
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Qualified obstetricians, prenatal ultrasound screening, labor & delivery suites, and postpartum maternal recovery across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((dr) => (
          <div key={dr.id} className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 mb-2 inline-block">
                Obstetrician & Gynecologist
              </span>
              <h2 className="font-bold text-brand-navy text-lg">{dr.title} {dr.fullName}</h2>
              <p className="text-xs text-brand-muted mt-1">{dr.qualifications}</p>
              <p className="text-xs text-brand-muted mt-2">{dr.clinicAddress}, {dr.city}</p>
              <p className="text-xs font-bold text-brand-navy mt-2">Fee: PKR {dr.consultationFee.toLocaleString()}</p>
            </div>
            <div className="mt-5 pt-3 border-t border-brand-border">
              <Link href={`/services/${dr.slug}`} className="block text-center py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark">
                Book Consultation
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
