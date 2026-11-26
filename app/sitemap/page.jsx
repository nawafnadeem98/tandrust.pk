import React from "react";
import Link from "next/link";
import { Map, ChevronRight } from "lucide-react";

export const metadata = {
  title: "Site Map & Architecture | tandrust.pk",
  description: "Complete navigation index of all clinical information and services on tandrust.pk.",
};

export default function SitemapPage() {
  const sections = [
    {
      title: "Health Topics & Conditions",
      links: [
        { label: "Health A–Z Directory", href: "/health" },
        { label: "Medical Conditions", href: "/health/conditions" },
        { label: "Symptoms & First Care", href: "/health/symptoms" },
        { label: "Tests & Treatments", href: "/health/tests-and-treatments" },
        { label: "Dengue Fever Guide", href: "/health/conditions/dengue-fever" },
        { label: "Type 2 Diabetes Guide", href: "/health/conditions/type-2-diabetes" },
        { label: "Hypertension (High BP)", href: "/health/conditions/hypertension" },
        { label: "Typhoid Fever & XDR", href: "/health/conditions/typhoid-fever" },
      ],
    },
    {
      title: "Medicines & Pharmacology",
      links: [
        { label: "Medicines A–Z", href: "/medicines" },
        { label: "Paracetamol", href: "/medicines/paracetamol" },
        { label: "Amoxicillin / Clavulanate", href: "/medicines/amoxicillin-clavulanate" },
        { label: "Metformin Hydrochloride", href: "/medicines/metformin" },
        { label: "Oral Rehydration Salts (ORS)", href: "/medicines/oral-rehydration-salts" },
      ],
    },
    {
      title: "Healthcare Services & Facilities",
      links: [
        { label: "Services Hub", href: "/services" },
        { label: "Find a Doctor", href: "/services/doctors" },
        { label: "Hospitals & Trauma Centers", href: "/services/hospitals" },
        { label: "Diagnostic Laboratories", href: "/services/laboratories" },
        { label: "Licensed Pharmacies", href: "/services/pharmacies" },
        { label: "Telehealth Video Consults", href: "/services/telehealth" },
        { label: "Book an Appointment", href: "/appointments" },
        { label: "Doctor Registration", href: "/provider-verification" },
      ],
    },
    {
      title: "Healthy Living & Prevention (Live Well)",
      links: [
        { label: "Live Well Hub", href: "/live-well" },
        { label: "Eat Well (Healthy Desi Diet)", href: "/live-well/eat-well" },
        { label: "Physical Activity & Fitness", href: "/live-well/physical-activity" },
        { label: "Sleep Hygiene", href: "/live-well/sleep" },
        { label: "Mental Wellbeing", href: "/live-well/mental-wellbeing" },
        { label: "Preventive Care & Smog Safety", href: "/live-well/prevention" },
      ],
    },
    {
      title: "Family & Pediatric Health",
      links: [
        { label: "Family Health Overview", href: "/family-health" },
        { label: "Pregnancy & Antenatal Care", href: "/family-health/pregnancy" },
        { label: "Newborn First 40 Days", href: "/family-health/baby" },
        { label: "Child Growth & Health", href: "/family-health/children" },
        { label: "Pakistan EPI Vaccinations", href: "/family-health/vaccinations" },
        { label: "Women's Health", href: "/family-health/womens-health" },
        { label: "Healthy Ageing (Senior Care)", href: "/family-health/healthy-ageing" },
      ],
    },
    {
      title: "Emergency Services",
      links: [
        { label: "Emergency Overview", href: "/emergency" },
        { label: "Basic First Aid Protocols", href: "/emergency/first-aid" },
        { label: "When to Seek Emergency Care", href: "/emergency/when-to-seek-help" },
        { label: "Verified Emergency Contacts", href: "/emergency/contacts" },
      ],
    },
    {
      title: "Trust, Governance & Account",
      links: [
        { label: "About tandrust.pk", href: "/about" },
        { label: "Editorial Policy", href: "/editorial-policy" },
        { label: "Medical Review Policy", href: "/medical-review-policy" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Use", href: "/terms" },
        { label: "Accessibility Statement", href: "/accessibility" },
        { label: "Contact & Support", href: "/contact" },
        { label: "Feedback & Content Corrections", href: "/feedback" },
        { label: "Patient Sign In", href: "/login" },
        { label: "Create Account", href: "/register" },
        { label: "My Sehat Dashboard", href: "/my-account" },
        { label: "Doctor Portal", href: "/provider-dashboard" },
        { label: "Administrative Panel", href: "/admin" },
      ],
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Sitemap</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Information Architecture</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Platform Site Map</h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Complete index of all public health reference guides, service directories, and administrative tools on tandrust.pk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((sec) => (
          <div key={sec.title} className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs space-y-3">
            <h2 className="font-bold text-brand-navy text-sm uppercase tracking-wider border-b border-brand-border pb-2">
              {sec.title}
            </h2>
            <ul className="space-y-1.5 text-xs text-brand-muted">
              {sec.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-teal transition-colors block py-0.5">
                    • {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
