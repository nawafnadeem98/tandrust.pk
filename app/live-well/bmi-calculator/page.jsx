"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Scale,
  Activity,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import ClinicalCallout from "@/components/ui/ClinicalCallout";
import { useLanguage } from "@/context/LanguageContext";

export default function SouthAsianBMICalculatorPage() {
  const [unit, setUnit] = useState("metric"); // "metric" (cm, kg) or "imperial" (ft/in, lbs)
  const [gender, setGender] = useState("male");
  const [heightCm, setHeightCm] = useState(170);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(7);
  const [weightKg, setWeightKg] = useState(70);
  const [weightLbs, setWeightLbs] = useState(154);
  const [waistInches, setWaistInches] = useState(34);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { isUrdu } = useLanguage();

  const calculateBMI = (e) => {
    e.preventDefault();

    let finalHeightM = 0;
    let finalWeightKg = 0;

    if (unit === "metric") {
      finalHeightM = Number(heightCm) / 100;
      finalWeightKg = Number(weightKg);
    } else {
      const totalInches = Number(heightFeet) * 12 + Number(heightInches);
      finalHeightM = (totalInches * 2.54) / 100;
      finalWeightKg = Number(weightLbs) * 0.453592;
    }

    const E = (en, ur) => { setResult(null); setError(isUrdu ? ur : en); };
    const nums = [heightCm, heightFeet, heightInches, weightKg, weightLbs, waistInches].map(Number);
    if (nums.some((v) => !Number.isFinite(v))) return E("Please enter numbers only.", "براہ کرم صرف عدد لکھیں۔");
    if (nums.some((v) => v < 0)) return E("Values cannot be negative.", "قدریں منفی نہیں ہو سکتیں۔");
    if (!(finalHeightM > 0) || !(finalWeightKg > 0)) return E("Height and weight must be greater than zero.", "قد اور وزن صفر سے زیادہ ہونا چاہیے۔");
    if (unit !== "metric" && Number(heightInches) > 11) return E("Inches must be between 0 and 11.", "انچ 0 سے 11 کے درمیان ہونے چاہییں۔");
    if (finalHeightM < 0.5 || finalHeightM > 2.72) return E("Please enter a realistic height (50 to 272 cm).", "درست قد لکھیں (50 سے 272 سنٹی میٹر)۔");
    if (finalWeightKg < 2 || finalWeightKg > 500) return E("Please enter a realistic weight (2 to 500 kg).", "درست وزن لکھیں (2 سے 500 کلوگرام)۔");
    setError("");

    const bmi = finalWeightKg / (finalHeightM * finalHeightM);
    const waistCm = Number(waistInches) * 2.54;

    // South Asian WHO thresholds
    let category = "Normal weight";
    let riskLevel = "Optimal Health";
    let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-200";

    if (bmi < 18.5) {
      category = isUrdu ? "کم وزن (Underweight)" : "Underweight";
      riskLevel = isUrdu ? "غذائی کمی کا خطرہ زیادہ ہو سکتا ہے" : "Increased risk of nutritional deficiency";
      colorClass = "text-blue-700 bg-blue-50 border-blue-200";
    } else if (bmi >= 18.5 && bmi < 23.0) {
      category = isUrdu ? "نارمل وزن (Normal Weight)" : "Normal Weight";
      riskLevel = isUrdu ? "دل اور میٹابولک بیماریوں کا خطرہ سب سے کم" : "Lowest cardiometabolic risk";
      colorClass = "text-emerald-700 bg-emerald-50 border-emerald-300";
    } else if (bmi >= 23.0 && bmi < 27.5) {
      category = isUrdu ? "زیادہ وزن (Overweight)" : "Overweight";
      riskLevel = isUrdu ? "ذیابیطس ٹائپ 2 اور بلند فشار خون کا خطرہ بڑھ جاتا ہے" : "Increased risk of Type 2 Diabetes and Hypertension";
      colorClass = "text-amber-800 bg-amber-50 border-amber-300";
    } else {
      category = isUrdu ? "موٹاپا (Obesity)" : "Obesity";
      riskLevel = isUrdu ? "دل کی بیماری، فیٹی لیور اور میٹابولک سنڈروم کا زیادہ خطرہ" : "High risk of cardiovascular disease, fatty liver, and metabolic syndrome";
      colorClass = "text-red-700 bg-red-50 border-red-300";
    }

    // Waist risk check
    const isWaistHigh = gender === "male" ? waistCm > 90 : waistCm > 80;

    setResult({
      bmi: bmi.toFixed(1),
      category,
      riskLevel,
      colorClass,
      isWaistHigh,
      waistThreshold: gender === "male" ? "90 cm (35.4 inches)" : "80 cm (31.5 inches)",
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/live-well" className="hover:text-brand-teal transition-colors">Live Well</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold">BMI Calculator</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-brand-border shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-teal">
          <Scale className="w-4 h-4" />
          <span>WHO South Asian Specific Health Standard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">
          South Asian BMI & Healthy Weight Calculator
        </h1>
        <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed">
          The World Health Organization (WHO) and Pakistani endocrine societies recommend customized BMI thresholds for people of Pakistani / South Asian descent. South Asians carry higher visceral belly fat and diabetes risk at lower BMIs than standard Western cutoffs.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Form Column */}
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-brand-border pb-4">
            <h2 className="text-lg font-bold text-brand-navy">Calculate Your BMI</h2>
            {/* Unit Switcher */}
            <div className="flex bg-brand-bg rounded-xl p-1 border border-brand-border text-xs">
              <button
                type="button"
                onClick={() => setUnit("metric")}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  unit === "metric" ? "bg-white text-brand-teal shadow-2xs" : "text-brand-muted"
                }`}
              >
                Metric (cm/kg)
              </button>
              <button
                type="button"
                onClick={() => setUnit("imperial")}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  unit === "imperial" ? "bg-white text-brand-teal shadow-2xs" : "text-brand-muted"
                }`}
              >
                Imperial (ft/lbs)
              </button>
            </div>
          </div>

          <form onSubmit={calculateBMI} className="space-y-4 text-xs">
            {/* Gender */}
            <div>
              <label className="font-semibold text-brand-navy block mb-1">Biological Sex</label>
              <div className="grid grid-cols-2 gap-3">
                {["male", "female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2 rounded-xl font-bold capitalize transition-all border ${
                      gender === g
                        ? "bg-brand-teal text-white border-brand-teal"
                        : "bg-brand-bg border-brand-border text-brand-navy"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Height */}
            {unit === "metric" ? (
              <div>
                <label className="font-semibold text-brand-navy block mb-1">Height (Centimeters)</label>
                <div className="relative">
                  <input
                    type="number"
                    min="100"
                    max="250"
                    required
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-navy font-bold focus:outline-none focus:ring-2 focus:ring-brand-teal"
                  />
                  <span className="absolute right-3 top-2.5 text-brand-muted font-bold">cm</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="font-semibold text-brand-navy block mb-1">Height (Feet & Inches)</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type="number"
                      min="3"
                      max="7"
                      required
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-navy font-bold"
                    />
                    <span className="absolute right-3 top-2.5 text-brand-muted font-bold">ft</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      required
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-navy font-bold"
                    />
                    <span className="absolute right-3 top-2.5 text-brand-muted font-bold">in</span>
                  </div>
                </div>
              </div>
            )}

            {/* Weight */}
            <div>
              <label className="font-semibold text-brand-navy block mb-1">
                Weight ({unit === "metric" ? "Kilograms" : "Pounds"})
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="30"
                  max="300"
                  required
                  value={unit === "metric" ? weightKg : weightLbs}
                  onChange={(e) =>
                    unit === "metric" ? setWeightKg(e.target.value) : setWeightLbs(e.target.value)
                  }
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-navy font-bold focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                <span className="absolute right-3 top-2.5 text-brand-muted font-bold">
                  {unit === "metric" ? "kg" : "lbs"}
                </span>
              </div>
            </div>

            {/* Waist Circumference */}
            <div>
              <label className="font-semibold text-brand-navy block mb-1">
                Waist Size (Inches at Belly Button level)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="70"
                  value={waistInches}
                  onChange={(e) => setWaistInches(e.target.value)}
                  className="w-full p-2.5 bg-brand-bg rounded-xl border border-brand-border text-brand-navy font-bold"
                />
                <span className="absolute right-3 top-2.5 text-brand-muted font-bold">inches</span>
              </div>
              <p className="text-[11px] text-brand-muted mt-1">
                Crucial for South Asian metabolic risk. Measure halfway between bottom rib and top of hips.
              </p>
            </div>

            {error && <p role="alert" className="text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-xs font-semibold">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-brand-teal hover:bg-brand-teal-dark text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <Scale className="w-4 h-4" />
              <span>Calculate South Asian BMI</span>
            </button>
          </form>
        </div>

        {/* Results & Guidelines Column */}
        <div className="md:col-span-5 space-y-6">
          {result ? (
            <div className={`p-6 rounded-3xl border-2 ${result.colorClass} space-y-4 shadow-sm animate-in fade-in`}>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Your Result</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold font-mono text-brand-navy">{result.bmi}</span>
                  <span className="text-xs font-bold text-slate-500">kg/m²</span>
                </div>
                <p className="font-extrabold text-sm text-brand-navy">{result.category}</p>
                <p className="text-xs text-slate-700 leading-relaxed">{result.riskLevel}</p>
              </div>

              {result.isWaistHigh && (
                <div className="p-3 bg-amber-100 rounded-2xl border border-amber-300 text-xs text-amber-950 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>High Visceral Waist Risk:</strong> Your waist size exceeds the recommended South Asian threshold ({result.waistThreshold}). Reducing refined roti, white rice, and cooking oils can significantly lower this.
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-slate-200 text-xs text-brand-navy space-y-2">
                <p className="font-bold">Recommended Next Steps:</p>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  <li>
                    <Link href="/live-well/eat-well" className="text-brand-teal font-semibold hover:underline">
                      Read Desi Diet & Portion Control Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/live-well/physical-activity" className="text-brand-teal font-semibold hover:underline">
                      30-Minute Daily Brisk Walk Protocol
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/laboratories" className="text-brand-teal font-semibold hover:underline">
                      Book Fasting Glucose (HbA1c) & Lipid Screening
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-brand-bg rounded-3xl p-6 border border-brand-border space-y-4 text-xs text-brand-muted">
              <h3 className="font-bold text-brand-navy text-sm">Why the South Asian Cutoff Differs</h3>
              <p className="leading-relaxed">
                Conventional Western BMI marks <strong>25.0</strong> as overweight. However, South Asian genetics predispose individuals to high body fat and insulin resistance at much lower weights:
              </p>
              <div className="space-y-1.5 font-medium text-brand-navy bg-white p-3 rounded-2xl border border-brand-border">
                <div className="flex justify-between"><span>Normal Weight:</span> <strong className="text-emerald-700">18.5 – 22.9</strong></div>
                <div className="flex justify-between"><span>Overweight:</span> <strong className="text-amber-700">23.0 – 27.4</strong></div>
                <div className="flex justify-between"><span>Obese:</span> <strong className="text-red-700">27.5+</strong></div>
              </div>
              <p className="text-[11px]">
                Source: WHO Expert Consultation on Appropriate body-mass index for Asian populations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
