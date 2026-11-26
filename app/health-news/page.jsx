import React from "react";
import Link from "next/link";
import { Newspaper, Calendar, Clock, ChevronRight, ArrowRight, UserCheck } from "lucide-react";
import { FadeUpSection, StaggerSection, StaggerItem, HoverCard } from "@/components/ui/AnimationWrappers";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Public Health News & Clinical Bulletins | tandrust.pk",
  description: "Verified public health updates, seasonal outbreak surveillance, and clinical research news from Pakistan.",
};

export default async function HealthNewsPage() {
  const articles = await prisma.healthArticle.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Health News</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
          Public Health Surveillance
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Health News & Clinical Bulletins
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Stay informed with evidence-based public health announcements, disease surveillance reports, and preventive medicine bulletins across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((art) => (
          <article
            key={art.id}
            className="bg-white rounded-3xl border border-brand-border overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              {art.coverImage && (
                <div className="h-44 w-full bg-slate-100 overflow-hidden">
                  <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-mint px-2 py-0.5 rounded-full mb-2 inline-block">
                  {art.category}
                </span>
                <h2 className="font-bold text-brand-navy text-lg leading-snug hover:text-brand-teal transition-colors">
                  <Link href={`/health-news/${art.slug}`}>{art.title}</Link>
                </h2>
                <p className="text-xs text-brand-muted mt-2 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted mt-4">
              <span>{new Date(art.publishedAt).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" })}</span>
              <Link href={`/health-news/${art.slug}`} className="font-semibold text-brand-teal hover:underline flex items-center gap-1">
                <span>Read bulletin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
