import React from "react";
import Link from "next/link";
import { Calendar, Stethoscope, Video, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Book & Manage Doctor Appointments | tandrust.pk",
  description:
    "Schedule verified in-person hospital visits or private video consultations with PMC registered doctors in Pakistan.",
};

export default async function AppointmentsHubPage() {
  const doctors = await prisma.provider.findMany({
    where: { isVerified: true },
    take: 6,
    orderBy: { rating: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-mint via-brand-bg to-brand-pale-blue rounded-3xl p-6 sm:p-10 border border-brand-teal/20 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
          Online Scheduling System
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Book a Consultation with a Verified Doctor
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Select your specialist, pick an open date and time slot, and receive instant booking confirmation.
          Protected by strict conflict-prevention algorithms.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/services/doctors"
            className="px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark shadow-sm transition-colors flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Search All Verified Doctors</span>
          </Link>
          <Link
            href="/my-account"
            className="px-5 py-2.5 bg-white text-brand-navy border border-brand-border rounded-xl text-xs font-semibold hover:bg-brand-mint transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4 text-brand-teal" />
            <span>View My Bookings</span>
          </Link>
        </div>
      </div>

      {/* Featured Doctors for Instant Booking */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-navy">
            Doctors with Immediate Slot Availability
          </h2>
          <Link href="/services/doctors" className="text-xs font-semibold text-brand-teal hover:underline flex items-center gap-1">
            <span>View all doctors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((dr) => (
            <div
              key={dr.id}
              className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-1">
                      PMC Verified
                    </span>
                    <h3 className="font-bold text-brand-navy text-lg">{dr.title} {dr.fullName}</h3>
                    <p className="text-xs text-brand-teal font-semibold mt-0.5">{dr.specialty}</p>
                  </div>
                </div>

                <p className="text-xs text-brand-muted mt-3 line-clamp-2 leading-relaxed">
                  {dr.bio}
                </p>

                <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs text-brand-muted space-y-1">
                  <p>Location: <strong>{dr.city}, Pakistan</strong></p>
                  <p>Fee: <strong className="text-brand-navy">PKR {dr.consultationFee.toLocaleString()}</strong></p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-border">
                <Link
                  href={`/services/${dr.slug}`}
                  className="block text-center py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  Select Time Slot & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
