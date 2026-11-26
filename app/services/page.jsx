import React from "react";
import Link from "next/link";
import { FadeUpSection, StaggerSection, StaggerItem, HoverCard } from "@/components/ui/AnimationWrappers";
import {
  Stethoscope,
  Building2,
  Pill,
  FlaskConical,
  Video,
  Baby,
  Brain,
  Eye,
  Smile,
  ShieldCheck,
  MapPin,
  ArrowRight,
  PhoneCall,
  Calendar,
} from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Healthcare Services Directory in Pakistan | tandrust.pk",
  description:
    "Find verified doctors, tertiary hospitals, diagnostic laboratories, 24/7 pharmacies, and telehealth services across Pakistan.",
};

export default async function ServicesHubPage() {
  const serviceCategories = [
    {
      title: "Find a Doctor",
      slug: "doctors",
      desc: "PMC registered consultants, cardiologists, gynecologists, pediatricians, and general physicians.",
      icon: Stethoscope,
      href: "/services/doctors",
      badge: "Verified PMDC",
    },
    {
      title: "Hospitals & Trauma Centers",
      slug: "hospitals",
      desc: "Major public teaching hospitals, private medical centers, and 24/7 emergency wards across all provinces.",
      icon: Building2,
      href: "/services/hospitals",
      badge: "24/7 Care",
    },
    {
      title: "Diagnostic Laboratories",
      slug: "laboratories",
      desc: "ISO 15189 accredited pathology hubs, blood collection points, and home sampling services.",
      icon: FlaskConical,
      href: "/services/laboratories",
      badge: "Accredited",
    },
    {
      title: "Licensed Pharmacies",
      slug: "pharmacies",
      desc: "Temperature-controlled retail pharmacies with verified cold-chain storage for vaccines and biologics.",
      icon: Pill,
      href: "/services/pharmacies",
      badge: "Cold-Chain Monitored",
    },
    {
      title: "Online Telehealth Consultations",
      slug: "telehealth",
      desc: "Speak with certified Pakistani specialists from home via secure, encrypted video consultations.",
      icon: Video,
      href: "/services/telehealth",
      badge: "Virtual Care",
    },
    {
      title: "Maternity & Women's Health",
      slug: "maternity",
      desc: "Specialized maternal-fetal medicine clinics, antenatal care units, and institutional delivery facilities.",
      icon: Baby,
      href: "/services/maternity",
      badge: "Antenatal",
    },
    {
      title: "Mental Health & Counseling",
      slug: "mental-health",
      desc: "Accredited psychiatric clinics, clinical psychologists, and confidential crisis support helplines.",
      icon: Brain,
      href: "/services/mental-health",
      badge: "Confidential",
    },
    {
      title: "Dental Care Clinics",
      slug: "dentists",
      desc: "Comprehensive oral health clinics, orthodontic specialists, and restorative dental surgeons.",
      icon: Smile,
      href: "/services/dentists",
      badge: "Oral Health",
    },
    {
      title: "Eye Care & Ophthalmology",
      slug: "eye-care",
      desc: "Specialized ophthalmology institutes, cataract surgery centers, and pediatric vision screening.",
      icon: Eye,
      href: "/services/eye-care",
      badge: "Vision",
    },
    {
      title: "Emergency & Trauma Response",
      slug: "emergency-care",
      desc: "Ambulance dispatches, burn centers, poison control, and life-threatening trauma units.",
      icon: PhoneCall,
      href: "/services/emergency-care",
      badge: "Immediate Action",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-mint/90 via-brand-bg to-brand-pale-blue/80 rounded-3xl p-6 sm:p-10 border border-brand-teal/20 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
          National Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Healthcare Services in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-3xl leading-relaxed">
          Locate verified medical specialists, tertiary hospital departments, ISO-accredited diagnostic labs, and licensed pharmacies in Lahore, Faisalabad, Rawalpindi, Multan and across Punjab.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/services/doctors"
            className="px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-semibold hover:bg-brand-teal-dark shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Search Verified Doctors</span>
          </Link>
          <Link
            href="/appointments"
            className="px-5 py-2.5 bg-white text-brand-navy border border-brand-border rounded-xl text-xs font-semibold hover:bg-brand-mint transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4 text-brand-teal" />
            <span>Book an Appointment</span>
          </Link>
        </div>
      </div>

      {/* Directory Services Grid */}
      <FadeUpSection>
        <h2 className="sr-only">Service Categories</h2>
      </FadeUpSection>
      <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <StaggerItem key={cat.slug}>
              <HoverCard>
                <Link
                  href={cat.href}
                  className="bg-white rounded-2xl p-6 border border-brand-border hover:border-brand-teal/50 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-mint text-brand-teal flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-bg text-brand-navy border border-brand-border">
                        {cat.badge}
                      </span>
                    </div>

                    <h2 className="font-bold text-brand-navy text-lg group-hover:text-brand-teal transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-teal">
                    <span>Explore directory</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerSection>
    </div>
  );
}
