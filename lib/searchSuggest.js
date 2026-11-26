// Instant search suggestions (pages + health topics) in English and Urdu.
// Database results (conditions) are merged in by the SearchModal.
const P = (key, en, ur, href, kw = "") => ({ key, en, ur, href, kw });
const T = (key, en, ur, kw = "") => ({ key, en, ur, kw });

const ITEMS = [
  P("doc", "Find a Doctor", "ڈاکٹر تلاش کریں", "/services/doctors", "specialist physician"),
  P("hosp", "Hospitals & Trauma Centers", "ہسپتال اور ٹراما سینٹر", "/services/hospitals", "hospital emergency trauma"),
  P("lab", "Laboratories", "لیبارٹریاں", "/services/laboratories", "lab test blood"),
  P("eye", "Eye Care", "آنکھوں کی دیکھ بھال", "/services/eye-care", "ophthalmology vision cataract"),
  P("dent", "Dentists", "دانتوں کے ڈاکٹر", "/services/dentists", "dental teeth"),
  P("tele", "Online Video Consultation", "آن لائن ویڈیو مشورہ", "/services/telehealth", "telehealth video call"),
  P("sym", "Symptom Checker", "علامات جانچیں", "/health/symptom-checker", "symptoms check"),
  P("ai", "AI Health Assistant", "اے آئی ہیلتھ اسسٹنٹ", "/ai-assistant", "chat ask"),
  P("wom", "Women’s Health", "خواتین کی صحت", "/family-health/womens-health", "women gynecologist pregnancy period"),
  P("bmi", "BMI Calculator", "بی ایم آئی کیلکولیٹر", "/live-well/bmi-calculator", "weight height obesity"),
  P("emg", "Emergency Help", "ہنگامی مدد", "/emergency", "1122 rescue ambulance"),
  P("appt", "Book an Appointment", "اپائنٹمنٹ بک کریں", "/appointments", "booking"),
  P("mh", "Mental Health", "ذہنی صحت", "/services/mental-health", "depression anxiety stress"),
  P("physio", "Physiotherapy", "فزیوتھراپی", "/services/physiotherapy", "exercise rehab"),
  T("t1", "Dengue", "ڈینگی", "mosquito fever platelets"),
  T("t2", "Diabetes", "ذیابیطس", "sugar insulin"),
  T("t3", "High Blood Pressure", "ہائی بلڈ پریشر", "hypertension"),
  T("t4", "Fever", "بخار", "temperature"),
  T("t5", "Headache", "سر درد", "migraine"),
  T("t6", "Cough", "کھانسی", "cold flu"),
  T("t7", "Chest Pain", "سینے میں درد", "heart"),
  T("t8", "Anaemia", "خون کی کمی", "iron hemoglobin"),
  T("t9", "PCOS", "پی سی او ایس", "ovary"),
  T("t10", "Pregnancy", "حمل", "maternal antenatal"),
  T("t11", "Period Pain", "ماہواری میں درد", "menstrual cramps"),
  T("t12", "Back Pain", "کمر درد", "spine"),
  T("t13", "Memory Loss", "یادداشت کی کمزوری", "forgetful"),
  T("t14", "Dizziness", "چکر آنا", "vertigo"),
  T("t15", "Urinary Problems", "پیشاب کے مسائل", "urine burning"),
];

// Ignore Arabic diacritics and treat Arabic/Urdu letter variants alike.
const norm = (s) => String(s || "").toLowerCase().replace(/[\u064B-\u065F\u0670]/g, "").replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/ہ|ۃ/g, "ہ").trim();

export function suggest(query, isUrdu, extra = []) {
  const q = norm(query);
  if (!q) return [];
  const score = (it) => {
    const label = norm(isUrdu ? it.ur : it.en), other = norm(isUrdu ? it.en : it.ur), kw = norm(it.kw);
    if (label.startsWith(q)) return 3;
    if (label.split(/\s+/).some((w) => w.startsWith(q))) return 2;
    if (label.includes(q) || other.includes(q) || kw.split(/\s+/).some((w) => w.startsWith(q))) return 1;
    return 0;
  };
  const seen = new Set();
  return [...extra, ...ITEMS]
    .map((it) => ({ it, s: it.href && it.key.startsWith("db") ? 2 : score(it) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map(({ it }) => ({ key: it.key, label: isUrdu ? it.ur : it.en, href: it.href || null, kind: it.key.startsWith("db") ? (isUrdu ? "بیماری" : "Condition") : it.href ? (isUrdu ? "صفحہ" : "Page") : (isUrdu ? "موضوع" : "Topic") }))
    .filter((s) => { const k = s.label.toLowerCase(); if (seen.has(k)) return false; seen.add(k); return true; })
    .slice(0, 7);
}
