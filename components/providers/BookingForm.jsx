"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, User, Phone, Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function BookingForm({ provider }) {
  const router = useRouter();
  const { user } = useAuth();

  const [date, setDate] = useState(() => {
    // Tomorrow as default date in YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM");
  const [isTelehealth, setIsTelehealth] = useState(false);
  const [patientName, setPatientName] = useState(user?.name || "");
  const [patientPhone, setPatientPhone] = useState(user?.phone || "");
  const [patientEmail, setPatientEmail] = useState(user?.email || "");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const availableSlots = [
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      router.push(`/login?redirect=/services/${provider.slug}`);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId: provider.id,
          facilityId: provider.facilityId,
          serviceName: `${provider.specialty} Consultation`,
          date,
          timeSlot: selectedSlot,
          patientName,
          patientPhone,
          patientEmail,
          notes,
          isTelehealth,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to book appointment");
      }

      setSuccess(data.appointment);
      // Redirect to confirmation screen
      setTimeout(() => {
        router.push(`/appointments/confirmation/${data.appointment.id}`);
      }, 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
        <h3 className="text-xl font-bold text-emerald-950">Appointment Confirmed!</h3>
        <p className="text-xs text-emerald-800 leading-relaxed">
          Your booking with {provider.title} {provider.fullName} on <strong>{date}</strong> at{" "}
          <strong>{selectedSlot}</strong> has been saved to the database.
        </p>
        <p className="text-[11px] text-emerald-700">Redirecting to confirmation receipt...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-sm space-y-6">
      <div className="border-b border-brand-border pb-4">
        <h3 className="text-lg font-bold text-brand-navy flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-teal" />
          <span>Book an Appointment</span>
        </h3>
        <p className="text-xs text-brand-muted mt-1">
          Instant slot confirmation with strict double-booking protection.
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-900">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Consultation Type Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-brand-navy block">Consultation Type</label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => setIsTelehealth(false)}
            className={`py-2.5 px-3 rounded-xl border font-semibold transition-all ${
              !isTelehealth
                ? "bg-brand-mint text-brand-teal-dark border-brand-teal shadow-2xs"
                : "bg-brand-bg text-brand-muted border-brand-border hover:bg-slate-100"
            }`}
          >
            🏥 In-Person Clinic Visit
          </button>
          <button
            type="button"
            onClick={() => setIsTelehealth(true)}
            className={`py-2.5 px-3 rounded-xl border font-semibold transition-all ${
              isTelehealth
                ? "bg-brand-pale-blue text-brand-blue border-brand-blue shadow-2xs"
                : "bg-brand-bg text-brand-muted border-brand-border hover:bg-slate-100"
            }`}
          >
            📹 Online Video Consult
          </button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-brand-navy block">Select Date</label>
        <input
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-3.5 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-teal"
        />
      </div>

      {/* Time Slot Selection */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-brand-navy block">
          Available Time Slots ({date})
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {availableSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={`py-2 px-1 text-center text-xs font-semibold rounded-lg border transition-all ${
                selectedSlot === slot
                  ? "bg-brand-teal text-white border-brand-teal shadow-2xs"
                  : "bg-brand-bg text-brand-text border-brand-border/70 hover:bg-brand-mint hover:text-brand-teal-dark"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Details */}
      <div className="space-y-3 pt-2 border-t border-brand-border">
        <div>
          <label className="text-xs font-semibold text-brand-navy block mb-1">Patient Full Name</label>
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Muhammad Usman"
            className="w-full px-3.5 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-brand-navy block mb-1">Phone Number (WhatsApp/Call)</label>
            <input
              type="tel"
              required
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              placeholder="+92 300 1234567"
              className="w-full px-3.5 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-brand-navy block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              placeholder="patient@domain.pk"
              className="w-full px-3.5 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-brand-navy block mb-1">Reason for Visit / Notes (Optional)</label>
          <textarea
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Briefly describe your symptoms or routine checkup goals..."
            className="w-full px-3.5 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>
      </div>

      {/* Fee & Confirmation Button */}
      <div className="pt-3 border-t border-brand-border space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-brand-muted">Consultation Fee:</span>
          <span className="font-bold text-brand-navy text-sm">
            PKR {provider.consultationFee.toLocaleString()}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying & Reserving Slot...</span>
            </>
          ) : (
            <span>Confirm & Reserve Appointment</span>
          )}
        </button>

        {!user && (
          <p className="text-[11px] text-center text-brand-muted">
            You will be prompted to sign in or create an account to view your appointment history.
          </p>
        )}
      </div>
    </form>
  );
}
