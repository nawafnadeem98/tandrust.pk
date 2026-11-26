"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageSquare, Star, CheckCircle2, AlertCircle, Loader2, ChevronRight } from "lucide-react";

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "CONTENT_ACCURACY",
    message: "",
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit feedback");

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Feedback & Corrections</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
          Editorial Continuous Quality Improvement
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Content Feedback & Corrections
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Spotted an error, an outdated clinic timing, or a typo in a medical article? Our clinical editorial board reviews every submission to ensure total factual accuracy.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs">
        {success ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-bold text-brand-navy">Thank You for Your Feedback!</h2>
            <p className="text-xs text-brand-muted leading-relaxed">
              Your report has been logged and assigned to our clinical review team. Continuous peer feedback keeps tandrust.pk safe and reliable.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-brand-navy block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  placeholder="Dr. Tariq / Citizen Name"
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

            <div>
              <label className="text-xs font-semibold text-brand-navy block mb-1">Feedback Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
              >
                <option value="CONTENT_ACCURACY">Medical Content Accuracy / Clinical Correction</option>
                <option value="PROVIDER_REPORT">Incorrect Doctor / Hospital Information</option>
                <option value="SUGGESTION">Feature Suggestion or Missing Topic</option>
                <option value="BUG">Technical Issue / Broken Link</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-navy block mb-1">Description / Details</label>
              <textarea
                required
                rows="4"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs focus:outline-none focus:ring-2 focus:ring-brand-teal"
                placeholder="Please describe the correction or suggestion in detail, including the specific article URL if applicable..."
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-navy block mb-1">Platform Usability Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1 border transition-all ${
                      formData.rating >= star
                        ? "bg-amber-50 text-amber-800 border-amber-300"
                        : "bg-brand-bg text-brand-muted border-brand-border"
                    }`}
                  >
                    <Star className="w-4 h-4 fill-current" />
                    <span>{star}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
              <span>Submit for Editorial Review</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
