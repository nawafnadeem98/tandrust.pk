import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  Video,
  ChevronRight,
  ShieldCheck,
  Phone,
  Mail,
  User,
} from "lucide-react";
import ConfirmationActions from "@/components/appointments/ConfirmationActions";
const { prisma } = require("@/lib/prisma");

export const revalidate = 0; // Dynamic

export async function generateMetadata({ params }) {
  return {
    title: `Appointment Receipt #${params.id.slice(0, 8)} | tandrust.pk`,
  };
}

export default async function AppointmentConfirmationPage({ params }) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: {
      provider: true,
      facility: true,
      patient: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  if (!appointment) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/appointments" className="hover:text-brand-teal transition-colors">Appointments</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Confirmation</span>
      </nav>

      {/* Success Receipt Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-md space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Booking Status: {appointment.status}
              </span>
              <h1 className="text-2xl font-extrabold text-brand-navy mt-1">
                Appointment Confirmed
              </h1>
              <p className="text-xs text-brand-muted">
                Reference ID: <strong className="font-mono text-brand-navy">{appointment.id}</strong>
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-brand-border sm:pl-6">
            <p className="text-xs text-brand-muted">Consultation Fee</p>
            <p className="text-xl font-extrabold text-brand-navy">
              PKR {appointment.fee.toLocaleString()}
            </p>
            <span className="text-[10px] text-brand-teal font-medium">Pay at Clinic Counter</span>
          </div>
        </div>

        {/* Doctor & Location Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-5 bg-brand-bg rounded-2xl border border-brand-border/70 space-y-3">
            <h2 className="font-bold text-brand-navy uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-brand-teal" />
              <span>Doctor Information</span>
            </h2>
            <div className="space-y-1">
              <p className="text-base font-bold text-brand-navy">
                {appointment.provider.title} {appointment.provider.fullName}
              </p>
              <p className="text-brand-teal font-semibold">{appointment.provider.specialty}</p>
              <p className="text-brand-muted font-mono">{appointment.provider.qualifications}</p>
              <p className="text-slate-500 pt-1">PMC: {appointment.provider.pmcNumber}</p>
            </div>
          </div>

          <div className="p-5 bg-brand-bg rounded-2xl border border-brand-border/70 space-y-3">
            <h2 className="font-bold text-brand-navy uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-brand-blue" />
              <span>Date, Time & Location</span>
            </h2>
            <div className="space-y-1.5">
              <p className="font-bold text-brand-navy text-sm">
                📅 {appointment.date} at {appointment.timeSlot}
              </p>
              <p className="flex items-start gap-1 text-brand-muted">
                <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0 mt-0.5" />
                <span>{appointment.provider.clinicAddress}, {appointment.provider.city}</span>
              </p>
              {appointment.facility && (
                <p className="text-brand-muted">Affiliated Facility: {appointment.facility.name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Telehealth Call Link if applicable */}
        {appointment.isTelehealth && (
          <div className="p-5 bg-brand-pale-blue rounded-2xl border border-brand-blue/30 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
              <Video className="w-4 h-4" />
              <span>Virtual Telehealth Room Ready</span>
            </div>
            <p className="text-brand-text">
              Your appointment is scheduled as a private online video consultation. Join the room 5 minutes before your slot:
            </p>
            <div className="pt-1">
              <Link
                href={`/telehealth/${appointment.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-blue text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                <span>Enter Video Consultation Room</span>
              </Link>
            </div>
          </div>
        )}

        {/* Patient Record Information */}
        <div className="p-5 bg-white rounded-2xl border border-brand-border space-y-2 text-xs">
          <h2 className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
            Patient Booking Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-brand-text pt-1">
            <p><strong>Name:</strong> {appointment.patientName}</p>
            <p><strong>Phone:</strong> {appointment.patientPhone}</p>
            <p><strong>Email:</strong> {appointment.patientEmail}</p>
          </div>
          {appointment.notes && (
            <p className="text-brand-muted pt-2 border-t border-brand-border">
              <strong>Patient Notes:</strong> {appointment.notes}
            </p>
          )}
        </div>

        {/* Interactive Actions (Cancel, Print, Reschedule) */}
        <div className="pt-4 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <ConfirmationActions appointment={appointment} />

          <Link
            href="/my-account"
            className="text-xs font-semibold text-brand-teal hover:underline"
          >
            Go to My Sehat Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
