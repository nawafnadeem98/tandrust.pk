import React from "react";
import Link from "next/link";
import {
  Building2,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  PhoneCall,
  MapPin,
  Sparkles,
  BookOpen,
  HeartPulse,
  Stethoscope,
} from "lucide-react";
import HeroSearch from "@/components/ui/HeroSearch";
import {
  AnimatedHeroLeft,
  AnimatedHeroCard,
  AnimatedBadge,
  AnimatedHeading,
  AnimatedPara,
  AnimatedPills,
  AnimatedCTAs,
  AnimatedTasksGrid,
  AnimatedConditionsGrid,
  AnimatedArticlesGrid,
  AnimatedMySehatPromo,
  AnimatedMentalHealthHub,
} from "@/components/homepage/AnimatedHomeSections";
import {
  FadeUpSection,
  StaggerSection,
  StaggerItem,
  HoverCard,
  PulseDot,
} from "@/components/ui/AnimationWrappers";
const { prisma } = require("@/lib/prisma");

export const revalidate = 60;

async function getHomepageData() {
  try {
    const [conditions, medicines, featuredArticles, providers, facilities] = await Promise.all([
      prisma.condition.findMany({ take: 6, orderBy: { name: "asc" } }),
      prisma.medicine.findMany({ take: 6, orderBy: { name: "asc" } }),
      prisma.healthArticle.findMany({ where: { status: "PUBLISHED" }, take: 3, orderBy: { publishedAt: "desc" } }),
      prisma.provider.findMany({ where: { isVerified: true }, take: 4, orderBy: { rating: "desc" } }),
      prisma.facility.findMany({ take: 3, orderBy: { name: "asc" } }),
    ]);
    return { conditions, medicines, featuredArticles, providers, facilities };
  } catch (error) {
    console.error("Error loading homepage data:", error);
    return { conditions: [], medicines: [], featuredArticles: [], providers: [], facilities: [] };
  }
}

