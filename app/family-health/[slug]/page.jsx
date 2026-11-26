import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  UserCheck,
  ShieldCheck,
  ChevronRight,
  BookOpen,
} from "lucide-react";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const article = await prisma.healthArticle.findUnique({
    where: { slug: params.slug },
  });

  if (!article) return { title: "Article Not Found — tandrust.pk" };

  return {
    title: `${article.title} | tandrust.pk`,
    description: article.summary.slice(0, 160),
  };
}

export default async function FamilyHealthArticlePage({ params }) {
  const article = await prisma.healthArticle.findUnique({
    where: { slug: params.slug },
  });

  if (!article) notFound();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/family-health" className="hover:text-brand-teal transition-colors">Family Health</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold truncate">{article.title}</span>
      </nav>

      <header className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-pale-blue text-brand-blue inline-block">
          {article.subCategory || article.category}
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
          {article.title}
        </h1>

        {article.urduTitle && (
          <p className="text-xl font-bold font-urdu text-brand-teal">
            {article.urduTitle}
          </p>
        )}

        <p className="text-base text-brand-muted leading-relaxed font-medium">
          {article.summary}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-brand-border text-xs text-brand-muted">
          <div className="flex items-center gap-1.5 text-brand-navy font-semibold">
            <UserCheck className="w-4 h-4 text-brand-teal" />
            <span>Reviewed by {article.reviewerName}</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-brand-muted" />
            <span>{article.readTime} min read</span>
          </div>
          <span className="hidden sm:inline text-slate-300">•</span>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-brand-muted" />
            <span>{new Date(article.publishedAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </header>

      {article.coverImage && (
        <div className="rounded-3xl overflow-hidden border border-brand-border shadow-sm max-h-[420px]">
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
              Clinical Sources & References:
            </p>
            <p>{article.references}</p>
          </div>
        )}
      </div>
    </article>
  );
}
