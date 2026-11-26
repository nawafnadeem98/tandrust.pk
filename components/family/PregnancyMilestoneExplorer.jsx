"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Baby,
  Calendar,
  Sparkles,
  Heart,
  AlertOctagon,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import ClinicalCallout from "@/components/ui/ClinicalCallout";

export default function PregnancyMilestoneExplorer() {
  const [selectedWeek, setSelectedWeek] = useState(12);

  const pregnancyMilestones = {
    8: {
      trimester: "First Trimester (Weeks 1–12)",
      size: "Kidney Bean (1.6 cm)",
      development: "Baby's heart is beating around 150-160 times per minute. Neural tube has closed. Tiny fingers and toes are starting to web out.",
      motherChanges: "Morning sickness, fatigue, heightened sense of smell, breast tenderness, and frequent urination.",
      pakistanTests: "Initial antenatal booking visit with obstetrician / LHV: Blood group & Rh factor, complete blood count (CBC), Hepatitis B/C screening, and Folic Acid (400 mcg daily).",
    },
    12: {
      trimester: "First Trimester (Weeks 1–12)",
      size: "Plum / Aloo Bukhara (5.4 cm)",
      development: "All vital organs, bones, and muscles are formed. Baby begins practicing breathing and sucking reflexes. Vocal cords are developing.",
      motherChanges: "Nausea may begin to subside as the placenta takes over hormone production. Energy levels gradually return.",
      pakistanTests: "Nuchal translucency dating ultrasound scan. Routine blood pressure check to establish baseline.",
    },
    16: {
      trimester: "Second Trimester (Weeks 13–27)",
      size: "Avocado (11.6 cm)",
      development: "Baby can make facial expressions and hear muffled sounds from outside the womb, like mother's voice and heartbeat.",
      motherChanges: "Baby bump becomes visible. 'Pregnancy glow' from increased blood circulation. Nasal congestion or mild leg cramps may occur.",
      pakistanTests: "First Tetanus Toxoid (TT-1) vaccination dose as recommended by Pakistan National Immunization protocol.",
    },
    20: {
      trimester: "Second Trimester (Weeks 13–27) — Halfway Point",
      size: "Banana (25.6 cm)",
      development: "Baby can swallow amniotic fluid and produces meconium. You may feel gentle flutters ('quickening') as baby kicks and somersaults.",
      motherChanges: "Weight gain accelerates. Mild lower backache and Braxton Hicks warm-up contractions may begin.",
      pakistanTests: "Detailed Anomaly Ultrasound Scan (20-week scan) performed by a qualified radiologist to examine baby's brain, heart chambers, kidneys, and spine.",
    },
    28: {
      trimester: "Third Trimester (Weeks 28–40)",
      size: "Eggplant / Baingan (37.6 cm)",
      development: "Baby opens eyes and can sense light and dark. Brain tissues are rapidly folding. Baby regularly hiccups and kicks rhythmically.",
      motherChanges: "Shortness of breath as growing uterus presses against diaphragm. Swelling in feet and ankles after prolonged standing.",
      pakistanTests: "Oral Glucose Tolerance Test (OGTT) for Gestational Diabetes screening (highly prevalent in Pakistani mothers) + Repeat hemoglobin check for anemia.",
    },
    34: {
      trimester: "Third Trimester (Weeks 28–40)",
      size: "Cantaloupe / Kharbooza (45 cm)",
      development: "Lungs are producing surfactant. Baby's immune system receives protective maternal antibodies to fight infections after birth.",
      motherChanges: "Frequent pelvic pressure. Increased fatigue. Colostrum (pre-milk) may leak from breasts.",
      pakistanTests: "Fortnightly antenatal visits with gynecologist. Checking fetal presentation (head down / cephalic).",
    },
    40: {
      trimester: "Third Trimester — Full Term",
      size: "Small Watermelon / Tarbooz (51 cm)",
      development: "Baby is fully mature, weighing approximately 2.8 to 3.5 kg. Skull bones remain soft to pass safely through birth canal.",
      motherChanges: "Cervical effacement and dilation. Mucus plug may discharge ('the show'). Regular contractions beginning.",
      pakistanTests: "Birth preparedness: Selecting a 24/7 hospital with neonatal intensive care (NICU) capabilities. Hospital bag packed.",
    },
  };

  const current = pregnancyMilestones[selectedWeek] || pregnancyMilestones[12];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700">
            <Baby className="w-4 h-4" />
            <span>Week-by-Week Antenatal Timeline</span>
          </div>
          <h2 className="text-xl font-bold text-brand-navy mt-1">
            Pregnancy & Fetal Development Explorer
          </h2>
          <p className="text-xs text-brand-muted">
            Select your gestational week to explore your baby&apos;s growth and Pakistani clinical checkup schedules.
          </p>
        </div>
      </div>

      {/* Week Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {[8, 12, 16, 20, 28, 34, 40].map((wk) => (
          <button
            key={wk}
            onClick={() => setSelectedWeek(wk)}
            className={`px-4 py-2 rounded-2xl font-bold whitespace-nowrap transition-all ${
              selectedWeek === wk
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-brand-bg text-brand-navy hover:bg-slate-200"
            }`}
          >
            Week {wk}
          </button>
        ))}
      </div>

      {/* Milestone Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-2">
        {/* Left: Size & Stage */}
        <div className="md:col-span-4 bg-gradient-to-br from-rose-50 to-rose-100/60 p-6 rounded-3xl border border-rose-200 space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-white/80 px-2.5 py-0.5 rounded-full inline-block">
            {current.trimester}
          </span>
          <div>
            <span className="text-3xl font-black text-rose-950 font-mono">Week {selectedWeek}</span>
            <p className="text-xs font-bold text-rose-800 mt-1">
              Baby size: <strong>{current.size}</strong>
            </p>
          </div>
          <div className="p-3 bg-white/90 rounded-2xl text-xs text-rose-950 space-y-1 shadow-2xs">
            <p className="font-bold flex items-center gap-1 text-rose-900">
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Mother&apos;s Body</span>
            </p>
            <p className="leading-relaxed opacity-90">{current.motherChanges}</p>
          </div>
        </div>

        {/* Right: Development & Tests */}
        <div className="md:col-span-8 space-y-4 text-xs">
          <div className="p-5 bg-brand-bg rounded-2xl border border-brand-border space-y-2">
            <h3 className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Fetal Development Milestones</span>
            </h3>
            <p className="text-brand-text leading-relaxed">{current.development}</p>
          </div>

          <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-emerald-950">
            <h3 className="font-bold text-sm text-emerald-900 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-emerald-700" />
              <span>Pakistan Antenatal Checkups & Clinical Tests</span>
            </h3>
            <p className="leading-relaxed">{current.pakistanTests}</p>
          </div>
        </div>
      </div>

      {/* Pregnancy Emergency Red Flags Callout */}
      <ClinicalCallout
        type="emergency"
        title="Immediate Emergency Warning Signs During Pregnancy"
        actionText="Call Rescue 1122 or Go to Labor Room"
        actionHref="tel:1122"
      >
        <p>
          Contact your maternity hospital or dial 1122 immediately if you experience any of the following:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Any vaginal bleeding or fluid leakage before labor</li>
          <li>Severe headache, blurred vision, or sudden facial swelling (signs of pre-eclampsia / high BP)</li>
          <li>Noticeable reduction or sudden stoppage in baby&apos;s usual kicking movements</li>
          <li>Severe abdominal pain or high continuous fever with chills</li>
        </ul>
      </ClinicalCallout>
    </div>
  );
}