export default async function HomePage() {
  const { conditions, medicines, featuredArticles, providers, facilities } = await getHomepageData();

  // Use emoji instead of icon components — avoids server→client function serialisation error
  const popularTasks = [
    { title: "Check Your Symptoms", desc: "Answer simple questions to get personalised health guidance", href: "/health/symptom-checker", emoji: "🩺", color: "bg-red-50 text-red-700 border-red-100" },
    { title: "Find a Doctor", desc: "Search PMC registered specialists in your city", href: "/services/doctors", emoji: "👨‍⚕️", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
    { title: "Find a Hospital", desc: "24/7 emergency rooms & tertiary care centers", href: "/services/hospitals", emoji: "🏥", color: "bg-blue-50 text-blue-700 border-blue-100" },
    { title: "Find a Laboratory", desc: "Diagnostic tests, pathology & home sampling", href: "/services/laboratories", emoji: "🔬", color: "bg-purple-50 text-purple-700 border-purple-100" },
    { title: "Understand Symptoms", desc: "Symptom guidance and when to seek urgent care", href: "/health/symptoms", emoji: "📋", color: "bg-amber-50 text-amber-800 border-amber-100" },
    { title: "Book a Consultation", desc: "Schedule in-person clinic visits or video consults", href: "/appointments", emoji: "📅", color: "bg-cyan-50 text-cyan-800 border-cyan-100" },
    { title: "Child Vaccinations", desc: "Official Pakistan National EPI schedule", href: "/family-health/vaccinations", emoji: "👶", color: "bg-rose-50 text-rose-700 border-rose-100" },
    { title: "Calculate Your BMI", desc: "South Asian healthy weight range & waist measurement", href: "/live-well/bmi-calculator", emoji: "⚖️", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
    { title: "Mental Health Support", desc: "Anxiety, depression, stress & wellbeing resources", href: "/live-well/mental-wellbeing", emoji: "🧠", color: "bg-violet-50 text-violet-700 border-violet-100" },
  ];

  return (
    <div className="space-y-16 pb-20">

      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-brand-mint/60 via-brand-bg to-brand-bg pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-brand-border/60 overflow-hidden">
        {/* Animated bg orbs via CSS animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-teal/8 blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
          <div className="absolute top-40 -left-16 w-72 h-72 rounded-full bg-brand-blue/6 blur-3xl animate-[pulse_10s_ease-in-out_infinite_2s]" />
          <div className="absolute bottom-0 right-1/3 w-56 h-56 rounded-full bg-brand-mint/40 blur-2xl animate-[pulse_6s_ease-in-out_infinite_1s]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <AnimatedHeroLeft>
              <AnimatedBadge className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 text-brand-teal text-xs font-semibold w-fit">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Health. Your Care. Your Pakistan.</span>
              </AnimatedBadge>

              <AnimatedHeading className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight leading-tight">
                Your health,{" "}
                <span className="text-brand-teal">all in one place.</span>
              </AnimatedHeading>

              <AnimatedPara className="text-base sm:text-lg text-brand-muted max-w-2xl leading-relaxed">
                Explore trusted health information, discover verified healthcare services, and make informed decisions about your wellbeing across Pakistan.
              </AnimatedPara>

              <HeroSearch />

              <AnimatedPills>
                <div className="flex flex-wrap items-center gap-2 text-xs text-brand-muted pt-1">
                  <span className="font-semibold text-brand-navy">Popular:</span>
                  {[
                    { label: "Dengue Fever", href: "/health/conditions/dengue-fever" },
                    { label: "Type 2 Diabetes", href: "/health/conditions/type-2-diabetes" },
                    { label: "Paracetamol", href: "/medicines/paracetamol" },
                    { label: "EPI Vaccines", href: "/family-health/vaccinations" },
                  ].map((pill) => (
                    <Link key={pill.label} href={pill.href}
                      className="px-2.5 py-1 bg-white hover:bg-brand-mint text-brand-navy rounded-lg border border-brand-border transition-all duration-150 hover:scale-105 active:scale-95">
                      {pill.label}
                    </Link>
                  ))}
                  <Link href="/emergency"
                    className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg border border-red-200 font-medium transition-colors">
                    Rescue 1122
                  </Link>
                </div>
              </AnimatedPills>

              <AnimatedCTAs>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link href="/services"
                    className="px-5 py-2.5 bg-brand-navy hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    <Building2 className="w-4 h-4 text-brand-mint" />
                    <span>Find Healthcare Services</span>
                  </Link>
                  <Link href="/health"
                    className="px-5 py-2.5 bg-white hover:bg-brand-mint/50 border border-brand-border text-brand-navy rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-2 shadow-2xs hover:-translate-y-0.5">
                    <BookOpen className="w-4 h-4 text-brand-teal" />
                    <span>Browse Health A–Z</span>
                  </Link>
                </div>
              </AnimatedCTAs>
            </AnimatedHeroLeft>

            {/* Right: Hero portal card */}
            <AnimatedHeroCard>
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-xl border border-brand-border/80 space-y-5">
                {/* Live badge */}
                <div className="absolute -top-3 -right-3 flex items-center gap-1.5 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg">
                  <PulseDot color="bg-white" size="w-1.5 h-1.5" />
                  Live
                </div>

                <div className="flex items-center justify-between border-b border-brand-border pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-mint text-brand-teal flex items-center justify-center font-bold">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-brand-navy text-sm">National Health Portal</h3>
                      <p className="text-xs text-brand-muted">Clinical Directory for Pakistan</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Live Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { label: "Verified Doctors", value: "PMDC / PMC", note: "Credentials Checked" },
                    { label: "Medicine Guides", value: "DRAP Aligned", note: "Safety & Dosages" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-3 bg-brand-bg rounded-xl border border-brand-border/60 hover:border-brand-teal/30 transition-colors">
                      <p className="text-brand-muted">{stat.label}</p>
                      <p className="text-lg font-bold text-brand-navy mt-0.5">{stat.value}</p>
                      <p className="text-[10px] text-brand-teal font-medium mt-1">{stat.note}</p>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-red-900">Life-Threatening Emergency?</p>
                      <p className="text-[11px] text-red-700">Dial 1122 immediately</p>
                    </div>
                  </div>
                  <a href="tel:1122"
                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors animate-pulse">
                    Call 1122
                  </a>
                </div>

                <div className="text-[11px] text-brand-muted flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-teal flex-shrink-0" />
                  <span>No commercial ads. Governed by evidence-informed editorial policies.</span>
                </div>
              </div>
            </AnimatedHeroCard>
          </div>
        </div>
      </section>

      {/* ── 2. Popular Tasks ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUpSection className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy tracking-tight">Popular healthcare tasks</h2>
          <p className="text-sm text-brand-muted mt-2">Quickly access trusted services and clinical guidance tailored for Pakistan</p>
        </FadeUpSection>
        <AnimatedTasksGrid tasks={popularTasks} />
      </section>

      {/* ── 3. Health A–Z ────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUpSection>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Clinical Reference</span>
                <h2 className="text-2xl font-bold text-brand-navy mt-1">Health A–Z Directory</h2>
                <p className="text-xs sm:text-sm text-brand-muted mt-1">Browse verified health conditions, symptoms, and medical procedures</p>
              </div>
              <Link href="/health"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-mint text-brand-teal-dark hover:bg-brand-teal hover:text-white rounded-xl text-xs font-semibold transition-colors">
                <span>View Full A–Z Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <AnimatedConditionsGrid conditions={conditions} />
          </div>
        </FadeUpSection>
      </section>

      {/* ── 4. Featured Articles ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUpSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Evidence-Informed</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mt-1">Featured Health Topics</h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-1">Articles and guidance clinically reviewed by certified Pakistani specialists</p>
          </div>
          <Link href="/live-well" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal hover:underline">
            <span>Explore all articles</span><ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </FadeUpSection>
        <AnimatedArticlesGrid articles={featuredArticles} />
      </section>

      {/* ── 5. Verified Providers ────────────────────────────────────────── */}
      <section className="bg-brand-mint/30 border-y border-brand-teal/20 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeUpSection className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Local Care Directory</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mt-1">Verified healthcare providers</h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-1">Find consultants, clinics, and tertiary teaching hospitals across Pakistani cities</p>
            </div>
            <Link href="/services/doctors"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-teal text-white hover:bg-brand-teal-dark rounded-xl text-xs font-semibold transition-colors shadow-sm">
              <span>View All Doctors &amp; Hospitals</span><ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </FadeUpSection>

          <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {providers.map((dr) => (
              <StaggerItem key={dr.id}>
                <HoverCard className="h-full">
                  <div className="bg-white rounded-2xl p-5 border border-brand-border h-full flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 mb-2">PMC Verified</span>
                      <h3 className="font-bold text-brand-navy text-sm">{dr.title} {dr.fullName}</h3>
                      <p className="text-xs text-brand-teal font-medium mt-0.5">{dr.specialty}</p>
                      <p className="text-xs text-slate-500 mt-2 font-mono">{dr.qualifications}</p>
                      <div className="mt-3 pt-3 border-t border-brand-border/60 text-xs text-brand-muted space-y-1">
                        <p className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-teal flex-shrink-0" />
                          <span className="truncate">{dr.city}, {dr.province}</span>
                        </p>
                        <p className="font-semibold text-brand-navy pt-1">
                          Fee: PKR {dr.consultationFee?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-brand-border">
                      <Link href={`/services/${dr.slug}`}
                        className="block text-center py-2 bg-brand-mint text-brand-teal-dark hover:bg-brand-teal hover:text-white rounded-xl text-xs font-semibold transition-colors">
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerSection>
        </div>
      </section>

      {/* ── 6. Live Well & Family Health ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerSection className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StaggerItem>
            <HoverCard>
              <div className="bg-gradient-to-br from-white to-brand-mint/40 p-6 sm:p-8 rounded-3xl border border-brand-border shadow-xs space-y-4 h-full">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-teal">Lifestyle & Prevention</span>
                <h3 className="text-2xl font-bold text-brand-navy">Live Well</h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Practical guidance tailored for life in Pakistan: healthy eating with traditional desi foods, smog protection, physical activity, sleep, and mental wellbeing.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold text-brand-navy">
                  {[
                    { label: "🥗 Healthy Desi Diet", href: "/live-well/eat-well" },
                    { label: "🏃 Physical Activity", href: "/live-well/physical-activity" },
                    { label: "😴 Sleep Hygiene", href: "/live-well/sleep" },
                    { label: "🧠 Mental Wellbeing", href: "/live-well/mental-wellbeing" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}
                      className="p-2.5 bg-white rounded-xl border border-brand-border hover:bg-brand-mint hover:border-brand-teal/40 transition-all hover:-translate-y-0.5 duration-150">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </HoverCard>
          </StaggerItem>

          <StaggerItem>
            <HoverCard>
              <div className="bg-gradient-to-br from-white to-brand-pale-blue/50 p-6 sm:p-8 rounded-3xl border border-brand-border shadow-xs space-y-4 h-full">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Maternal & Pediatric Care</span>
                <h3 className="text-2xl font-bold text-brand-navy">Family Health</h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  Evidence-based antenatal milestones, newborn care in the first 40 days, childhood development, EPI immunization schedules, women's health, and healthy ageing.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-semibold text-brand-navy">
                  {[
                    { label: "🤰 Safe Pregnancy Care", href: "/family-health/pregnancy" },
                    { label: "👶 Newborn First 40 Days", href: "/family-health/baby" },
                    { label: "💉 National EPI Schedule", href: "/family-health/vaccinations" },
                    { label: "👵 Senior Joint Health", href: "/family-health/healthy-ageing" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}
                      className="p-2.5 bg-white rounded-xl border border-brand-border hover:bg-brand-pale-blue hover:border-brand-blue/30 transition-all hover:-translate-y-0.5 duration-150">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </HoverCard>
          </StaggerItem>
        </StaggerSection>
      </section>

      {/* ── 7. Mental Health Hub ─────────────────────────────────────────── */}
      <AnimatedMentalHealthHub />

      {/* ── 8. My Sehat Account Promo ────────────────────────────────────── */}
      <AnimatedMySehatPromo />

      {/* ── 9. Trust & Transparency ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUpSection>
          <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-brand-teal/10 blur-3xl pointer-events-none" />
            <div className="max-w-3xl mb-8 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mint">Safety & Accountability</span>
              <h2 className="text-2xl sm:text-3xl font-bold mt-1">Trust, transparency &amp; clinical review</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                tandrust.pk is designed as an authoritative digital health source. Here is how we safeguard medical accuracy and patient privacy.
              </p>
            </div>

            <StaggerSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { icon: "🩺", title: "Clinically Reviewed", desc: "Every health article is reviewed by qualified Pakistani clinicians holding PMDC/PMC certifications." },
                { icon: "🛡️", title: "DRAP & NIH Standards", desc: "Medicines, adverse reactions, and dosages align with the Drug Regulatory Authority of Pakistan." },
                { icon: "✅", title: "Verified Providers", desc: "Doctor listings undergo credentials check. Demonstration records are explicitly marked." },
                { icon: "🔒", title: "Zero Data Selling", desc: "Your medical files and searches are never sold or shared with commercial advertising brokers." },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <HoverCard>
                    <div className="p-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-colors h-full">
                      <div className="text-2xl mb-3">{item.icon}</div>
                      <h3 className="font-bold text-white text-sm mb-1.5">{item.title}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                    </div>
                  </HoverCard>
                </StaggerItem>
              ))}
            </StaggerSection>
          </div>
        </FadeUpSection>
      </section>
    </div>
  );
}
