"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight, CheckCircle, Brain,
} from "lucide-react";
import {
  FadeUpSection,
  StaggerSection,
  StaggerItem,
  HoverCard,
  PulseDot,
} from "@/components/ui/AnimationWrappers";

// ── Animated hero left column ─────────────────────────────────────────────────
export function AnimatedHeroLeft({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-7 space-y-6"
    >
      {children}
    </motion.div>
  );
}

// ── Animated hero right column ────────────────────────────────────────────────
export function AnimatedHeroCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="lg:col-span-5 relative"
    >
      <motion.div
        className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-brand-teal/10 blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-brand-blue/10 blur-2xl pointer-events-none"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {children}
    </motion.div>
  );
}

export function AnimatedBadge({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeading({ children, className = "" }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}

export function AnimatedPara({ children, className = "" }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

export function AnimatedPills({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCTAs({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ── Task grid — receives plain serialisable task data only (no icon components)
export function AnimatedTasksGrid({ tasks }) {
  return (
    <StaggerSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {tasks.map((task) => (
        <StaggerItem key={task.title}>
          <HoverCard>
            <Link
              href={task.href}
              className={`group p-5 bg-white rounded-2xl border border-brand-border hover:border-brand-teal/40 hover:shadow-md transition-colors duration-200 flex flex-col justify-between h-full`}
            >
              <div>
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border text-2xl ${task.color}`}
                  whileHover={{ scale: 1.12, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  {task.emoji}
                </motion.div>
                <h3 className="font-bold text-brand-navy group-hover:text-brand-teal transition-colors text-base mb-1">
                  {task.title}
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">{task.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center text-xs font-semibold text-brand-teal">
                <span>Open task</span>
                <motion.span
                  className="ml-1 inline-flex"
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.span>
              </div>
            </Link>
          </HoverCard>
        </StaggerItem>
      ))}
    </StaggerSection>
  );
}

// ── Conditions grid ───────────────────────────────────────────────────────────
export function AnimatedConditionsGrid({ conditions }) {
  return (
    <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {conditions.map((item) => (
        <StaggerItem key={item.id}>
          <HoverCard>
            <Link
              href={`/health/conditions/${item.slug}`}
              className="block p-4 rounded-2xl bg-brand-bg/60 hover:bg-brand-mint/40 border border-brand-border/60 hover:border-brand-teal/30 transition-colors group h-full"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-brand-navy group-hover:text-brand-teal transition-colors text-sm">
                  {item.name}
                </h3>
                {item.urduName && (
                  <span className="text-xs text-brand-muted font-urdu">{item.urduName}</span>
                )}
              </div>
              <p className="text-xs text-brand-muted line-clamp-2 mt-2 leading-relaxed">
                {item.overview}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-brand-teal font-medium">
                <span>{item.category}</span>
                <span className="flex items-center gap-0.5">
                  Read guide <ArrowRight className="w-3 h-3 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </HoverCard>
        </StaggerItem>
      ))}
    </StaggerSection>
  );
}

// ── Articles grid ─────────────────────────────────────────────────────────────
export function AnimatedArticlesGrid({ articles }) {
  return (
    <StaggerSection className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <StaggerItem key={article.id}>
          <HoverCard className="h-full">
            <article className="bg-white rounded-2xl border border-brand-border overflow-hidden flex flex-col justify-between h-full">
              <div>
                {article.coverImage && (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <motion.img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                    />
                    <div className="absolute top-3 left-3 bg-brand-navy/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {article.category}
                    </div>
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[11px] text-brand-muted mb-2">
                    <span>{article.readTime} min read</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-medium">Reviewed by {article.reviewerName}</span>
                  </div>
                  <h3 className="font-bold text-brand-navy text-base leading-snug hover:text-brand-teal transition-colors">
                    <Link href={`/live-well/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-xs text-brand-muted mt-2 line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-0">
                <Link href={`/live-well/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-teal hover:text-brand-teal-dark">
                  <span>Read full guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          </HoverCard>
        </StaggerItem>
      ))}
    </StaggerSection>
  );
}

// ── My tandrust.pk Account promo ─────────────────────────────────────────────────────
export function AnimatedMySehatPromo() {
  const stats = [
    { label: "Appointments Booked", value: "2.4M+", icon: "📅" },
    { label: "Verified Providers", value: "18,500+", icon: "🏥" },
    { label: "Health Articles", value: "3,200+", icon: "📖" },
    { label: "Active Patients", value: "890K+", icon: "👥" },
  ];
  const features = [
    "Book and manage appointments online",
    "View your prescriptions and lab results",
    "Track family vaccinations and milestones",
    "Get personalised health reminders",
    "Securely share records with your doctor",
    "Access telehealth video consultations",
  ];

  return (
    <section className="py-14 bg-gradient-to-br from-brand-navy to-brand-teal-dark text-white relative overflow-hidden">
      <motion.div
        className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-teal/20 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], y: [0, -8, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <FadeUpSection>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white mb-4">
              My tandrust.pk
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Your personal health account — all in one place
            </h2>
            <p className="text-white/80 text-base mb-6 leading-relaxed">
              Create your free tandrust.pk account to book appointments, access your medical history, manage family health records, and get personalised health reminders.
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((item, i) => (
                <motion.li key={item}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-2 text-white/90 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link href="/register"
                className="px-6 py-3 bg-white text-brand-teal-dark font-bold rounded-xl hover:bg-brand-mint transition-colors shadow-lg">
                Create Free Account
              </Link>
              <Link href="/login"
                className="px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                Sign In
              </Link>
            </div>
          </FadeUpSection>
          <StaggerSection className="hidden md:flex flex-col gap-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <HoverCard>
                  <div className="bg-white/10 rounded-2xl p-5 flex items-center gap-4 backdrop-blur-sm border border-white/20">
                    <motion.span className="text-3xl"
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 2 }}>
                      {stat.icon}
                    </motion.span>
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-white/70 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </div>
    </section>
  );
}

// ── Mental Health Hub ──────────────────────────────────────────────────────────
export function AnimatedMentalHealthHub() {
  const cards = [
    { title: "Understanding Anxiety", desc: "Recognise signs and learn coping techniques", href: "/live-well/mental-wellbeing", emoji: "😰" },
    { title: "Depression & Mood", desc: "Pakistan-specific support and treatment pathways", href: "/live-well/mental-wellbeing", emoji: "💙" },
    { title: "Stress Management", desc: "Practical tools for everyday stress relief", href: "/live-well/mental-wellbeing", emoji: "🧘" },
    { title: "Crisis Support", desc: "Immediate help and helpline numbers", href: "/emergency", emoji: "🆘" },
  ];
  return (
    <FadeUpSection className="py-14 bg-violet-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-700 mb-2">Mental Health</span>
            <h2 className="text-2xl font-bold text-brand-navy">Your mental health matters</h2>
            <p className="text-brand-muted text-sm mt-1">Free, evidence-based resources for anxiety, depression, stress, and emotional wellbeing — tailored for Pakistan.</p>
          </div>
          <Link href="/live-well/mental-wellbeing"
            className="shrink-0 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors text-sm">
            Explore Mental Health →
          </Link>
        </div>
        <StaggerSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <HoverCard>
                <Link href={card.href}
                  className="block bg-white rounded-2xl p-5 border border-violet-100 hover:border-violet-300 transition-colors group h-full">
                  <motion.span className="text-3xl mb-3 block"
                    animate={{ rotate: [0, 4, -4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                    {card.emoji}
                  </motion.span>
                  <h3 className="font-semibold text-brand-navy text-sm mb-1 group-hover:text-violet-700 transition-colors">{card.title}</h3>
                  <p className="text-brand-muted text-xs">{card.desc}</p>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerSection>
      </div>
    </FadeUpSection>
  );
}

export function AnimatedSection({ children, className = "" }) {
  return <FadeUpSection className={className}>{children}</FadeUpSection>;
}
