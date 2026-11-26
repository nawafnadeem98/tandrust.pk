"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertOctagon,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  ChevronRight,
  RotateCcw,
  ShieldCheck,
  Stethoscope,
  Building2,
  ArrowRight,
  Info,
} from "lucide-react";
import ClinicalCallout from "@/components/ui/ClinicalCallout";
import { useLanguage } from "@/context/LanguageContext";
import { getSymptoms, ageGroupFromAge } from "@/lib/symptomData";

export default function SymptomCheckerPage() {
  const { isUrdu } = useLanguage();
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState({
    ageGroup: "adult", // "child" (0-12) | "teen" (13-17) | "adult" (18-59) | "senior" (60+)
    age: "",
    gender: "male",
    symptomCategory: "",
    hasRedFlags: false,
    hasUrgentSigns: false,
  });

  const baseSymptoms = [
    {
      id: "chest_pain",
      label: "Chest Pain / Heart Symptoms",
      urdu: "سینے میں درد یا دباؤ",
      desc: "Pressure, tightness, crushing sensation, or pain spreading to arm or jaw.",
      redFlagQuestion: "Is the chest pain crushing, accompanied by sweating, shortness of breath, or spreading to the left arm/jaw?",
      urgentQuestion: "Did the chest pain start with physical exertion and improve with rest, or is your resting heart rate over 120 bpm?",
    },
    {
      id: "dengue_fever",
      label: "High Fever & Suspected Dengue / Malaria",
      urdu: "تیز بخار اور ڈینگی کی علامات",
      desc: "Temperature > 101°F, severe headache, retro-orbital eye pain, bone pain ('breakbone fever').",
      redFlagQuestion: "Are there red spots on skin, bleeding from gums/nose, persistent vomiting, or severe abdominal pain?",
      urgentQuestion: "Has the high fever persisted for more than 48 hours without breaking with Paracetamol?",
    },
    {
      id: "breathing_difficulty",
      label: "Shortness of Breath / Wheezing",
      urdu: "سانس لینے میں شدید دشواری",
      desc: "Struggling to breathe, noisy wheezing, inability to speak full sentences.",
      redFlagQuestion: "Are the lips or fingertips turning blue, or is the patient gasping and unable to speak 2 consecutive words?",
      urgentQuestion: "Is the shortness of breath worsening when lying flat or accompanied by swollen ankles?",
    },
    {
      id: "stroke_neuro",
      label: "Sudden Weakness / Stroke (FAST)",
      urdu: "اچانک کمزوری، فالج یا بولنے میں دشواری",
      desc: "Facial droop, arm weakness, slurred speech, sudden loss of vision.",
      redFlagQuestion: "Did face droop on one side, can they not raise both arms equally, or is speech slurred (FAST signs)?",
      urgentQuestion: "Is there sudden numbness on one side of the body without loss of consciousness?",
    },
    {
      id: "abdominal_pain",
      label: "Severe Abdominal Pain / Vomiting",
      urdu: "پیٹ میں شدید درد یا الٹیاں",
      desc: "Sharp localized pain, rigid abdomen, vomiting blood or coffee-ground material.",
      redFlagQuestion: "Is the abdomen rigid and hard like a board, or is the patient vomiting blood / passing black stools?",
      urgentQuestion: "Is the pain located in the lower right abdomen and worsening with touch (suspected appendicitis)?",
    },
    {
      id: "pediatric_fever",
      label: "Child / Infant High Fever",
      urdu: "بچے یا شیر خوار کو تیز بخار",
      desc: "Infant under 3 months with fever, refusal to feed, lethargy, sunken fontanelle.",
      redFlagQuestion: "Is the infant under 3 months old with temp > 100.4°F, or having seizures / unresponsive?",
      urgentQuestion: "Is the child producing no tears, having dry diapers for > 8 hours (dehydration)?",
    },
  ];
  const symptomOptions = getSymptoms(patientData, baseSymptoms);

  const selectedSymptom = symptomOptions.find((s) => s.id === patientData.symptomCategory);

  const resetChecker = () => {
    setStep(1);
    setPatientData({
      ageGroup: "adult",
      gender: "male",
      symptomCategory: "",
      hasRedFlags: false,
      hasUrgentSigns: false,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/health" className="hover:text-brand-teal transition-colors">Health A–Z</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">Online Symptom Checker</span>
      </nav>

      {/* Main Intro Banner */}
      <header className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-teal flex items-center gap-1.5">
            <Activity className="w-4 h-4" />
            <span>Digital Clinical Care Navigator</span>
          </span>
          <span className="text-xs font-mono text-brand-muted">
            Step {step} of 4
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          tandrust.pk Symptom Checker
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Answer a few clinical questions to determine whether you need emergency rescue dispatch, an urgent clinic visit, or safe home self-care.
        </p>

        {/* Immediate disclaimer banner */}
        <div className="p-3 bg-red-50 rounded-2xl border border-red-200 text-xs text-red-950 flex items-center justify-between gap-4">
          <span>If someone is unconscious, bleeding uncontrollably, or choking:</span>
          <a
            href="tel:1122"
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl whitespace-nowrap shadow-xs"
          >
            Dial 1122 Immediately
          </a>
        </div>
      </header>

      {/* STEP 1: PATIENT PROFILE */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Step 1: Who is this assessment for?</h2>
            <p className="text-xs text-brand-muted">Age and biological sex influence medical risk triage.</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label htmlFor="sc-age" className="font-semibold text-brand-navy block mb-2">Age in years (optional, selects the group automatically)</label>
              <input id="sc-age" type="number" min="0" max="120" inputMode="numeric" value={patientData.age}
                onChange={(e) => { const g = ageGroupFromAge(e.target.value); setPatientData({ ...patientData, age: e.target.value, ageGroup: g || patientData.ageGroup }); }}
                className="w-40 mb-3 rounded-xl border border-brand-border px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-teal" />
              <label className="font-semibold text-brand-navy block mb-2">Age group</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "child", label: "Children", sub: "0–12 years" },
                  { id: "teen", label: "Teenagers", sub: "13–17 years" },
                  { id: "adult", label: "Adults", sub: "18–59 years" },
                  { id: "senior", label: "Seniors / Elderly", sub: "60+ years" },
                ].map((age) => (
                  <button
                    key={age.id}
                    type="button"
                    onClick={() => setPatientData({ ...patientData, ageGroup: age.id })}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      patientData.ageGroup === age.id
                        ? "bg-brand-mint/60 border-brand-teal text-brand-teal-dark font-bold ring-2 ring-brand-teal/20"
                        : "bg-brand-bg border-brand-border text-brand-navy hover:bg-slate-100"
                    }`}
                  >
                    <p className="font-bold text-sm">{age.label}</p>
                    <p className="text-[11px] text-brand-muted mt-0.5">{age.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold text-brand-navy block mb-2">Biological Sex</label>
              <div className="flex gap-3">
                {["Male", "Female"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setPatientData({ ...patientData, gender: s.toLowerCase() })}
                    className={`px-5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      patientData.gender === s.toLowerCase()
                        ? "bg-brand-teal text-white border-brand-teal"
                        : "bg-brand-bg border-brand-border text-brand-navy hover:bg-slate-100"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-border flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Continue to Symptoms</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT PRIMARY SYMPTOM */}
      {step === 2 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Step 2: What is the main symptom?</h2>
            <p className="text-xs text-brand-muted">Select the symptom causing the greatest concern today.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {symptomOptions.map((sym) => (
              <button
                key={sym.id}
                type="button"
                onClick={() => {
                  setPatientData({ ...patientData, symptomCategory: sym.id });
                  setStep(3);
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between hover:border-brand-teal/50 hover:shadow-xs ${
                  patientData.symptomCategory === sym.id
                    ? "bg-brand-mint/60 border-brand-teal ring-2 ring-brand-teal/20"
                    : "bg-brand-bg border-brand-border"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-brand-navy">{sym.label}</h3>
                    {sym.urdu && <span className="text-xs font-urdu text-brand-teal font-medium">{sym.urdu}</span>}
                  </div>
                  <p className="text-xs text-brand-muted mt-1 leading-relaxed">{sym.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-brand-border/40 flex items-center justify-end text-brand-teal font-semibold">
                  <span className="text-[11px]">Select</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-brand-border flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 font-semibold text-brand-muted text-xs hover:text-brand-navy"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: RED-FLAG ASSESSMENT */}
      {step === 3 && selectedSymptom && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Safety Triage Assessment
            </span>
            <h2 className="text-xl font-bold text-brand-navy">
              Step 3: Checking for critical red-flag signs
            </h2>
            <p className="text-xs text-brand-muted">
              Assessing severity for: <strong>{selectedSymptom.label}</strong>
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Red flag question */}
            <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 space-y-3">
              <div className="flex items-start gap-2.5 text-red-950 font-bold text-sm">
                <AlertOctagon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{selectedSymptom.redFlagQuestion}</span>
              </div>
              <div className="flex gap-3 pl-7">
                <button
                  type="button"
                  onClick={() => {
                    setPatientData({ ...patientData, hasRedFlags: true });
                    setStep(4);
                  }}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-xs"
                >
                  Yes, this is happening
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPatientData({ ...patientData, hasRedFlags: false });
                  }}
                  className="px-5 py-2 bg-white border border-red-200 hover:bg-slate-50 text-red-950 rounded-xl font-semibold text-xs"
                >
                  No
                </button>
              </div>
            </div>

            {/* Urgent question */}
            {!patientData.hasRedFlags && (
              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                <div className="flex items-start gap-2.5 text-slate-900 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                  <span>{selectedSymptom.urgentQuestion}</span>
                </div>
                <div className="flex gap-3 pl-7">
                  <button
                    type="button"
                    onClick={() => {
                      setPatientData({ ...patientData, hasUrgentSigns: true });
                      setStep(4);
                    }}
                    className="px-5 py-2 bg-brand-blue hover:bg-blue-700 text-white rounded-xl font-bold text-xs shadow-xs"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPatientData({ ...patientData, hasUrgentSigns: false });
                      setStep(4);
                    }}
                    className="px-5 py-2 bg-white border border-blue-200 hover:bg-slate-50 text-slate-900 rounded-xl font-semibold text-xs"
                  >
                    No, neither applies
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-brand-border flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2 font-semibold text-brand-muted text-xs hover:text-brand-navy"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: TRIAGE OUTCOME & ACTION PLAN */}
      {step === 4 && (
        <div className="space-y-6">
          {patientData.hasRedFlags ? (
            /* EMERGENCY OUTCOME */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-red-500 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-red-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold">
                  <AlertOctagon className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-700">
                    Highest Clinical Priority
                  </span>
                  <h2 className="text-2xl font-extrabold text-red-950">
                    Immediate Emergency Care Needed
                  </h2>
                </div>
              </div>

              <ClinicalCallout
                type="emergency"
                title="Dial Rescue 1122 or proceed directly to an Emergency Department"
                actionText="Call Rescue 1122 Now"
                actionHref="tel:1122"
              >
                <p>
                  Based on your responses for <strong>{selectedSymptom?.label}</strong>, these symptoms can indicate a life-threatening acute event (such as acute coronary syndrome, hemorrhagic dengue shock, or stroke).
                </p>
                <ul className="list-disc pl-5 space-y-1 font-medium">
                  <li>Keep patient seated or lying down comfortably.</li>
                  <li>Do not leave them alone while dispatch travels.</li>
                  <li>If breathing stops, immediately start chest compressions.</li>
                </ul>
              </ClinicalCallout>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  href="/services/hospitals"
                  className="p-4 bg-brand-bg rounded-2xl border border-brand-border hover:bg-slate-100 transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-xs text-brand-navy">Find 24/7 Trauma Centers</p>
                    <p className="text-[11px] text-brand-muted">Tertiary teaching hospitals near you</p>
                  </div>
                  <Building2 className="w-5 h-5 text-brand-teal" />
                </Link>

                <Link
                  href="/emergency/first-aid"
                  className="p-4 bg-brand-bg rounded-2xl border border-brand-border hover:bg-slate-100 transition-colors flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-xs text-brand-navy">Open CPR Metronome</p>
                    <p className="text-[11px] text-brand-muted">110 BPM life support timer</p>
                  </div>
                  <Activity className="w-5 h-5 text-red-600" />
                </Link>
              </div>

              <div className="pt-4 border-t border-brand-border flex justify-end">
                <button
                  onClick={resetChecker}
                  className="px-4 py-2 text-xs font-bold text-brand-teal hover:underline flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start New Assessment</span>
                </button>
              </div>
            </div>
          ) : patientData.hasUrgentSigns ? (
            /* URGENT CLINICAL CARE */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-300 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-blue-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-bold">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700">
                    Urgent Clinical Guidance
                  </span>
                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Consult a Doctor Within 12–24 Hours
                  </h2>
                </div>
              </div>

              <ClinicalCallout
                type="urgent"
                title="Book an urgent medical consultation"
                actionText="Find Specialist Doctor"
                actionHref="/services/doctors"
              >
                <p>
                  Your symptoms suggest a condition requiring professional medical evaluation, blood tests (such as CBC for platelets or fasting blood sugar), or prescription medications.
                </p>
              </ClinicalCallout>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/services/doctors"
                  className="px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-bold hover:bg-brand-teal-dark shadow-xs"
                >
                  Book Verified Doctor
                </Link>
                <Link
                  href="/services/laboratories"
                  className="px-5 py-2.5 bg-brand-bg border border-brand-border text-brand-navy rounded-xl text-xs font-bold hover:bg-slate-100"
                >
                  Find Diagnostic Lab
                </Link>
              </div>

              <div className="pt-4 border-t border-brand-border flex justify-end">
                <button
                  onClick={resetChecker}
                  className="px-4 py-2 text-xs font-bold text-brand-teal hover:underline flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start New Assessment</span>
                </button>
              </div>
            </div>
          ) : (
            /* SAFE HOME CARE / MONITORING */
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700">
                    Mild / Non-Emergency
                  </span>
                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Conservative Self-Care & Active Monitoring
                  </h2>
                </div>
              </div>

              <ClinicalCallout
                type="info"
                title="Home care advice & when to seek help"
                actionText="Browse Health A–Z Guide"
                actionHref="/health"
              >
                <p>
                  No critical red-flag symptoms were identified. Continue resting, maintain oral hydration (ORS/boiled water for gastrointestinal symptoms or fevers), and monitor temperature.
                </p>
                <p className="font-semibold text-brand-navy">
                  If symptoms deteriorate, fever rises above 102°F, or new severe signs develop, return immediately to this checker or contact a doctor.
                </p>
              </ClinicalCallout>

              <div className="pt-4 border-t border-brand-border flex justify-end">
                <button
                  onClick={resetChecker}
                  className="px-4 py-2 text-xs font-bold text-brand-teal hover:underline flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Start New Assessment</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
