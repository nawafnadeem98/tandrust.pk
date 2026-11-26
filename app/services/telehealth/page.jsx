import React from "react";
import Link from "next/link";
import { Video, ShieldCheck, Stethoscope, AlertCircle, Calendar, ArrowRight, ChevronRight, Lock } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Telehealth & Online Video Consultations | tandrust.pk",
  description:
    "Consult verified Pakistani doctors from the comfort of your home via secure, private video appointments.",
};

export default async function TelehealthDirectoryPage() {
  const telehealthProviders = await prisma.provider.findMany({
    where: {
      isVerified: true,
      telehealthEnabled: true,
    },
    orderBy: { rating: "desc" },
  });

  const isIntegrationLive = process.env.TELEHEALTH_ENABLED === "true";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/services" className="hover:text-brand-teal transition-colors">Healthcare Services</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Telehealth</span>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-brand-pale-blue to-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-blue">
          <Video className="w-4 h-4" />
          <span>Virtual Clinical Care</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Online Doctor Consultations (Telehealth)
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Connect directly with PMC-registered consultant physicians, pediatricians, and gynecologists without traveling.
          Video calls are conducted over encrypted sessions designed to protect patient privacy.
        </p>

        {/* Integration Status Notice */}
        <div className="p-3.5 bg-brand-bg rounded-2xl border border-brand-border text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-teal" />
            <span className="text-brand-navy font-medium">
              Telehealth Gateway Status:{" "}
              {isIntegrationLive ? (
                <strong className="text-emerald-700">Production WebRTC Video Live</strong>
              ) : (
                <strong className="text-amber-800">
                  Secure Demonstration Mode (Credentials Awaiting Production Configuration)
                </strong>
              )}
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
            End-to-End Encryption
          </span>
        </div>
      </div>

      {/* Providers Approved for Video Consultations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-brand-navy">
            Specialists Available for Telehealth ({telehealthProviders.length})
          </h2>
          <span className="text-xs text-brand-muted">
            All appointments include pre-consultation SMS/Email reminders
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {telehealthProviders.map((dr) => (
            <div
              key={dr.id}
              className="bg-white rounded-3xl p-6 border border-brand-border hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-2">
                      <Video className="w-3 h-3" /> Telehealth Certified
                    </span>
                    <h3 className="font-bold text-brand-navy text-lg">
                      {dr.title} {dr.fullName}
                    </h3>
                    <p className="text-xs text-brand-teal font-semibold mt-0.5">{dr.specialty}</p>
                  </div>
                </div>

                <p className="text-xs text-brand-muted mt-3 line-clamp-2 leading-relaxed">
                  {dr.bio}
                </p>

                <div className="mt-4 pt-3 border-t border-brand-border/60 text-xs text-brand-muted space-y-1">
                  <p>Experience: <strong>{dr.experienceYears} Years</strong></p>
                  <p>Location: <strong>{dr.city}, Pakistan</strong></p>
                  <p className="font-bold text-brand-navy pt-1">
                    Fee: PKR {dr.consultationFee.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-brand-border">
                <Link
                  href={`/services/${dr.slug}`}
                  className="block text-center py-2.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  Schedule Video Consultation
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
