"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  ShieldCheck,
  Heart,
  Send,
  CheckCircle,
  AlertTriangle,
  Globe,
} from "lucide-react";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function Footer() {
  const { t, isUrdu, language, setLanguage } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes("@")) {
      setNewsletterSubmitted(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="bg-brand-navy text-slate-200 border-t border-brand-teal/30">
      {/* Emergency Guidance Strip */}
      <div className="bg-red-950/80 border-b border-red-800/40 py-3.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-red-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong className="text-white mr-1.5 font-bold">
                {isUrdu ? "ہنگامی طبی انتباہ:" : "Emergency Medical Notice:"}
              </strong>
              {t("footer.emergencyDisclaimer")}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="tel:1122"
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1 rounded-md text-xs transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              Rescue 1122
            </a>
            <a
              href="tel:115"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-md text-xs transition-colors"
            >
              Edhi 115
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-white/95 rounded-xl p-2 inline-block shadow-sm">
              <Logo size="normal" isDark={true} />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pr-4">
              {t("brand.supporting")} {t("brand.officialNotice")}
            </p>
            <div className="flex items-center gap-2 text-xs text-brand-mint">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent evidence-informed clinical guidance for Pakistan.</span>
            </div>

            {/* Newsletter signup with safe server state */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white mb-2">
                {isUrdu ? "ماہانہ عوامی صحت بلیٹن سبسکرائب کریں" : "Public Health Updates Newsletter"}
              </p>
              {newsletterSubmitted ? (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
                  <CheckCircle className="w-4 h-4" />
                  <span>{isUrdu ? "سبسکرائب کرنے کا شکریہ!" : "Thank you for subscribing to verified health alerts."}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="name@domain.pk"
                    className="bg-slate-800/80 border border-slate-700 text-white text-xs rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-1 focus:ring-brand-teal"
                  />
                  <button
                    type="submit"
                    className="bg-brand-teal hover:bg-brand-teal-dark text-white px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isUrdu ? "شامل ہوں" : "Join"}</span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Column 1: Health Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 * 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isUrdu ? "صحت کی معلومات" : "Health Topics"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/health" className="hover:text-brand-mint transition-colors">
                  Health A–Z Directory
                </Link>
              </li>
              <li>
                <Link href="/health/conditions" className="hover:text-brand-mint transition-colors">
                  Medical Conditions
                </Link>
              </li>
              <li>
                <Link href="/health/symptoms" className="hover:text-brand-mint transition-colors">
                  Symptoms & First Care
                </Link>
              </li>
              <li>
                <Link href="/health/tests-and-treatments" className="hover:text-brand-mint transition-colors">
                  Tests & Treatments
                </Link>
              </li>
              <li>
                <Link href="/family-health/vaccinations" className="hover:text-brand-mint transition-colors">
                  Pakistan EPI Vaccinations
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 2: Healthcare Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 * 2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isUrdu ? "طبی خدمات" : "Healthcare Services"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/services/doctors" className="hover:text-brand-mint transition-colors">
                  Verified Doctors
                </Link>
              </li>
              <li>
                <Link href="/services/hospitals" className="hover:text-brand-mint transition-colors">
                  Hospitals & Emergency
                </Link>
              </li>
              <li>
                <Link href="/services/clinics" className="hover:text-brand-mint transition-colors">
                  Primary Clinics
                </Link>
              </li>
              <li>
                <Link href="/services/laboratories" className="hover:text-brand-mint transition-colors">
                  Diagnostic Laboratories
                </Link>
              </li>
              <li>
                <Link href="/services/pharmacies" className="hover:text-brand-mint transition-colors">
                  Licensed Pharmacies
                </Link>
              </li>
              <li>
                <Link href="/services/telehealth" className="hover:text-brand-mint transition-colors">
                  Online Telehealth
                </Link>
              </li>
              <li>
                <Link href="/appointments" className="hover:text-brand-mint transition-colors">
                  Book an Appointment
                </Link>
              </li>
              <li>
                <Link href="/provider-verification" className="hover:text-brand-mint transition-colors">
                  Doctor Registration
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Trust, Policy & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.1 * 3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              {isUrdu ? "شفافیت اور پالیسی" : "Trust & Governance"}
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/about" className="hover:text-brand-mint transition-colors">
                  {t("footer.about")}
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-brand-mint transition-colors">
                  {t("footer.editorialPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/medical-review-policy" className="hover:text-brand-mint transition-colors">
                  Medical Review Process
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-mint transition-colors">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-mint transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-brand-mint transition-colors">
                  {t("footer.accessibility")}
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-brand-mint transition-colors">
                  {t("footer.feedback")}
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-brand-mint transition-colors">
                  {t("footer.sitemap")}
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Medical disclaimer paragraph */}
        <div className="mt-10 pt-6 border-t border-slate-700/80 text-xs text-slate-400 leading-relaxed">
          <p>{t("common.disclaimer")}</p>
        </div>

        {/* Bottom copyright and language bar */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            <span>{t("footer.rights")}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Heart className="w-3 h-3 fill-current" /> Designed for Pakistan
            </span>
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage("en")}
              className={`hover:text-white ${language === "en" ? "text-brand-mint font-bold underline" : ""}`}
            >
              English
            </button>
            <span>|</span>
            <button
              onClick={() => setLanguage("ur")}
              className={`hover:text-white ${language === "ur" ? "text-brand-mint font-bold underline font-urdu" : ""}`}
            >
              اردو
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
