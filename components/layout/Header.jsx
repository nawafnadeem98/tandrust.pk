"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Globe,
  MapPin,
  User,
  Menu,
  X,
  PhoneCall,
  ChevronDown,
  ShieldCheck,
  Stethoscope,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Logo from "./Logo";
import SearchModal from "../ui/SearchModal";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
const { PAKISTAN_CITIES } = require("@/lib/constants");

export default function Header() {
  const pathname = usePathname();
  const { language, setLanguage, t, isUrdu } = useLanguage();
  const { user, logout } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [healthDropdown, setHealthDropdown] = useState(false);
  const [livewellDropdown, setLivewellDropdown] = useState(false);
  const [selectedCity, setSelectedCity] = useState("All Punjab");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    {
      label: t("nav.healthAZ"),
      href: "/health",
      hasDropdown: true,
      dropdownType: "health",
    },
    { label: isUrdu ? "علامات جانچیں" : "Symptom Checker", href: "/health/symptom-checker" },
    { label: isUrdu ? "اے آئی اسسٹنٹ" : "AI Assistant", href: "/ai-assistant" },
    {
      label: t("nav.services"),
      href: "/services",
      hasDropdown: true,
      dropdownType: "services",
    },
    { label: t("nav.liveWell"), href: "/live-well", hasDropdown: true, dropdownType: "livewell" },
    { label: t("nav.familyHealth"), href: "/family-health" },
    { label: isUrdu ? "خواتین کی صحت" : "Women’s Health", href: "/family-health/womens-health" },
  ];

  return (
    <>
      <header className="tp-header sticky top-0 z-40 border-b shadow-sm">
        {/* Top Utility Ribbon */}
        <div className="bg-brand-bg border-b border-brand-border/60 text-xs py-1.5 px-4 hidden md:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Official tagline and Pakistan emergency quick dial */}
            <div className="flex items-center gap-4 text-brand-muted">
              <span className="flex items-center gap-1 font-medium text-brand-navy">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" />
                {t("brand.officialNotice")}
              </span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <span className="text-brand-error font-bold flex items-center gap-1">
                  <PhoneCall className="w-3 h-3 text-brand-error" />
                  {isUrdu ? "ہنگامی مدد:" : "Emergency Help:"}
                </span>
                <a
                  href="tel:1122"
                  className="bg-red-50 text-brand-error font-bold px-2 py-0.5 rounded border border-red-200 hover:bg-red-100 transition-colors"
                >
                  Rescue 1122
                </a>
                <a
                  href="tel:115"
                  className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  Edhi 115
                </a>
              </div>
            </div>

            {/* Right: Location selector & English/Urdu switcher */}
            <div className="flex items-center gap-4">
              {/* City selector */}
              <div className="flex items-center gap-1 text-brand-navy">
                <MapPin className="w-3.5 h-3.5 text-brand-teal" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs font-medium text-brand-navy border-none focus:outline-none cursor-pointer"
                  aria-label="Select City"
                >
                  <option value="All Punjab">{isUrdu ? "پورا پنجاب" : "All Punjab"}</option>
                  {PAKISTAN_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <span className="text-slate-300">|</span>

              {/* Language Switcher */}
              <div className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-brand-teal" />
                <button
                  onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                  className="font-semibold text-brand-navy hover:text-brand-teal transition-colors px-1.5 py-0.5 rounded hover:bg-brand-mint/60"
                  aria-label="Toggle English or Urdu language"
                >
                  {language === "en" ? "اردو" : "English"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Global Search Trigger (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-brand-bg hover:bg-brand-pale-blue/40 border border-brand-border rounded-xl text-brand-muted text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal group text-left"
                aria-label="Open search dialog"
              >
                <span className="flex items-center gap-2.5 truncate">
                  <Search className="w-4 h-4 text-brand-teal flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">{t("nav.searchPlaceholder")}</span>
                </span>
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono bg-white border border-brand-border rounded text-brand-muted shadow-2xs">
                  Ctrl+K
                </kbd>
              </button>
            </div>

            {/* Auth / Account Quick Actions */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              {/* Emergency Nav Button */}
              <Link
                href="/emergency"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                <span>{t("nav.emergency")}</span>
              </Link>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-brand-mint text-brand-teal-dark hover:bg-brand-teal hover:text-white transition-colors text-xs font-semibold focus:outline-none"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="max-w-[120px] truncate">{user.name}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-brand-border py-2 z-50"
                        onMouseLeave={() => setUserMenuOpen(false)}
                      >
                      <div className="px-4 py-2 border-b border-brand-border text-xs">
                        <p className="font-semibold text-brand-navy">{user.name}</p>
                        <p className="text-brand-muted truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-mint text-brand-teal-dark">
                          {user.role}
                        </span>
                      </div>

                      <Link
                        href="/my-account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-brand-text hover:bg-brand-mint/60 transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-brand-teal" />
                        <span>{t("nav.myAccount")}</span>
                      </Link>

                      {user.role === "PROVIDER" && (
                        <Link
                          href="/provider-dashboard"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-brand-text hover:bg-brand-mint/60 transition-colors"
                        >
                          <Stethoscope className="w-3.5 h-3.5 text-brand-teal" />
                          <span>{t("nav.providerDashboard")}</span>
                        </Link>
                      )}

                      {["ADMIN", "SUPER_ADMIN", "CONTENT_EDITOR", "CLINICAL_REVIEWER"].includes(
                        user.role
                      )}
                      {["ADMIN", "SUPER_ADMIN", "CONTENT_EDITOR", "CLINICAL_REVIEWER"].includes(
                        user.role
                      ) && (
                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-xs text-brand-text hover:bg-brand-mint/60 transition-colors"
                        >
                          <LayoutDashboard className="w-3.5 h-3.5 text-brand-teal" />
                          <span>{t("nav.adminPanel")}</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-brand-error hover:bg-red-50 transition-colors border-t border-brand-border mt-1"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t("nav.signOut")}</span>
                      </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <Link
                    href="/login"
                    className="px-3 py-2 text-brand-navy hover:text-brand-teal hover:bg-brand-mint/50 rounded-lg transition-colors"
                  >
                    {t("nav.signIn")}
                  </Link>
                  <Link
                    href="/register"
                    className="px-3.5 py-2 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-lg shadow-sm transition-colors"
                  >
                    {t("nav.createAccount")}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-brand-navy hover:bg-brand-mint/60 rounded-lg"
                aria-label="Open search"
              >
                <Search className="w-5 h-5 text-brand-teal" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-brand-navy hover:bg-brand-mint/60 rounded-lg"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Primary Navigation Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center justify-between border-t border-brand-border/60 py-2.5 text-sm font-medium"
          >
            <div className="flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                if (link.dropdownType === "health") {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setHealthDropdown(true)}
                      onMouseLeave={() => setHealthDropdown(false)}
                    >
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-brand-teal text-white font-semibold"
                            : "text-brand-text hover:text-brand-teal hover:bg-brand-mint/40"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </Link>

                      <AnimatePresence>
                        {healthDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-brand-border py-2 z-50"
                          >
                            <Link
                              href="/health"
                              className="block px-4 py-2 hover:bg-brand-mint/60 text-xs font-semibold text-brand-navy"
                            >
                              {isUrdu ? "تمام صحت الف تا ے" : "All Health A–Z"}
                            </Link>
                            <Link
                              href="/health/symptom-checker"
                              className="block px-4 py-2 hover:bg-red-50 text-xs font-bold text-red-600 border-b border-brand-border"
                            >
                              {isUrdu ? "علامات جانچیں (1122 آن لائن)" : "🩺 Check Your Symptoms"}
                            </Link>
                            <Link
                              href="/health/conditions"
                              className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                            >
                              {isUrdu ? "بیماریاں اور امراض (Conditions)" : "Medical Conditions"}
                            </Link>
                            <Link
                              href="/health/symptoms"
                              className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                            >
                              {isUrdu ? "علامات اور ابتدائی نگہداشت (Symptoms)" : "Symptoms & First Response"}
                            </Link>
                            <Link
                              href="/health/tests-and-treatments"
                              className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                            >
                              {isUrdu ? "طبی ٹیسٹ اور علاج (Tests & Treatments)" : "Tests & Treatments"}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.dropdownType === "services") {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setServicesDropdown(true)}
                      onMouseLeave={() => setServicesDropdown(false)}
                    >
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-brand-teal text-white font-semibold"
                            : "text-brand-text hover:text-brand-teal hover:bg-brand-mint/40"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </Link>

                      <AnimatePresence>
                        {servicesDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-brand-border py-2 z-50 grid grid-cols-1"
                          >
                          <Link
                            href="/services"
                            className="block px-4 py-2 hover:bg-brand-mint/60 text-xs font-semibold text-brand-navy"
                          >
                            {isUrdu ? "طبی خدمات ڈائرکٹری" : "All Healthcare Services"}
                          </Link>
                          <Link
                            href="/services/doctors"
                            className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                          >
                            {isUrdu ? "ڈاکٹرز اور اسپیشلسٹس (Doctors)" : "Find Doctors & Specialists"}
                          </Link>
                          <Link
                            href="/services/hospitals"
                            className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                          >
                            {isUrdu ? "ہسپتال اور ایمرجنسی رومز (Hospitals)" : "Hospitals & Emergency Trauma"}
                          </Link>
                          <Link
                            href="/services/clinics"
                            className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                          >
                            {isUrdu ? "بنیادی مراکز صحت و کلینکس (Clinics)" : "Clinics & Primary Care Centers"}
                          </Link>
                          <Link
                            href="/services/laboratories"
                            className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                          >
                            {isUrdu ? "لیبارٹریز اور ٹیسٹ سینٹرز (Laboratories)" : "Laboratories & Diagnostics"}
                          </Link>
                          <Link
                            href="/services/pharmacies"
                            className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                          >
                            {isUrdu ? "تصدیق شدہ فارمیسی (Pharmacies)" : "Licensed Pharmacies"}
                          </Link>
                          <Link
                            href="/services/telehealth"
                            className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text"
                          >
                            {isUrdu ? "ٹیلی ہیلتھ آن لائن مشاورت" : "Online Video Consultations"}
                          </Link>
                          <Link
                            href="/appointments"
                            className="block px-4 py-2 hover:bg-brand-mint/60 text-xs font-semibold text-brand-teal border-t border-brand-border mt-1"
                          >
                            {isUrdu ? "اپوائنٹمنٹ بکنگ اور مینجمنٹ" : "Book & Manage Appointments"}
                          </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (link.dropdownType === "livewell") {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setLivewellDropdown(true)}
                      onMouseLeave={() => setLivewellDropdown(false)}
                    >
                      <Link
                        href={link.href}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                          isActive
                            ? "bg-brand-teal text-white font-semibold"
                            : "text-brand-text hover:text-brand-teal hover:bg-brand-mint/40"
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </Link>

                      <AnimatePresence>
                        {livewellDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-brand-border py-2 z-50"
                          >
                            <Link href="/live-well" className="block px-4 py-2 hover:bg-brand-mint/60 text-xs font-semibold text-brand-navy">
                              {isUrdu ? "بھرپور زندگی" : "Live Well Overview"}
                            </Link>
                            <Link href="/live-well/bmi-calculator" className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text">
                              {isUrdu ? "بی ایم آئی کیلکولیٹر" : "BMI Calculator"}
                            </Link>
                            <Link href="/live-well/eat-well" className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text">
                              {isUrdu ? "صحت مند کھانا" : "Eat Well"}
                            </Link>
                            <Link href="/live-well/physical-activity" className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text">
                              {isUrdu ? "ورزش اور سرگرمی" : "Physical Activity"}
                            </Link>
                            <Link href="/live-well/mental-wellbeing" className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text">
                              {isUrdu ? "ذہنی صحت" : "Mental Wellbeing"}
                            </Link>
                            <Link href="/live-well/sleep" className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text">
                              {isUrdu ? "نیند کی صحت" : "Sleep & Rest"}
                            </Link>
                            <Link href="/live-well/prevention" className="block px-4 py-2 hover:bg-brand-mint/60 text-xs text-brand-text">
                              {isUrdu ? "حفاظتی صحت" : "Preventive Health"}
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      isActive
                        ? "bg-brand-teal text-white font-semibold"
                        : "text-brand-text hover:text-brand-teal hover:bg-brand-mint/40"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden border-t border-brand-border bg-white px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto overflow-hidden"
              role="dialog"
              aria-label="Mobile Navigation"
            >
            {/* Mobile language & emergency quick dial */}
            <div className="flex items-center justify-between pb-3 border-b border-brand-border">
              <button
                onClick={() => setLanguage(language === "en" ? "ur" : "en")}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-brand-bg rounded-lg border border-brand-border"
              >
                <Globe className="w-3.5 h-3.5 text-brand-teal" />
                <span>{language === "en" ? "اردو میں دیکھیں" : "Switch to English"}</span>
              </button>

              <a
                href="tel:1122"
                className="flex items-center gap-1 text-xs font-bold text-white bg-red-600 px-3 py-1.5 rounded-lg"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Rescue 1122</span>
              </a>
            </div>

            {/* Mobile Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl font-medium text-brand-navy hover:bg-brand-mint text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/emergency"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-xl font-bold text-red-600 hover:bg-red-50 text-sm"
              >
                {t("nav.emergency")}
              </Link>
            </div>

            {/* User action mobile buttons */}
            <div className="pt-3 border-t border-brand-border space-y-2">
              {user ? (
                <>
                  <Link
                    href="/my-account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2.5 bg-brand-teal text-white rounded-xl font-semibold text-sm"
                  >
                    {t("nav.myAccount")}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="block w-full text-center py-2 text-brand-error text-xs font-semibold"
                  >
                    {t("nav.signOut")}
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2.5 border border-brand-border rounded-xl text-brand-navy font-semibold text-xs"
                  >
                    {t("nav.signIn")}
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center py-2.5 bg-brand-teal text-white rounded-xl font-semibold text-xs shadow-sm"
                  >
                    {t("nav.createAccount")}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
