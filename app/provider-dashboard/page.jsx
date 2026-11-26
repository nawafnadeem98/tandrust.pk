"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Stethoscope,
  Calendar,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Video,
  MapPin,
  Settings,
  Plus,
  Loader2,
  Phone,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function ProviderDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [appointments, setAppointments] = useState([]);
  const [providerProfile, setProviderProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");

  const [feeInput, setFeeInput] = useState(2500);
  const [feeSaving, setFeeSaving] = useState(false);
  const [feeMessage, setFeeMessage] = useState(null);
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/provider-dashboard");
      return;
    }

    if (user) {
      if (user.provider?.consultationFee) {
        setFeeInput(user.provider.consultationFee);
      }
      fetchProviderData();
    }
  }, [user, authLoading, router]);

  const handleUpdateStatus = async (appointmentId, action) => {
    let cancellationReason = "";
    if (action === "CANCEL") {
      cancellationReason = prompt("Reason for cancellation:", "Doctor unavailable / Rescheduled");
      if (!cancellationReason) return;
    }

    try {
      const res = await fetch("/api/appointments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId,
          action,
          cancellationReason,
        }),
      });

      if (res.ok) {
        fetchProviderData();
      } else {
        const d = await res.json();
        alert(d.error || "Failed to update appointment");
      }
    } catch (e) {
      alert("Error updating appointment");
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setFeeSaving(true);
    setFeeMessage(null);
    try {
      const res = await fetch("/api/provider/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultationFee: Number(feeInput),
        }),
      });

      if (res.ok) {
        setFeeMessage("Practice settings updated successfully.");
        setTimeout(() => setFeeMessage(null), 3000);
      } else {
        const d = await res.json();
        alert(d.error || "Failed to save settings");
      }
    } catch (e) {
      alert("Error updating practice settings");
    } finally {
      setFeeSaving(false);
    }
  };

  const fetchProviderData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/appointments");
      if (res.ok) {
        const d = await res.json();
        setAppointments(d.appointments || []);
      }
      setProviderProfile(user.provider || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-brand-mint px-2.5 py-0.5 rounded-full">
              Doctor Clinical Portal
            </span>
            <span className="text-xs text-brand-muted">• PMC Verified Practitioner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            {user.provider?.title || "Dr."} {user.name}
          </h1>
          <p className="text-xs text-brand-muted">
            {user.provider?.specialty || "General Medicine"} • PMC License:{" "}
            <strong>{user.provider?.pmcNumber || "Verified"}</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Practice Verified</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-brand-border shadow-xs space-y-1">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-left transition-all ${
              activeTab === "appointments" ? "bg-brand-teal text-white shadow-xs" : "text-brand-navy hover:bg-brand-mint"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Patient Bookings ({appointments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-left transition-all ${
              activeTab === "schedule" ? "bg-brand-teal text-white shadow-xs" : "text-brand-navy hover:bg-brand-mint"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Clinic Hours & Slots</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-left transition-all ${
              activeTab === "settings" ? "bg-brand-teal text-white shadow-xs" : "text-brand-navy hover:bg-brand-mint"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Consultation Fees & Telehealth</span>
          </button>
        </aside>

        {/* Content Canvas */}
        <div className="lg:col-span-9 space-y-6">
          {activeTab === "appointments" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-4 gap-3">
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">Upcoming Patient Consultations</h2>
                  <p className="text-xs text-brand-muted">Real-time schedule of verified patients</p>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                  {["ALL", "CONFIRMED", "COMPLETED", "CANCELLED"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-xl font-bold uppercase text-[10px] transition-colors ${
                        statusFilter === st
                          ? "bg-brand-navy text-white"
                          : "bg-brand-bg text-brand-muted hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {appointments.filter((a) => statusFilter === "ALL" || a.status === statusFilter).length === 0 ? (
                <div className="py-12 text-center text-xs text-brand-muted space-y-2">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                  <p>No appointments match the selected filter.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments
                    .filter((a) => statusFilter === "ALL" || a.status === statusFilter)
                    .map((app) => (
                      <div
                        key={app.id}
                        className="p-5 rounded-2xl bg-brand-bg border border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                app.status === "COMPLETED"
                                  ? "bg-blue-100 text-blue-800"
                                  : app.status === "CANCELLED"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {app.status}
                            </span>
                            <span className="text-xs font-mono text-slate-500">#{app.id.slice(0, 8)}</span>
                          </div>
                          <p className="font-bold text-brand-navy text-sm">
                            {app.patientName} • {app.patientPhone}
                          </p>
                          <p className="text-xs text-brand-muted">
                            📅 {app.date} at {app.timeSlot} • Service: {app.serviceName}
                          </p>
                          {app.notes && (
                            <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-brand-border mt-1">
                              &quot;{app.notes}&quot;
                            </p>
                          )}
                          {app.cancellationReason && (
                            <p className="text-xs text-red-700 bg-red-50 p-2 rounded-lg border border-red-200 mt-1">
                              Cancellation note: {app.cancellationReason}
                            </p>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {app.isTelehealth && app.status !== "CANCELLED" && (
                            <Link
                              href={`/telehealth/${app.id}`}
                              className="px-3 py-1.5 bg-brand-blue text-white rounded-xl text-xs font-bold shadow-xs hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Join Room</span>
                            </Link>
                          )}

                          {app.status !== "COMPLETED" && app.status !== "CANCELLED" && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(app.id, "COMPLETE")}
                                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Mark Completed</span>
                              </button>

                              <button
                                onClick={() => handleUpdateStatus(app.id, "CANCEL")}
                                className="px-3 py-1.5 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-xl text-xs font-semibold transition-colors"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-brand-navy border-b border-brand-border pb-4">
                Clinic Working Hours & Slot Intervals
              </h2>
              <div className="space-y-3 text-xs">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, idx) => (
                  <div key={day} className="flex items-center justify-between p-3.5 bg-brand-bg rounded-xl border border-brand-border">
                    <span className="font-bold text-brand-navy">{day}</span>
                    <span className="text-brand-muted">09:00 AM – 01:00 PM (30 min slots)</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="border-b border-brand-border pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">
                    Consultation Fees & Telehealth Settings
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Configure your official fee for outpatient clinic appointments and telehealth video consults
                  </p>
                </div>
                {feeMessage && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl flex items-center gap-1 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{feeMessage}</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs max-w-md">
                <div>
                  <label className="font-semibold text-brand-navy block mb-1">Standard Consultation Fee (PKR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400">Rs.</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={feeInput}
                      onChange={(e) => setFeeInput(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-navy font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>
                  <p className="text-[11px] text-brand-muted mt-1">This fee appears in search results and appointment booking receipts.</p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="telehealth" defaultChecked={true} className="rounded text-brand-teal focus:ring-brand-teal" />
                  <label htmlFor="telehealth" className="font-semibold text-brand-navy cursor-pointer">
                    Enable Telehealth Consultations (Online Video Clinic)
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={feeSaving}
                    className="px-5 py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl font-bold shadow-xs transition-colors flex items-center gap-2"
                  >
                    {feeSaving ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Practice Settings</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
