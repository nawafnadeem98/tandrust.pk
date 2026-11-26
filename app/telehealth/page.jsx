import React from "react";
import Link from "next/link";
import { Video, ShieldCheck, Lock, Stethoscope, ArrowRight, CheckCircle2 } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Telehealth Virtual Care Network | tandrust.pk",
  description: "Secure, encrypted video appointments with PMDC certified specialists across Pakistan.",
};

export default async function TelehealthLandingPage() {
  const providers = await prisma.provider.findMany({
    where: { telehealthEnabled: true, isVerified: true },
    take: 6,
    orderBy: { rating: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="bg-gradient-to-r from-brand-pale-blue via-brand-bg to-brand-mint rounded-3xl p-6 sm:p-10 border border-brand-blue/20 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
          Encrypted Healthcare Consultations
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          tandrust.pk Telehealth
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Access specialized clinical care from anywhere in Pakistan. High-definition video, audio, and secure file sharing with verified doctors without sitting in waiting rooms.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/services/doctors"
            className="px-5 py-2.5 bg-brand-blue hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors flex items-center gap-2"
          >
            <Video className="w-4 h-4" />
            <span>Find Telehealth Doctors</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-brand-border space-y-2">
          <div className="w-10 h-10 rounded-xl bg-brand-pale-blue text-brand-blue flex items-center justify-center font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-brand-navy text-base">End-to-End Privacy</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Direct peer-to-peer WebRTC video streams. No consultation recordings are stored on public servers without explicit consent.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-brand-border space-y-2">
          <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-teal flex items-center justify-center font-bold">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-brand-navy text-base">PMDC Verified Physicians</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Every consultant available for telehealth holds active Pakistan Medical Commission certification and hospital admitting privileges.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-brand-border space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-brand-navy text-base">Digital Prescriptions</h3>
          <p className="text-xs text-brand-muted leading-relaxed">
            Receive verifiable electronic prescriptions signed by your doctor delivered securely to your patient portal.
          </p>
        </div>
      </div>
    </div>
  );
}
