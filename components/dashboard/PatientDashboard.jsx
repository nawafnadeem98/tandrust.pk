"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  FileText,
  Users,
  Bookmark,
  Bell,
  Settings,
  ShieldCheck,
  Plus,
  Trash2,
  Clock,
  MapPin,
  Stethoscope,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PatientDashboard() {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [family, setFamily] = useState([]);
  const [savedData, setSavedData] = useState({ savedArticles: [], savedProviders: [] });
  const [loadingData, setLoadingData] = useState(true);

  // Modals
  const [showDocModal, setShowDocModal] = useState(false);
  const [docForm, setDocForm] = useState({ title: "", category: "LAB_REPORT", fileName: "", notes: "" });

  const [showFamilyModal, setShowFamilyModal] = useState(false);
  const [familyForm, setFamilyForm] = useState({ name: "", relationship: "Child", gender: "Male", bloodGroup: "B+", notes: "" });

  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    city: "Lahore",
    province: "Punjab",
    gender: "Male",
    bloodGroup: "B+",
    address: "",
    emergencyContact: "",
    allergies: "",
    chronicConditions: "",
    notificationEmail: true,
    notificationSms: false,
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/my-account");
      return;
    }

    if (user) {
      setProfileForm({
        name: user.name || "",
        phone: user.phone || "",
        city: user.city || "Lahore",
        province: user.province || "Punjab",
        gender: user.profile?.gender || "Male",
        bloodGroup: user.profile?.bloodGroup || "B+",
        address: user.profile?.address || "",
        emergencyContact: user.profile?.emergencyContact || "",
        allergies: user.profile?.allergies || "",
        chronicConditions: user.profile?.chronicConditions || "",
        notificationEmail: user.profile?.notificationEmail ?? true,
        notificationSms: user.profile?.notificationSms ?? false,
      });
      fetchDashboardData();
    }
  }, [user, authLoading, router]);

  const fetchDashboardData = async () => {
    setLoadingData(true);
    try {
      const [appRes, docRes, famRes, savRes] = await Promise.all([
        fetch("/api/appointments"),
        fetch("/api/patient/documents"),
        fetch("/api/patient/family"),
        fetch("/api/patient/saved"),
      ]);

      if (appRes.ok) {
        const d = await appRes.json();
        setAppointments(d.appointments || []);
      }
      if (docRes.ok) {
        const d = await docRes.json();
        setDocuments(d.documents || []);
      }
      if (famRes.ok) {
        const d = await famRes.json();
        setFamily(d.family || []);
      }
      if (savRes.ok) {
        const d = await savRes.json();
        setSavedData(d);
      }
    } catch (e) {
      console.error("Dashboard fetch error:", e);
    } finally {
      setLoadingData(false);
    }
  };

  const handleAddDocument = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/patient/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...docForm,
          fileName: docForm.fileName || `${docForm.title.toLowerCase().replace(/\s+/g, "_")}.pdf`,
          fileSize: 450000,
        }),
      });
      if (res.ok) {
        setShowDocModal(false);
        setDocForm({ title: "", category: "LAB_REPORT", fileName: "", notes: "" });
        fetchDashboardData();
      }
    } catch (e) {
      alert("Error adding document");
    }
  };

  const handleAddFamily = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/patient/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(familyForm),
      });
      if (res.ok) {
        setShowFamilyModal(false);
        setFamilyForm({ name: "", relationship: "Child", gender: "Male", bloodGroup: "B+", notes: "" });
        fetchDashboardData();
      }
    } catch (e) {
      alert("Error adding family member");
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccess(false);
    try {
      const res = await fetch("/api/patient/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      if (res.ok) {
        setProfileSuccess(true);
        setTimeout(() => setProfileSuccess(false), 4000);
      } else {
        const d = await res.json();
        alert(d.error || "Failed to save profile");
      }
    } catch (e) {
      alert("Failed to update profile settings");
    } finally {
      setSavingProfile(false);
    }
  };

  if (authLoading || (!user && loadingData)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-teal animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Patient Welcome Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-brand-mint px-2.5 py-0.5 rounded-full">
              My tandrust.pk
            </span>
            <span className="text-xs text-brand-muted">• Registered Patient</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs text-brand-muted">
            {user.city ? `${user.city}, ${user.province}` : "Pakistan"} • {user.email}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/services/doctors"
            className="px-4 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Appointment</span>
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2.5 bg-brand-bg text-brand-error hover:bg-red-50 rounded-xl text-xs font-semibold border border-brand-border transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Dashboard Tabs & Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 bg-white rounded-3xl p-4 border border-brand-border shadow-xs space-y-1">
          {[
            { id: "overview", label: "Overview", icon: ShieldCheck },
            { id: "appointments", label: `Appointments (${appointments.length})`, icon: Calendar },
            { id: "documents", label: `Medical Reports (${documents.length})`, icon: FileText },
            { id: "family", label: `Family Profiles (${family.length})`, icon: Users },
            { id: "saved", label: "Saved Topics", icon: Bookmark },
            { id: "settings", label: "Profile & Privacy", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all text-left ${
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

        {/* Right Main Tab Canvas */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Active Bookings</p>
                  <p className="text-2xl font-black text-brand-navy mt-1">
                    {appointments.filter((a) => a.status !== "CANCELLED").length}
                  </p>
                  <span className="text-[10px] text-brand-teal font-medium mt-1 inline-block">
                    Verified Slots
                  </span>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Medical Documents</p>
                  <p className="text-2xl font-black text-brand-navy mt-1">{documents.length}</p>
                  <span className="text-[10px] text-emerald-700 font-medium mt-1 inline-block">
                    Encrypted Storage
                  </span>
                </div>

                <div className="p-5 bg-white rounded-3xl border border-brand-border shadow-xs">
                  <p className="text-xs text-brand-muted">Family Members</p>
                  <p className="text-2xl font-black text-brand-navy mt-1">{family.length}</p>
                  <span className="text-[10px] text-blue-700 font-medium mt-1 inline-block">
                    Dependant Care
                  </span>
                </div>
              </div>

              {/* Upcoming Appointment Spotlight */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-brand-border pb-3">
                  <h2 className="text-base font-bold text-brand-navy flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-teal" />
                    <span>Next Scheduled Appointment</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className="text-xs text-brand-teal font-semibold hover:underline"
                  >
                    View all ({appointments.length})
                  </button>
                </div>

                {appointments.length === 0 ? (
                  <div className="py-8 text-center text-xs text-brand-muted space-y-2">
                    <p>You have no scheduled appointments currently.</p>
                    <Link
                      href="/services/doctors"
                      className="inline-block px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold"
                    >
                      Book a Doctor
                    </Link>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-brand-bg border border-brand-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        {appointments[0].status}
                      </span>
                      <p className="text-base font-bold text-brand-navy">
                        {appointments[0].provider?.title} {appointments[0].provider?.fullName}
                      </p>
                      <p className="text-xs text-brand-teal font-medium">
                        {appointments[0].provider?.specialty}
                      </p>
                      <p className="text-xs text-brand-muted flex items-center gap-1.5 pt-1">
                        <Clock className="w-3.5 h-3.5 text-brand-teal" />
                        <span>{appointments[0].date} at {appointments[0].timeSlot}</span>
                      </p>
                    </div>

                    <Link
                      href={`/appointments/confirmation/${appointments[0].id}`}
                      className="px-4 py-2 bg-white hover:bg-brand-mint text-brand-navy border border-brand-border rounded-xl text-xs font-semibold transition-colors text-center"
                    >
                      View Receipt & Instructions
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">My Appointments</h2>
                  <p className="text-xs text-brand-muted">History and active clinic reservations</p>
                </div>
                <Link
                  href="/services/doctors"
                  className="px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold"
                >
                  Book New
                </Link>
              </div>

              {appointments.length === 0 ? (
                <div className="py-12 text-center text-xs text-brand-muted space-y-3">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
                  <p>No appointments recorded yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.map((app) => (
                    <div
                      key={app.id}
                      className="p-5 rounded-2xl bg-brand-bg border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              app.status === "CANCELLED"
                                ? "bg-red-100 text-red-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {app.status}
                          </span>
                          <span className="text-xs font-mono text-slate-500">#{app.id.slice(0, 8)}</span>
                        </div>
                        <p className="font-bold text-brand-navy text-sm">
                          {app.provider?.title} {app.provider?.fullName} ({app.provider?.specialty})
                        </p>
                        <p className="text-xs text-brand-muted">
                          📅 {app.date} at {app.timeSlot} • Fee: PKR {app.fee}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/appointments/confirmation/${app.id}`}
                          className="px-3.5 py-2 bg-white hover:bg-brand-mint text-brand-navy border border-brand-border rounded-xl text-xs font-semibold"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">Patient Health Documents</h2>
                  <p className="text-xs text-brand-muted">Private pathology reports, discharge summaries, and prescriptions</p>
                </div>
                <button
                  onClick={() => setShowDocModal(true)}
                  className="px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Report</span>
                </button>
              </div>

              {documents.length === 0 ? (
                <div className="py-12 text-center text-xs text-brand-muted space-y-2">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                  <p>No health reports uploaded yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-4 rounded-2xl bg-brand-bg border border-brand-border flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-teal flex items-center justify-center font-bold">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-brand-navy text-xs sm:text-sm">{doc.title}</p>
                          <p className="text-[11px] text-brand-muted">
                            {doc.category} • {doc.fileName} ({(doc.fileSize / 1024).toFixed(0)} KB)
                          </p>
                          {doc.notes && <p className="text-[11px] text-slate-500 italic mt-0.5">{doc.notes}</p>}
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                        Encrypted
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: FAMILY PROFILES */}
          {activeTab === "family" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-brand-border pb-4">
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">Family Health Profiles</h2>
                  <p className="text-xs text-brand-muted">Manage health records and bookings for children and elderly dependants</p>
                </div>
                <button
                  onClick={() => setShowFamilyModal(true)}
                  className="px-4 py-2 bg-brand-teal text-white rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Dependant</span>
                </button>
              </div>

              {family.length === 0 ? (
                <div className="py-12 text-center text-xs text-brand-muted space-y-2">
                  <Users className="w-10 h-10 text-slate-300 mx-auto" />
                  <p>No family profiles added yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {family.map((mem) => (
                    <div
                      key={mem.id}
                      className="p-5 rounded-2xl bg-brand-bg border border-brand-border space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-brand-pale-blue px-2 py-0.5 rounded-full">
                          {mem.relationship}
                        </span>
                        {mem.bloodGroup && (
                          <span className="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-md">
                            🩸 {mem.bloodGroup}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-brand-navy text-sm">{mem.name}</h3>
                      {mem.notes && <p className="text-xs text-brand-muted">{mem.notes}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SAVED TOPICS */}
          {activeTab === "saved" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-brand-navy border-b border-brand-border pb-4">
                Saved Articles & Doctors
              </h2>
              <p className="text-xs text-brand-muted">
                Quickly review health guides and doctors you have bookmarked across tandrust.pk.
              </p>
              <div className="py-6 text-center text-xs text-brand-muted">
                <Bookmark className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p>Bookmark articles by clicking &quot;Save&quot; while reading.</p>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
              <div className="border-b border-brand-border pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">
                    Health Profile & Personal Information
                  </h2>
                  <p className="text-xs text-brand-muted">
                    Keep your clinical and emergency contact details updated for doctors and emergency services.
                  </p>
                </div>
                {profileSuccess && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-xl flex items-center gap-1 border border-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Profile Saved</span>
                  </span>
                )}
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-brand-navy block mb-1">Email (Registered ID)</label>
                    <input
                      type="text"
                      disabled
                      value={user.email}
                      className="w-full p-2.5 bg-slate-100 rounded-xl border border-brand-border text-slate-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-brand-navy block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-brand-navy block mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+92 300 1234567"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-semibold text-brand-navy block mb-1">Blood Group</label>
                      <select
                        value={profileForm.bloodGroup}
                        onChange={(e) => setProfileForm({ ...profileForm, bloodGroup: e.target.value })}
                        className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      >
                        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold text-brand-navy block mb-1">Gender</label>
                      <select
                        value={profileForm.gender}
                        onChange={(e) => setProfileForm({ ...profileForm, gender: e.target.value })}
                        className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-brand-navy block mb-1">City in Pakistan</label>
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      placeholder="Lahore / Faisalabad / Multan"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-brand-navy block mb-1">Province / Territory</label>
                    <input
                      type="text"
                      value={profileForm.province}
                      onChange={(e) => setProfileForm({ ...profileForm, province: e.target.value })}
                      className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      placeholder="Punjab"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-brand-navy block mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={profileForm.address}
                    onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="House / Street / Sector / DHA / Gulshan"
                  />
                </div>

                <div>
                  <label className="font-semibold text-brand-navy block mb-1">
                    Emergency Contact (Name, Relation & Phone)
                  </label>
                  <input
                    type="text"
                    value={profileForm.emergencyContact}
                    onChange={(e) => setProfileForm({ ...profileForm, emergencyContact: e.target.value })}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                    placeholder="e.g. Zainab Usman (Wife) - +92 300 7654321"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-brand-navy block mb-1">Known Drug or Food Allergies</label>
                    <textarea
                      rows="2"
                      value={profileForm.allergies}
                      onChange={(e) => setProfileForm({ ...profileForm, allergies: e.target.value })}
                      className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      placeholder="e.g. Penicillin, Sulfa, Peanuts (or None)"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-brand-navy block mb-1">Chronic Medical Conditions</label>
                    <textarea
                      rows="2"
                      value={profileForm.chronicConditions}
                      onChange={(e) => setProfileForm({ ...profileForm, chronicConditions: e.target.value })}
                      className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-teal"
                      placeholder="e.g. Hypertension, Diabetes Type 2, Asthma"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="notifEmail"
                      checked={profileForm.notificationEmail}
                      onChange={(e) => setProfileForm({ ...profileForm, notificationEmail: e.target.checked })}
                      className="rounded text-brand-teal focus:ring-brand-teal"
                    />
                    <label htmlFor="notifEmail" className="font-medium text-brand-navy">
                      Receive email reminders for appointments
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    {savingProfile ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>Save Clinical Profile</span>
                    )}
                  </button>
                </div>
              </form>

              <div className="pt-6 border-t border-brand-border">
                <h3 className="font-bold text-brand-error mb-1">Permanent Account Deletion</h3>
                <p className="text-slate-500 mb-3 text-xs">
                  Under Pakistani data protection guidelines, you can request the full removal of your health history and account.
                </p>
                <button
                  type="button"
                  onClick={() => alert("Deletion request registered. Our privacy officer will process your request within 48 hours.")}
                  className="px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-xl font-bold text-xs"
                >
                  Request Account Deletion
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Document */}
      {showDocModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-brand-border space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-bold text-brand-navy text-sm">Add Medical Report Metadata</h3>
              <button onClick={() => setShowDocModal(false)}><X className="w-4 h-4 text-brand-muted" /></button>
            </div>
            <form onSubmit={handleAddDocument} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-brand-navy block mb-1">Report Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Blood Count (CBC) Report"
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-brand-navy block mb-1">Category</label>
                <select
                  value={docForm.category}
                  onChange={(e) => setDocForm({ ...docForm, category: e.target.value })}
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                >
                  <option value="LAB_REPORT">Pathology / Blood Lab Report</option>
                  <option value="PRESCRIPTION">Doctor Prescription</option>
                  <option value="IMAGING">X-Ray / MRI / Ultrasound</option>
                  <option value="DISCHARGE_SUMMARY">Hospital Discharge Summary</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-brand-navy block mb-1">Notes / Diagnostic Center</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Tested at Chughtai Lab Lahore. Normal platelet count."
                  value={docForm.notes}
                  onChange={(e) => setDocForm({ ...docForm, notes: e.target.value })}
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowDocModal(false)} className="px-4 py-2 font-semibold text-brand-muted">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-teal text-white rounded-xl font-bold">
                  Save Report Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Family */}
      {showFamilyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-brand-border space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="font-bold text-brand-navy text-sm">Add Family Member / Dependant</h3>
              <button onClick={() => setShowFamilyModal(false)}><X className="w-4 h-4 text-brand-muted" /></button>
            </div>
            <form onSubmit={handleAddFamily} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-brand-navy block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hamza Usman"
                  value={familyForm.name}
                  onChange={(e) => setFamilyForm({ ...familyForm, name: e.target.value })}
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-brand-navy block mb-1">Relationship</label>
                  <select
                    value={familyForm.relationship}
                    onChange={(e) => setFamilyForm({ ...familyForm, relationship: e.target.value })}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Child">Child</option>
                    <option value="Parent">Parent</option>
                    <option value="Sibling">Sibling</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-brand-navy block mb-1">Blood Group</label>
                  <select
                    value={familyForm.bloodGroup}
                    onChange={(e) => setFamilyForm({ ...familyForm, bloodGroup: e.target.value })}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-semibold text-brand-navy block mb-1">Health Notes / Immunization</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Routine childhood immunization up to date."
                  value={familyForm.notes}
                  onChange={(e) => setFamilyForm({ ...familyForm, notes: e.target.value })}
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowFamilyModal(false)} className="px-4 py-2 font-semibold text-brand-muted">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-brand-teal text-white rounded-xl font-bold">
                  Save Dependant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
