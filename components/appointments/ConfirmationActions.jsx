"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Clock, X, Loader2, CheckCircle2 } from "lucide-react";

export default function ConfirmationActions({ appointment }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const isCancelled = appointment.status === "CANCELLED";

  const handleCancel = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: appointment.id,
          action: "CANCEL",
          cancellationReason: cancelReason || "Cancelled by patient",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to cancel");

      setStatusMessage("Appointment has been cancelled successfully.");
      setShowCancelModal(false);
      router.refresh();
    } catch (e) {
      alert(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (isCancelled) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-900">
        <p className="font-bold">This booking has been cancelled.</p>
        {appointment.cancellationReason && (
          <p className="mt-1 text-red-800">Reason: {appointment.cancellationReason}</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 bg-brand-bg hover:bg-brand-mint text-brand-navy border border-brand-border rounded-xl text-xs font-semibold transition-colors"
        >
          Print Receipt / Save PDF
        </button>

        <button
          onClick={() => setShowCancelModal(true)}
          className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-semibold transition-colors"
        >
          Cancel Appointment
        </button>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-brand-border space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-brand-navy">Cancel Appointment</h3>
            <p className="text-xs text-brand-muted">
              Are you sure you want to cancel this booking with {appointment.provider.title} {appointment.provider.fullName}?
              The time slot will be reopened for other patients.
            </p>

            <div>
              <label className="text-xs font-semibold text-brand-navy block mb-1">
                Reason for cancellation (optional):
              </label>
              <textarea
                rows="2"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Schedule conflict, feeling better..."
                className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 text-xs font-semibold text-brand-muted hover:text-brand-navy"
              >
                Keep Booking
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Confirm Cancellation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
