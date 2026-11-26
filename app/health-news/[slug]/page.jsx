import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, UserCheck, ShieldCheck, ChevronRight } from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const article = await prisma.healthArticle.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return { title: "News Not Found — tandrust.pk" };

  return {
    title: `${article.title} | Health News tandrust.pk`,
    description: article.summary.slice(0, 160),
  };
}

export default async function HealthNewsDetailPage({ params }) {
  const article = await prisma.healthArticle.findUnique({
    where: { slug: params.slug },
  });

  if (!article) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health-news" className="hover:text-brand-teal transition-colors">Health News</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold truncate">{article.title}</span>
      </nav>

      <header className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-pale-blue text-brand-blue inline-block">
          Public Health Bulletin
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
          {article.title}
        </h1>

        <p className="text-base text-brand-muted leading-relaxed font-medium">
          {article.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-brand-border text-xs text-brand-muted">
          <div className="flex items-center gap-1.5 text-brand-navy font-semibold">
            <UserCheck className="w-4 h-4 text-brand-teal" />
            <span>Reviewed by {article.reviewerName}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{new Date(article.publishedAt).toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" })}</span>
          </div>
        </div>
      </header>

      {article.coverImage && (
        <div className="rounded-3xl overflow-hidden border border-brand-border shadow-sm max-h-[400px]">
          <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-6">
        <div className="prose prose-slate max-w-none text-brand-text leading-relaxed whitespace-pre-line text-sm sm:text-base">
          {article.content}
        </div>

        {article.references && (
          <div className="mt-8 pt-6 border-t border-brand-border text-xs text-brand-muted space-y-1">
            <p className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
              Sources & Institutional References:
            </p>
            <p>{article.references}</p>
          </div>
        )}
      </div>
    </article>
  );
}
