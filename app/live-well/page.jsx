import React from "react";
import Link from "next/link";
import { Sparkles, Utensils, Flame, Moon, Brain, Shield, HeartPulse, ChevronRight, ArrowRight } from "lucide-react";
import { FadeUpSection, StaggerSection, StaggerItem, HoverCard } from "@/components/ui/AnimationWrappers";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

export const metadata = {
  title: "Live Well — Evidence-Informed Healthy Living in Pakistan | tandrust.pk",
  description:
    "Practical guides on healthy eating, smog safety, sleep hygiene, physical exercise, and preventive health tailored for Pakistani lifestyles.",
};

export default async function LiveWellPage() {
  const articles = await prisma.healthArticle.findMany({
    where: { category: "LIVE_WELL", status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  const topics = [
    {
      title: "Eat Well (غذائیت اور خوراک)",
      slug: "eat-well",
      desc: "Balancing desi meals, whole grains, reducing cooking ghee, and dietary fiber.",
      icon: Utensils,
      color: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Physical Activity (ورزش اور چہل قدمی)",
      slug: "physical-activity",
      desc: "Aerobic fitness, daily brisk walking, and South Asian metabolic risk reduction.",
      icon: Flame,
      color: "bg-amber-50 text-amber-700",
    },
    {
      title: "Sleep Hygiene (پرسکون نیند)",
      slug: "sleep",
      desc: "Optimizing sleep cycles, reducing screen exposure, and managing insomnia.",
      icon: Moon,
      color: "bg-indigo-50 text-indigo-700",
    },
    {
      title: "Mental Wellbeing (ذہنی سکون)",
      slug: "mental-wellbeing",
      desc: "Evidence-based stress reduction, anxiety management, and counseling resources.",
      icon: Brain,
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Preventive Healthcare (حفاظتی تدابیر)",
      slug: "prevention",
      desc: "Smog and AQI precautions, seasonal dengue avoidance, and routine health screenings.",
      icon: Shield,
      color: "bg-teal-50 text-teal-700",
    },
    {
      title: "Healthy Habits (صحت مند عادات)",
      slug: "healthy-habits",
      desc: "Hydration during heatwaves, smoking cessation, and oral health habits.",
      icon: HeartPulse,
      color: "bg-rose-50 text-rose-700",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Live Well</span>
      </nav>

      <div className="bg-gradient-to-r from-brand-mint via-brand-bg to-brand-pale-blue rounded-3xl p-6 sm:p-10 border border-brand-teal/20 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">
          Lifestyle & Longevity
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Live Well: Healthy Living in Pakistan
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          Evidence-informed guides tailored for daily life in Pakistan. Learn how to reform traditional diets, protect your lungs during winter smog, and prioritize mental health.
        </p>
      </div>

      {/* 6 Category Tiles */}
      <StaggerSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t) => {
          const Icon = t.icon;
          return (
            <StaggerItem key={t.slug}>
              <HoverCard>
                <Link
                  href={`/live-well/${t.slug}`}
                  className="bg-white rounded-3xl p-6 border border-brand-border hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${t.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="font-bold text-brand-navy text-lg group-hover:text-brand-teal transition-colors">
                      {t.title}
                    </h2>
                    <p className="text-xs text-brand-muted mt-2 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs font-semibold text-brand-teal">
                    <span>Browse guides</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          );
        })}
      </StaggerSection>

      {/* Published Editorial Articles */}
      {articles.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-brand-border">
          <FadeUpSection>
            <h2 className="text-2xl font-bold text-brand-navy">Featured Articles & Practical Guides</h2>
          </FadeUpSection>
          <StaggerSection className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <StaggerItem key={art.id}>
                <article
                  className="bg-white rounded-3xl p-6 border border-brand-border shadow-xs hover:border-brand-teal/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal bg-brand-mint px-2.5 py-0.5 rounded-full mb-2 inline-block">
                      {art.subCategory || art.category}
                    </span>
                    <h3 className="font-bold text-brand-navy text-xl leading-snug hover:text-brand-teal transition-colors">
                      <Link href={`/live-well/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-xs text-brand-muted mt-2 line-clamp-3 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                    <span>{art.readTime} min read • Reviewed by {art.reviewerName}</span>
                    <Link href={`/live-well/${art.slug}`} className="font-semibold text-brand-teal hover:underline flex items-center gap-1">
                      <span>Read guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      )}
    </div>
  );
}
