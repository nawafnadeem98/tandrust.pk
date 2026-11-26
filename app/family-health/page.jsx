import React from "react";
import Link from "next/link";
import { Baby, Heart, ShieldCheck, ChevronRight, ArrowRight, UserCheck } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Family Health — Maternal, Pediatric & Geriatric Care | tandrust.pk",
  description:
    "Evidence-informed guidance on pregnancy, newborn care, Pakistan EPI vaccinations, women's health, and healthy ageing.",
};

export default async function FamilyHealthPage() {
  const articles = await prisma.healthArticle.findMany({
    where: { category: "FAMILY_HEALTH", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  const familyTopics = [
    {
      title: "Pregnancy & Antenatal Care",
      urdu: "حمل اور پیدائش سے قبل نگہداشت",
      slug: "pregnancy",
      desc: "Trimester-by-trimester checkups, folic acid, anomaly ultrasounds, and gestational diabetes screening.",
      color: "bg-rose-50 text-rose-700",
    },
    {
      title: "Newborn Care (First 40 Days)",
      urdu: "نومولود کی دیکھ بھال (پہلے 40 دن)",
      slug: "baby",
      desc: "Exclusive breastfeeding, umbilical cord hygiene, neonatal jaundice warning signs, and newborn sleep.",
      color: "bg-amber-50 text-amber-800",
    },
    {
      title: "Children's Health & Growth",
      urdu: "بچوں کی نشوونما اور صحت",
      slug: "children",
      desc: "Developmental milestones, balanced childhood nutrition, childhood asthma, and infection control.",
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Pakistan EPI Vaccinations",
      urdu: "بچوں کے مفت حفاظتی ٹیکے",
      slug: "vaccinations",
      desc: "Government immunization schedule protecting infants against 12 deadly diseases from birth.",
      color: "bg-emerald-50 text-emerald-800",
    },
    {
      title: "Women's Health",
      urdu: "خواتین کی مخصوص صحت",
      slug: "womens-health",
      desc: "PCOS management, iron deficiency anemia, breast self-examination, and bone density (osteoporosis).",
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Healthy Ageing (Senior Care)",
      urdu: "بزرگوں کی نگہداشت اور صحت",
      slug: "healthy-ageing",
      desc: "Joint mobility, arthritis, memory care, hypertension monitoring, and fall prevention in senior years.",
      color: "bg-teal-50 text-teal-800",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Family Health</span>
      </nav>

      <div className="bg-gradient-to-r from-brand-pale-blue via-brand-bg to-brand-mint rounded-3xl p-6 sm:p-10 border border-brand-blue/20 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
          Lifespan Clinical Guidance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Family Health in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          From antenatal care and newborn feeding to routine EPI childhood immunizations and geriatric wellbeing, find reliable guidance reviewed by pediatricians and gynecologists.
        </p>
      </div>

      {/* Grid of 6 Subtopics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {familyTopics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/family-health/${topic.slug}`}
            className="bg-white rounded-3xl p-6 border border-brand-border hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            <div>
              <span className={`text-[11px] font-bold px-3 py-1 rounded-full ${topic.color} inline-block mb-3`}>
                {topic.urdu}
              </span>
              <h2 className="font-bold text-brand-navy text-lg group-hover:text-brand-teal transition-colors">
                {topic.title}
              </h2>
              <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                {topic.desc}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-teal">
              <span>Explore category</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Articles */}
      {articles.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-brand-border">
          <h2 className="text-2xl font-bold text-brand-navy">Featured Family Health Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs hover:border-brand-teal/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-brand-pale-blue px-2.5 py-0.5 rounded-full mb-2 inline-block">
                    {art.subCategory || art.category}
                  </span>
                  <h3 className="font-bold text-brand-navy text-xl leading-snug hover:text-brand-teal transition-colors">
                    <Link href={`/family-health/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <p className="text-xs text-brand-muted mt-2 line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                  <span>{art.readTime} min read • Reviewed by {art.reviewerName}</span>
                  <Link href={`/family-health/${art.slug}`} className="font-semibold text-brand-teal hover:underline flex items-center gap-1">
                    <span>Read guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
