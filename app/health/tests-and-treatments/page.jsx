import React from "react";
import Link from "next/link";
import { FlaskConical, ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Medical Tests, Procedures & Treatments | tandrust.pk",
  description:
    "Comprehensive guides to common medical tests, laboratory investigations, surgical procedures, and clinical treatments in Pakistan.",
};

export default async function TestsTreatmentsPage() {
  const treatments = await prisma.treatment.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health" className="hover:text-brand-teal transition-colors">Health A–Z</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Tests & Treatments</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal">
          <FlaskConical className="w-4 h-4" />
          <span>Diagnostic Procedures & Clinical Interventions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Tests and Treatments Directory
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Learn what to expect before, during, and after common laboratory tests, radiology scans, and medical procedures conducted at Pakistani hospitals and clinics.
        </p>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Complete Blood Count (CBC)",
            slug: "complete-blood-count-cbc",
            desc: "Standard screening test measuring red blood cells, white blood cells, and platelets. Crucial for monitoring Dengue fever and anemia.",
            category: "Blood Test",
          },
          {
            title: "HbA1c & Fasting Blood Sugar",
            slug: "hba1c-fasting-blood-sugar",
            desc: "Essential diagnostic test providing average blood glucose levels over the past 3 months for Type 2 Diabetes management.",
            category: "Metabolic Test",
          },
          {
            title: "Chest X-Ray & Low-Dose CT",
            slug: "chest-xray-imaging",
            desc: "Radiological imaging evaluating lung fields, cardiac silhouette, TB infiltrates, and smog-related respiratory complications.",
            category: "Radiology",
          },
          {
            title: "Echocardiogram & Cardiac Stress Test",
            slug: "echocardiogram-cardiac",
            desc: "Ultrasound scan of the heart chambers and valves evaluating systolic function and ischemic heart disease.",
            category: "Cardiology",
          },
          {
            title: "Obstetric Anomaly Ultrasound Scan",
            slug: "obstetric-anomaly-ultrasound",
            desc: "Specialized mid-trimester ultrasound performed between weeks 18-22 to inspect fetal anatomical development.",
            category: "Maternity",
          },
          {
            title: "PCR Testing for Hepatitis B & C",
            slug: "hepatitis-b-c-pcr",
            desc: "Quantitative molecular viral load testing determining active viral replication and monitoring direct-acting antiviral therapy.",
            category: "Molecular Biology",
          },
        ].map((test) => (
          <div
            key={test.slug}
            className="bg-white rounded-2xl p-6 border border-brand-border hover:border-brand-teal/40 hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-mint px-2 py-0.5 rounded-full mb-2">
                {test.category}
              </span>
              <h2 className="font-bold text-brand-navy text-lg group-hover:text-brand-teal transition-colors">
                {test.title}
              </h2>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                {test.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-teal">
              <Link href={`/health/tests-and-treatments/${test.slug}`} className="hover:underline flex items-center gap-1">
                <span>Preparation & results guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
