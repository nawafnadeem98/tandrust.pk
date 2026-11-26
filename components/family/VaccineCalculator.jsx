"use client";

import React, { useState } from "react";
import {
  Baby,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";

export default function VaccineCalculator() {
  const [birthDate, setBirthDate] = useState(() => {
    // Default to a 2-month-old infant for demo
    const d = new Date();
    d.setMonth(d.getMonth() - 2);
    return d.toISOString().split("T")[0];
  });

  const calculateSchedule = (dobString) => {
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return [];

    const now = new Date();

    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const addMonths = (date, months) => {
      const result = new Date(date);
      result.setMonth(result.getMonth() + months);
      return result;
    };

    const milestones = [
      {
        ageLabel: "At Birth (Within 24 Hours)",
        date: dob,
        vaccines: "BCG (Tuberculosis), OPV-0 (Oral Polio), Hepatitis B Birth Dose",
        facility: "Hospital / Basic Health Unit (BHU)",
        notes: "Administered immediately after delivery in labor room.",
      },
      {
        ageLabel: "6 Weeks Old",
        date: addDays(dob, 42),
        vaccines: "Pentavalent-1 (DTP-HepB-Hib), PCV-1 (Pneumococcal), OPV-1, Rotavirus-1 (Diarrhea)",
        facility: "Nearest EPI Center / Tehsil Headquarter Hospital",
        notes: "First combination primary dose. Protects against 8 fatal illnesses.",
      },
      {
        ageLabel: "10 Weeks Old",
        date: addDays(dob, 70),
        vaccines: "Pentavalent-2, PCV-2, OPV-2, Rotavirus-2",
        facility: "Nearest EPI Center / Government Dispensary",
        notes: "Must maintain a minimum 4-week gap from previous dose.",
      },
      {
        ageLabel: "14 Weeks Old",
        date: addDays(dob, 98),
        vaccines: "Pentavalent-3, PCV-3, OPV-3, IPV-1 (Injectable Polio)",
        facility: "Nearest EPI Center",
        notes: "Completes primary infant vaccine series.",
      },
      {
        ageLabel: "9 Months Old",
        date: addMonths(dob, 9),
        vaccines: "Typhoid Conjugate Vaccine (TCV), Measles-Rubella 1 (MR-1)",
        facility: "Nearest EPI Center",
        notes: "Protects against Pakistan's drug-resistant XDR Typhoid strain.",
      },
      {
        ageLabel: "15 Months Old",
        date: addMonths(dob, 15),
        vaccines: "Measles-Rubella 2 (MR-2)",
        facility: "Nearest EPI Center",
        notes: "Final booster providing lifelong immunity against Measles.",
      },
    ];

    return milestones.map((m) => {
      const diffTime = m.date - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let status = "UPCOMING";
      let statusColor = "bg-slate-100 text-slate-700";
      let statusText = `In ${Math.ceil(diffDays / 7)} weeks`;

      if (diffDays < -14) {
        status = "COMPLETED";
        statusColor = "bg-emerald-100 text-emerald-800 border-emerald-300";
        statusText = "Completed / Past Due";
      } else if (diffDays >= -14 && diffDays <= 14) {
        status = "DUE_NOW";
        statusColor = "bg-amber-100 text-amber-900 border-amber-300 animate-pulse";
        statusText = "Due Now / This Month";
      }

      return {
        ...m,
        formattedDate: m.date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        status,
        statusColor,
        statusText,
      };
    });
  };

  const schedule = calculateSchedule(birthDate);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-border pb-4 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
            <Baby className="w-4 h-4" />
            <span>Personalized Milestone Tracker</span>
          </div>
          <h2 className="text-xl font-bold text-brand-navy mt-1">
            Child Immunization Schedule Calculator
          </h2>
          <p className="text-xs text-brand-muted">
            Enter your baby&apos;s date of birth to calculate exact EPI vaccination dates across Pakistan.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-brand-bg hover:bg-slate-200 border border-brand-border rounded-xl text-xs font-semibold text-brand-navy flex items-center gap-1.5 transition-colors print:hidden"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Immunization Card</span>
        </button>
      </div>

      {/* Date Picker Input */}
      <div className="max-w-xs space-y-1.5">
        <label className="text-xs font-semibold text-brand-navy block">
          Baby&apos;s Date of Birth:
        </label>
        <div className="relative">
          <Calendar className="w-4 h-4 text-brand-muted absolute left-3 top-3 pointer-events-none" />
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-brand-bg rounded-xl border border-brand-border text-xs text-brand-navy font-semibold focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>
      </div>

      {/* Schedule Table / Milestone Cards */}
      <div className="space-y-3 pt-2">
        {schedule.map((milestone, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-brand-bg border border-brand-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-brand-teal/40"
          >
            <div className="space-y-1 sm:max-w-lg">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-brand-navy">
                  {milestone.ageLabel}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${milestone.statusColor}`}
                >
                  {milestone.statusText}
                </span>
              </div>
              <p className="text-xs font-bold text-brand-teal">{milestone.vaccines}</p>
              <p className="text-[11px] text-brand-muted">{milestone.notes}</p>
            </div>

            <div className="sm:text-right flex-shrink-0">
              <div className="text-xs font-bold text-brand-navy font-mono">
                📅 {milestone.formattedDate}
              </div>
              <p className="text-[10px] text-brand-muted mt-0.5">{milestone.facility}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          All vaccines listed above are provided 100% free of charge by the Government of Pakistan under the Expanded Programme on Immunization (EPI). No fee or card charges apply at government health facilities.
        </p>
      </div>
    </div>
  );
}
