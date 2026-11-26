import React from "react";
import Link from "next/link";
import { Heart, ChevronRight, PhoneCall, AlertTriangle, ShieldCheck } from "lucide-react";
import FirstAidToolkit from "@/components/emergency/FirstAidToolkit";

export const metadata = {
  title: "Basic First Aid Protocols & Action Steps | tandrust.pk",
  description: "Clinically reviewed first-aid steps for CPR, choking relief, severe burns, and bleeding in Pakistan.",
};

export default function FirstAidPage() {
  const protocols = [
    {
      title: "1. Adult CPR (Cardiopulmonary Resuscitation)",
      urgency: "Immediate Action Required",
      steps: [
        "Check responsiveness and shout for someone nearby to call Rescue 1122.",
        "Position the person flat on their back on a firm surface.",
        "Place the heel of one hand on the center of the chest (lower half of breastbone), interlocking the second hand on top.",
        "Compress chest hard and fast at a rate of 100-120 beats per minute (to the rhythm of 'Stayin' Alive') allowing complete chest recoil.",
        "Continue hands-only CPR without stopping until emergency paramedics arrive with an automated external defibrillator (AED).",
      ],
    },
    {
      title: "2. Choking (Heimlich Abdominal Thrusts)",
      urgency: "Severe Airway Obstruction",
      steps: [
        "If the person cannot cough, speak, or breathe, stand behind them and wrap your arms around their waist.",
        "Make a fist with one hand and place the thumb side just above the navel, below the ribcage.",
        "Grasp the fist with your other hand and give quick, upward thrusts into the abdomen.",
        "Repeat thrusts until the lodged object is expelled or the person becomes unresponsive (in which case begin CPR).",
      ],
    },
    {
      title: "3. Severe Heatstroke Management (Pakistani Summer)",
      urgency: "Internal Temperature > 104°F",
      steps: [
        "Move the patient immediately into shade or an air-conditioned room.",
        "Remove excess clothing and apply cool water or wet cloths to neck, armpits, and groin where major blood vessels pass.",
        "Fan the patient vigorously to promote evaporative cooling.",
        "Do NOT give oral fluids if the patient is confused or vomiting. Call Rescue 1122 for immediate IV cooling.",
      ],
    },
    {
      title: "4. Severe Bleeding Control",
      urgency: "Risk of Hypovolemic Shock",
      steps: [
        "Apply firm, continuous direct pressure over the bleeding wound using a clean cloth, gauze, or sterile towel.",
        "Keep pressure applied without lifting the cloth to check.",
        "If bleeding soaks through, place another cloth on top and maintain constant pressure.",
        "Keep the injured person lying down and warm while waiting for the ambulance.",
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
        <span className="text-brand-navy font-semibold">First Aid</span>
      </nav>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Heart className="w-4 h-4" />
          <span>Basic Life Support Protocols</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          Basic First Aid Protocols
        </h1>
        <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
          Evidence-based immediate response protocols. While applying first aid, always ensure emergency dispatch (Rescue 1122 or Edhi 115) is on the way.
        </p>

        <div className="p-3.5 bg-red-50 rounded-2xl border border-red-200 text-xs font-bold text-red-900 flex items-center justify-between gap-4">
          <span>Life-threatening crisis? Do not delay calling:</span>
          <a href="tel:1122" className="px-4 py-1.5 bg-red-600 text-white rounded-xl shadow-xs">
            Dial 1122
          </a>
        </div>
      </div>

      {/* Interactive Metronome & Action Steps Toolkit */}
      <FirstAidToolkit />

      <div className="space-y-6">
        {protocols.map((p) => (
          <div key={p.title} className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border pb-3">
              <h2 className="text-lg font-bold text-brand-navy">{p.title}</h2>
              <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
                {p.urgency}
              </span>
            </div>
            <ol className="space-y-2 text-xs sm:text-sm text-brand-text leading-relaxed">
              {p.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-brand-bg text-brand-navy font-bold flex items-center justify-center flex-shrink-0 text-xs border border-brand-border">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}
