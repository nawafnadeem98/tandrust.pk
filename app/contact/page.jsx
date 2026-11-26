"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ChevronRight } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit message");

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Contact & Support</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-brand-navy text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-lg">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">Get In Touch</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Contact & Support</h1>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Have questions regarding our directory listings, clinical reviews, or technical support? Our team is here to assist.
            </p>
          </div>

          <div className="space-y-4 text-xs pt-4 border-t border-slate-700">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-brand-mint flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-400">Editorial & General Inquiries</p>
                <a href="mailto:support@tandrust.pk" className="font-semibold text-white hover:underline">
                  support@tandrust.pk
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-brand-mint flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-400">Toll-Free Health Guidance</p>
                <p className="font-semibold text-white">0800-09009 (24/7)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-brand-mint flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-slate-400">Headquarters</p>
                <p className="font-semibold text-white">Sector G-5/2, Islamabad, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Submission Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs">
          {success ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="text-xl font-bold text-brand-navy">Message Received</h2>
              <p className="text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
                Thank you for contacting tandrust.pk. Our clinical and operational support team will review your inquiry and respond within 24–48 business hours.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-5 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-brand-navy">Send us a message</h2>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-brand-navy block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="Muhammad Usman"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-brand-navy block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="name@domain.pk"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-brand-navy block mb-1">Phone Number (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none"
                    placeholder="+92 300 1234567"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-brand-navy block mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="e.g. Content question, doctor inquiry..."
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-navy block mb-1">Your Message</label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="How can our editorial or support desk assist you?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Send Message to Support</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
