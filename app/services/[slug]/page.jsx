import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Building2,
  Clock,
  Phone,
  Video,
  Award,
  ChevronRight,
} from "lucide-react";
import BookingForm from "@/components/providers/BookingForm";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const provider = await prisma.provider.findUnique({
    where: { slug: params.slug },
  });

  if (!provider) return { title: "Doctor Not Found — tandrust.pk" };

  return {
    title: `${provider.title} ${provider.fullName} (${provider.specialty}) — tandrust.pk`,
    description: `Book consultation with ${provider.title} ${provider.fullName} in ${provider.city}. PMC Number: ${provider.pmcNumber}. Fee: PKR ${provider.consultationFee}.`,
  };
}

export default async function ProviderDetailPage({ params }) {
  const provider = await prisma.provider.findUnique({
    where: { slug: params.slug },
    include: {
      facility: true,
      availabilities: true,
    },
  });

  if (!provider) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services/doctors" className="hover:text-brand-teal transition-colors">Doctors</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold truncate">{provider.fullName}</span>
      </nav>

      {/* Main Grid: Left Doctor Profile, Right Booking Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Doctor Profile & Credentials */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-4 h-4" /> PMDC / PMC Verified Practitioner
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                <span>{provider.rating.toFixed(2)} ({provider.reviewCount} reviews)</span>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-brand-navy">
                {provider.title} {provider.fullName}
              </h1>
              <p className="text-base text-brand-teal font-semibold mt-1">
                {provider.specialty}
              </p>
              {provider.subSpecialties && (
                <p className="text-xs text-brand-muted mt-0.5">
                  Sub-specialties: {provider.subSpecialties}
                </p>
              )}
            </div>

            {/* Qualifications & PMC Number */}
            <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border/70 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">PMC Registration Number:</span>
                <span className="font-mono font-bold text-brand-navy">{provider.pmcNumber || "Verified Under Review"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand-muted">Clinical Experience:</span>
                <span className="font-bold text-brand-navy">{provider.experienceYears} Years Active Practice</span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-brand-muted flex-shrink-0">Academic Degrees:</span>
                <span className="font-semibold text-brand-navy text-right">{provider.qualifications}</span>
              </div>
            </div>

            {/* Doctor Biography */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-bold text-brand-navy uppercase tracking-wider text-[11px]">
                Professional Biography
              </h3>
              <p className="text-sm text-brand-text leading-relaxed">
                {provider.bio}
              </p>
            </div>

            {/* Practice Location & Hospital Affiliation */}
            <div className="pt-4 border-t border-brand-border space-y-3 text-xs">
              <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                Practice Location & Clinic Hours
              </h3>
              <div className="flex items-start gap-2 text-brand-text">
                <MapPin className="w-4 h-4 text-brand-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">{provider.clinicAddress}</p>
                  <p className="text-brand-muted">{provider.area}, {provider.city}, {provider.province}</p>
                </div>
              </div>

              {provider.facility && (
                <div className="flex items-center gap-2 text-brand-text">
                  <Building2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                  <span>Affiliated Hospital: <strong>{provider.facility.name}</strong></span>
                </div>
              )}

              {provider.telehealthEnabled && (
                <div className="flex items-center gap-2 text-emerald-800 font-semibold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                  <Video className="w-4 h-4" />
                  <span>Approved for Video Consultations (Telehealth)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Appointment Booking Form */}
        <div className="lg:col-span-5 sticky top-24">
          <BookingForm provider={provider} />
        </div>
      </div>
    </div>
  );
}
