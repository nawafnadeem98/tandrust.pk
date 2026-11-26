"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, MapPin, ArrowRight, AlertCircle, Loader2, ShieldCheck } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
const { PAKISTAN_CITIES, PAKISTAN_PROVINCES } = require("@/lib/constants");

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { isUrdu } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "Lahore",
    province: "Punjab",
    role: "PATIENT",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(formData);
      router.push("/my-account");
    } catch (err) {
      setError(err.message || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-xl">
        <div className="text-center space-y-2">
          <div className="inline-block">
            <Logo size="large" />
          </div>
          <h1 className="text-2xl font-extrabold text-brand-navy pt-2">
            {isUrdu ? "نیا اکاؤنٹ بنائیں" : "Create your tandrust.pk account"}
          </h1>
          <p className="text-xs text-brand-muted">
            Access secure digital bookings, family health management, and private reports.
          </p>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Role Selector */}
          <div>
            <label className="text-xs font-semibold text-brand-navy block mb-1">
              I am registering as:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "PATIENT" })}
                className={`py-2 px-3 rounded-xl border font-bold transition-all ${
                  formData.role === "PATIENT"
                    ? "bg-brand-teal text-white border-brand-teal shadow-2xs"
                    : "bg-brand-bg text-brand-muted border-brand-border"
                }`}
              >
                👤 Patient / Citizen
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: "PROVIDER" })}
                className={`py-2 px-3 rounded-xl border font-bold transition-all ${
                  formData.role === "PROVIDER"
                    ? "bg-brand-teal text-white border-brand-teal shadow-2xs"
                    : "bg-brand-bg text-brand-muted border-brand-border"
                }`}
              >
                🩺 Medical Doctor / Clinic
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-brand-navy block mb-1">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Muhammad Usman"
                className="w-full pl-10 pr-4 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-brand-navy block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.pk"
                  className="w-full pl-10 pr-3 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-navy block mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full pl-10 pr-3 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-brand-navy block mb-1">
              Password (Min 8 characters with at least 1 uppercase & 1 number)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-brand-navy block mb-1">City</label>
              <select
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none"
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-brand-navy block mb-1">Province</label>
              <select
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full px-3 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none"
              >
                {PAKISTAN_PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[11px] text-brand-muted leading-tight">
            By creating an account, you consent to our{" "}
            <Link href="/terms" className="text-brand-teal underline">Terms of Use</Link> and{" "}
            <Link href="/privacy" className="text-brand-teal underline">Privacy Policy</Link>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
            <span>Complete Registration</span>
          </button>
        </form>

        <div className="text-center pt-2 border-t border-brand-border text-xs text-brand-muted">
          <span>Already registered? </span>
          <Link href="/login" className="font-bold text-brand-teal hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
