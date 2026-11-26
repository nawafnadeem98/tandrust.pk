"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/my-account";
  const { login } = useAuth();
  const { isUrdu } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login({ email, password });
      router.push(redirectUrl);
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-brand-border shadow-xl">
      <div className="text-center space-y-2">
        <div className="inline-block">
          <Logo size="large" />
        </div>
        <h1 className="text-2xl font-extrabold text-brand-navy pt-2">
          {isUrdu ? "اپنے اکاؤنٹ میں داخل ہوں" : "Sign in to your account"}
        </h1>
        <p className="text-xs text-brand-muted">
          {isUrdu
            ? "طبی اپوائنٹمنٹس، محفوظ مضامین اور رپورٹس کا انتظام کریں"
            : "Manage your bookings, saved health topics, and medical records"}
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-2.5 text-xs text-red-700">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-brand-navy block mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.pk"
              className="w-full pl-10 pr-4 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-brand-navy block">
              Password
            </label>
            <span className="text-[11px] text-brand-teal hover:underline cursor-pointer">
              Forgot password?
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-brand-muted absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
          <span>Sign In to tandrust.pk</span>
        </button>
      </form>

      {/* Quick Demo Logins Helper */}
      <div className="p-4 bg-brand-bg rounded-2xl border border-brand-border/80 text-[11px] space-y-2">
        <p className="font-bold text-brand-navy">Quick Demonstration Accounts:</p>
        <div className="space-y-1 text-brand-muted">
          <p>
            • <strong>Patient:</strong> patient@tandrust.pk / Pakistan123!
          </p>
          <p>
            • <strong>Doctor / Reviewer:</strong> reviewer@tandrust.pk / Pakistan123!
          </p>
          <p>
            • <strong>Super Admin:</strong> admin@tandrust.pk / Admin123!@#
          </p>
        </div>
      </div>

      <div className="text-center pt-2 border-t border-brand-border text-xs text-brand-muted">
        <span>Don&apos;t have an account yet? </span>
        <Link href="/register" className="font-bold text-brand-teal hover:underline">
          Create an Account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<Loader2 className="w-8 h-8 text-brand-teal animate-spin" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
