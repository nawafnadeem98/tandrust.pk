import React from "react";
import Link from "next/link";
import { ShieldAlert, ChevronRight, PhoneCall, AlertOctagon } from "lucide-react";

export const metadata = {
  title: "When to Seek Emergency Help | tandrust.pk",
  description: "Red-flag symptoms that require immediate emergency evaluation in Pakistan.",
};

export default function WhenToSeekHelpPage() {
  const redFlags = [
    {
      category: "Cardiovascular & Heart",
      signs: [
        "Crushing, squeezing pain or pressure in center of chest lasting more than 5 minutes.",
        "Pain radiating to left arm, neck, jaw, back, or stomach with cold sweats.",
        "Sudden irregular pounding heart rate accompanied by dizziness or blackouts.",
      ],
    },
    {
      category: "Neurological (Stroke Signs - FAST)",
      signs: [
        "Face drooping on one side when attempting to smile.",
        "Arm weakness or inability to raise both arms equally.",
        "Slurred or garbled speech or difficulty understanding spoken words.",
        "Sudden, catastrophic 'thunderclap' headache with neck stiffness.",
      ],
    },
    {
      category: "Respiratory & Breathing",
      signs: [
        "Severe shortness of breath where the person cannot complete a single sentence.",
        "Blue or grey tint around lips, gums, or nail beds (cyanosis / hypoxia).",
        "High-pitched wheezing or stridor accompanied by facial/throat swelling (anaphylaxis).",
      ],
    },
    {
      category: "Severe Infections & Dengue Warning Signs",
      signs: [
        "High fever with persistent uncontrolled vomiting.",
        "Spontaneous bleeding from gums, nose, blood in vomit, or dark black tarry stools.",
        "Extreme lethargy, confusion, or cold clammy extremities.",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/emergency" className="hover:text-brand-teal transition-colors">Emergency</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">When to Seek Help</span>
      </nav>

      <div className="bg-red-600 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-200">
          <AlertOctagon className="w-4 h-4 text-amber-300" />
          <span>Red Flag Clinical Checkpoints</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          When to Seek Immediate Emergency Hospital Care
        </h1>
        <p className="text-sm sm:text-base text-red-100 max-w-2xl leading-relaxed">
          Do not hesitate or attempt to drive yourself if you experience any of these symptoms. Call Rescue 1122 immediately.
        </p>
      </div>

      <div className="space-y-6">
        {redFlags.map((rf) => (
          <div key={rf.category} className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-3">
            <h2 className="text-lg font-bold text-brand-navy border-b border-brand-border pb-2">
              🚨 {rf.category}
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm text-brand-text leading-relaxed">
              {rf.signs.map((sign, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
