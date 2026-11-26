"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  FileText,
  ShieldAlert,
  Settings,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Edit3,
  Loader2,
  AlertCircle,
  Search,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminPortal() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [metrics, setMetrics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [providersList, setProvidersList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Article Modal
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [articleForm, setArticleForm] = useState({
    title: "",
    slug: "",
    summary: "",
    content: "",
    category: "LIVE_WELL",
    subCategory: "eat-well",
    status: "PUBLISHED",
    authorName: "Dr. Fatima Noor",
    reviewerName: "Prof. Dr. Tariq Mahmood",
    readTime: 5,
  });

  const isAuthorized = user && ["ADMIN", "SUPER_ADMIN", "CONTENT_EDITOR", "CLINICAL_REVIEWER"].includes(user.role);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login?redirect=/admin");
      } else if (!isAuthorized) {
        alert("Access denied. Admin role required.");
        router.push("/");
      } else {
        loadData();
      }
    }
  }, [user, authLoading, router, isAuthorized]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [metRes, usrRes, proRes, artRes] = await Promise.all([
        fetch("/api/admin/metrics"),
        fetch("/api/admin/users"),
        fetch("/api/admin/providers"),
        fetch("/api/admin/articles"),
      ]);

      if (metRes.ok) {
        const d = await metRes.json();
        setMetrics(d.metrics);
        setAuditLogs(d.recentAuditLogs || []);
      }
      if (usrRes.ok) {
        const d = await usrRes.json();
        setUsersList(d.users || []);
      }
      if (proRes.ok) {
        const d = await proRes.json();
        setProvidersList(d.providers || []);
      }
      if (artRes.ok) {
        const d = await artRes.json();
        setArticlesList(d.articles || []);
      }
    } catch (e) {
      console.error("Admin load error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderVerification = async (providerId, status) => {
    try {
      const res = await fetch("/api/admin/providers", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          providerId,
          verificationStatus: status,
          verificationNotes: `Processed by ${user.name}`,
        }),
      });

      if (res.ok) {
        loadData();
      }
    } catch (e) {
      alert("Error updating provider status");
    }
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articleForm),
      });

      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Failed to create article");

      setShowArticleModal(false);
      setArticleForm({
        title: "",
        slug: "",
        summary: "",
        content: "",
        category: "LIVE_WELL",
        subCategory: "eat-well",
        status: "PUBLISHED",
        authorName: "Dr. Fatima Noor",
        reviewerName: "Prof. Dr. Tariq Mahmood",
        readTime: 5,
      });
      loadData();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this article?")) return;
    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, { method: "DELETE" });
      if (res.ok) loadData();
    } catch (e) {
      alert("Error deleting article");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-mint bg-white/10 px-2.5 py-0.5 rounded-full">
            Admin Console & Clinical CMS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
            tandrust.pk Operational Panel
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Operator: <strong>{user.name}</strong> ({user.role})
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            Refresh Metrics
          </button>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-brand-border shadow-xs space-y-1">
          {[
            { id: "dashboard", label: "Dashboard Metrics", icon: LayoutDashboard },
            { id: "articles", label: `Clinical Articles (${articlesList.length})`, icon: FileText },
            { id: "providers", label: `Doctor Approvals (${providersList.length})`, icon: Stethoscope },
            { id: "users", label: `Registered Users (${usersList.length})`, icon: Users },
            { id: "audit", label: "Security & Audit Logs", icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-brand-teal text-white shadow-xs"
                    : "text-brand-navy hover:bg-brand-mint"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Canvas */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: METRICS DASHBOARD */}
          {activeTab === "dashboard" && metrics && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Total Users</p>
                  <p className="text-2xl font-black text-brand-navy mt-1">{metrics.totalUsers}</p>
                </div>
                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Verified Doctors</p>
                  <p className="text-2xl font-black text-brand-navy mt-1">{metrics.totalProviders}</p>
                </div>
                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Published Articles</p>
                  <p className="text-2xl font-black text-brand-navy mt-1">{metrics.totalArticles}</p>
                </div>
                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Total Appointments</p>
                  <p className="text-2xl font-black text-brand-navy mt-1">{metrics.totalAppointments}</p>
                </div>
                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Pending Applications</p>
                  <p className="text-2xl font-black text-amber-700 mt-1">{metrics.pendingProviders}</p>
                </div>
                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Pending Feedback</p>
                  <p className="text-2xl font-black text-brand-teal mt-1">{metrics.pendingFeedback}</p>
                </div>
              </div>

              {/* Recent Audit Stream */}
              <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs space-y-4">
                <h2 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-brand-teal" />
                  <span>Real-time Audit Log Stream</span>
                </h2>
                <div className="space-y-2 text-xs">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-brand-bg rounded-xl border border-brand-border/70 flex items-center justify-between gap-4 font-mono text-[11px]"
                    >
                      <div>
                        <span className="font-bold text-brand-navy">{log.action}</span>
                        <span className="text-brand-muted ml-2">on {log.resource}</span>
                      </div>
                      <span className="text-slate-400">
                        {new Date(log.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTICLES CMS */}
          {activeTab === "articles" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">Clinical Articles & Guides</h2>
                  <p className="text-xs text-brand-muted">Create, edit, and publish clinical health content</p>
                </div>
                <button
                  onClick={() => setShowArticleModal(true)}
                  className="px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Health Article</span>
                </button>
              </div>

              <div className="space-y-3">
                {articlesList.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 rounded-2xl bg-brand-bg border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {art.status}
                        </span>
                        <span className="text-xs text-brand-muted">{art.category}</span>
                      </div>
                      <p className="font-bold text-brand-navy text-sm mt-1">{art.title}</p>
                      <p className="text-xs text-brand-muted">Slug: /{art.slug} • Reviewer: {art.reviewerName}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/live-well/${art.slug}`}
                        target="_blank"
                        className="px-3 py-1.5 bg-white text-brand-navy border border-brand-border rounded-lg text-xs font-semibold hover:bg-brand-mint"
                      >
                        View Live
                      </Link>
                      <button
                        onClick={() => handleDeleteArticle(art.id)}
                        className="p-1.5 text-brand-error hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROVIDERS APPROVAL */}
          {activeTab === "providers" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="border-b border-brand-border pb-4">
                <h2 className="text-lg font-bold text-brand-navy">Doctor & Practitioner Verification</h2>
                <p className="text-xs text-brand-muted">Verify PMDC registration credentials and grant verified status</p>
              </div>

              <div className="space-y-3">
                {providersList.map((dr) => (
                  <div
                    key={dr.id}
                    className="p-5 rounded-2xl bg-brand-bg border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            dr.verificationStatus === "APPROVED"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {dr.verificationStatus}
                        </span>
                        <span className="text-xs font-mono text-slate-500">PMC: {dr.pmcNumber || "N/A"}</span>
                      </div>
                      <p className="font-bold text-brand-navy text-sm">
                        {dr.title} {dr.fullName} ({dr.specialty})
                      </p>
                      <p className="text-xs text-brand-muted">{dr.clinicAddress}, {dr.city}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {dr.verificationStatus !== "APPROVED" && (
                        <button
                          onClick={() => handleProviderVerification(dr.id, "APPROVED")}
                          className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
                        >
                          Approve & Verify
                        </button>
                      )}
                      {dr.verificationStatus !== "REJECTED" && (
                        <button
                          onClick={() => handleProviderVerification(dr.id, "REJECTED")}
                          className="px-3.5 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-100"
                        >
                          Reject
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: USER MANAGEMENT */}
          {activeTab === "users" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="border-b border-brand-border pb-4">
                <h2 className="text-lg font-bold text-brand-navy">Registered User Accounts</h2>
                <p className="text-xs text-brand-muted">Role permissions and account states</p>
              </div>

              <div className="space-y-2 text-xs">
                {usersList.map((u) => (
                  <div
                    key={u.id}
                    className="p-3.5 bg-brand-bg rounded-xl border border-brand-border flex items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-bold text-brand-navy">{u.name}</p>
                      <p className="text-brand-muted">{u.email} • {u.city || "Pakistan"}</p>
                    </div>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-mono">
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AUDIT LOGS */}
          {activeTab === "audit" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="border-b border-brand-border pb-4">
                <h2 className="text-lg font-bold text-brand-navy">Security Audit Records</h2>
                <p className="text-xs text-brand-muted">Immutable log of administrative access and role changes</p>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-brand-bg rounded-xl border border-brand-border">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-brand-teal">{log.action}</span>
                      <span className="text-slate-400">{new Date(log.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-600 mt-1">Resource: {log.resource} • IP: {log.ipAddress || "127.0.0.1"}</p>
                    {log.details && <p className="text-slate-500 mt-0.5 italic">{log.details}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-brand-border space-y-4 my-8 shadow-2xl">
            <h3 className="font-bold text-brand-navy text-lg">Author New Clinical Article</h3>

            <form onSubmit={handleCreateArticle} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-brand-navy block mb-1">Article Title</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                      setArticleForm({ ...articleForm, title, slug });
                    }}
                    placeholder="e.g. Winter Pneumonia Prevention in Children"
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-brand-navy block mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={articleForm.slug}
                    onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-brand-navy block mb-1">Summary / Lead Paragraph</label>
                <textarea
                  rows="2"
                  required
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  placeholder="Concise, evidence-based summary for patient awareness..."
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-brand-navy block mb-1">Detailed Content (Markdown Supported)</label>
                <textarea
                  rows="6"
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  placeholder="### Clinical Background\nExplain pathology, self-care steps, and warning signs..."
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-brand-navy block mb-1">Category</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border"
                  >
                    <option value="LIVE_WELL">Live Well</option>
                    <option value="FAMILY_HEALTH">Family Health</option>
                    <option value="CONDITIONS">Conditions</option>
                    <option value="NEWS">Public Health News</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-brand-navy block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={articleForm.authorName}
                    onChange={(e) => setArticleForm({ ...articleForm, authorName: e.target.value })}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border"
                  />
                </div>

                <div>
                  <label className="font-semibold text-brand-navy block mb-1">Reviewer Name</label>
                  <input
                    type="text"
                    value={articleForm.reviewerName}
                    onChange={(e) => setArticleForm({ ...articleForm, reviewerName: e.target.value })}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 font-semibold text-brand-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-teal text-white rounded-xl font-bold shadow-xs hover:bg-brand-teal-dark"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
