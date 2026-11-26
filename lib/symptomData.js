// Symptom sets per age group / sex. General guidance only; not a diagnosis tool.
// Age groups: child 0-12, teen 13-17, adult 18-59, senior 60+.
const S = (id, label, desc, redFlagQuestion, urgentQuestion, only) => ({ id, label, desc, redFlagQuestion, urgentQuestion, only });

const CHILD = [
  S("infant", "Infant (under 1 year)", "Feeding poorly, crying a lot, sleeping too much or looking unwell.",
    "Is the baby under 3 months with fever, hard to wake, breathing fast or grunting, has blue lips, a bulging soft spot on the head, or repeated green vomiting?",
    "Is the baby feeding much less, having fewer wet nappies than usual, or unusually irritable?"),
  S("fever_child", "High Fever", "Hot to touch, irritable, feeding or drinking less.",
    "Is the child under 3 months old, very drowsy or hard to wake, having a fit, has a stiff neck, or a rash that does not fade when pressed?",
    "Has the fever lasted more than 3 days, or is the child drinking much less or passing very little urine?"),
  S("cough_child", "Cough / Fast or Noisy Breathing", "Cough, wheeze, or breathing faster than usual.",
    "Are the lips blue, are the ribs pulling in with each breath, or is the child too breathless to feed or talk?",
    "Is there a barking cough, wheeze, or breathing that is getting faster?"),
  S("diarrhoea_child", "Diarrhoea / Vomiting", "Loose stools or repeated vomiting.",
    "Is there blood in the stool, green vomit, the child is very sleepy, has sunken eyes, or has passed no urine for many hours?",
    "Has vomiting or diarrhoea lasted more than 24 hours, or is the child refusing all fluids?"),
  S("rash_child", "Skin Rash", "New rash, itching, or blisters.",
    "Are there purple or red spots that do not fade when pressed, with fever, or swelling of the face or lips, or trouble breathing?",
    "Is the rash spreading quickly, blistering, or very itchy and not settling?"),
  S("ear_throat_child", "Ear Pain / Sore Throat", "Pulling at the ear, pain when swallowing.",
    "Is the child drooling, struggling to swallow saliva or breathe, or is there swelling behind the ear?",
    "Has the pain lasted more than 2 days, or is there discharge from the ear?"),
  S("injury_child", "Fall / Head Injury", "Bump on the head, fall, or limb injury.",
    "Did the child lose consciousness, vomit repeatedly, seem confused or very sleepy, or have a fit after the injury?",
    "Is there swelling or pain that stops the child using an arm or leg?"),
];

const MEM_RED = "Did the memory problem start suddenly, or come with confusion, severe headache, weakness on one side, trouble speaking, or after a head injury?";
const MEMORY = [
  S("memory_short", "Short-Term Memory Loss", "Forgetting recent events, conversations or where things were put.", MEM_RED,
    "Is it getting worse, affecting work or daily tasks, or happening with low mood, poor sleep or new medicines?"),
  S("memory_long", "Long-Term Memory Loss", "Forgetting long-past events, familiar people or places.", MEM_RED,
    "Has it been slowly getting worse over months, or is the person getting lost in familiar places?"),
];
const URINARY = S("urinary", "Urinary Issues", "Burning, frequent urination, weak flow, leaking, or getting up at night to pass urine.",
  "Is the person unable to pass urine at all, or is there fever with back or flank pain, or blood in the urine with severe pain?",
  "Have the symptoms lasted more than a few days, or do they keep coming back?");
const ADULT_BP = [
  S("bp_adult", "High Blood Pressure / Low Blood Pressure", "Readings that are repeatedly high or low, headaches, or feeling faint.",
    "Is there severe headache with chest pain, confusion, weakness on one side, loss of vision, or fainting?",
    "Are readings repeatedly high or low on separate days?"),
  S("dizzy", "Dizziness", "Spinning, light-headedness or unsteadiness.",
    "Is the dizziness sudden with chest pain, trouble speaking, weakness or numbness on one side, severe headache, or fainting?",
    "Does it keep coming back, or happen when standing up or with ear symptoms?"),
];

const TEEN = [
  S("fever_teen", "Flu-like Illness", "Body aches, sore throat, cough or feeling unwell.",
    "Is there a stiff neck, severe headache with light sensitivity, a rash that does not fade when pressed, confusion, or trouble breathing?",
    "Has the fever lasted more than 3 days, or is the teenager unable to keep fluids down?"),
  S("mental_teen", "Low Mood, Anxiety or Stress", "Feeling very low, worried, or unable to cope with school or home.",
    "Are there thoughts of self-harm or suicide, or does the young person feel unsafe? If yes, stay with them and seek help now.",
    "Has low mood, worry or poor sleep lasted more than 2 weeks and is it affecting school or daily life?"),
  S("skin_teen", "Acne / Skin Problems", "Pimples, painful spots, or skin irritation.",
    "Is there spreading redness with fever, or painful swelling that is growing quickly?",
    "Is the acne painful, leaving scars, or not improving after several weeks of care?"),
  S("puberty_teen", "Puberty / Growth Concerns", "Questions about body changes, growth or development.",
    "Is there severe pain, fainting, or very heavy bleeding?",
    "Are changes much earlier or later than friends of the same age, or causing worry that affects daily life?"),
  S("sports_teen", "Sports Injury / Joint Pain", "Sprain, strain or pain after activity.",
    "Does the limb look deformed, is the person unable to put weight on it, or is it numb or pale?",
    "Has swelling or pain lasted more than a few days?"),
  S("period_teen", "Painful or Irregular Periods", "Period pain, missed periods, or heavy bleeding.",
    "Is there very heavy bleeding (soaking a pad every hour), fainting, or severe pain with fever?",
    "Are periods very painful, missing for months, or lasting more than a week?", "female"),
  S("testicular_teen", "Testicular Pain or Swelling", "Pain, swelling or a lump in the testicles.",
    "Is the pain sudden and severe, or with vomiting? This needs urgent care.",
    "Is there a lump or swelling that has been present for days?", "male"),
];

const ADULT_MALE = [
  S("testicular_male", "Testicular Pain, Swelling or Lump", "Pain, swelling or a lump in the testicles.",
    "Is the pain sudden and severe, or with vomiting? This needs urgent care.",
    "Is there a new lump or swelling, even if painless?"),
  S("sexual_male", "Sexual or Reproductive Health Concerns", "Discharge, sores, pain, or erection problems.",
    "Is there a painful erection lasting more than 4 hours?",
    "Is there discharge, sores or pain that may need testing?"),
];

const ADULT_FEMALE = [
  S("period_adult", "Menstrual Problems", "Heavy, painful, missed or irregular periods.",
    "Is there very heavy bleeding (soaking a pad every hour), fainting, or severe pelvic pain with fever?",
    "Are periods missing for months (and not pregnant), very painful, or irregular for several cycles?"),
  S("pregnancy", "Pregnancy Concerns", "Symptoms during pregnancy or a possible pregnancy.",
    "Is there vaginal bleeding, severe abdominal pain, severe headache with blurred vision, swelling of face or hands, a fit, or the baby moving much less?",
    "Is there persistent vomiting, fever, or any worry about the pregnancy?"),
  S("breast", "Breast Lump or Pain", "New lump, pain, or nipple discharge.",
    "Is there a hard lump with skin changes, bloody nipple discharge, or a lump that is growing quickly?",
    "Is there any new lump, even if painless?"),
  S("pelvic", "Pelvic Pain / Unusual Discharge", "Lower abdominal pain, unusual discharge, burning when passing urine.",
    "Is there severe pelvic pain with fever, fainting, or heavy bleeding?",
    "Have symptoms lasted more than a few days or keep coming back?"),
];

const SENIOR = [
  S("joints_senior", "Joint Pain / Stiffness / Trouble Walking", "Knee, hip or back pain that limits movement.",
    "Was there a fall with severe pain, inability to stand, or a deformed hip or limb?",
    "Is the pain getting worse, limiting walking, or have there been falls?"),
  S("bp_senior", "Blood Pressure Concerns / Dizziness", "High readings, headaches, dizzy spells or fainting.",
    "Is there severe headache with chest pain, confusion, weakness on one side, or sudden vision loss?",
    "Are readings repeatedly high, or are there dizzy spells or fainting?"),
  S("diabetes_senior", "Diabetes Concerns", "Thirst, frequent urination, tiredness or abnormal sugar readings.",
    "Is there confusion, drowsiness, repeated vomiting, or shakiness and sweating that does not improve after taking sugar?",
    "Are sugar readings repeatedly out of range, or are foot wounds slow to heal?"),
  S("eyes_ears_senior", "Vision or Hearing Changes", "Blurred vision, difficulty hearing, eye pain or ringing in the ears.",
    "Was there sudden loss of vision, flashes of light with a curtain-like shadow, or sudden hearing loss?",
    "Is vision or hearing slowly getting worse, or are the eyes painful and red?"),
];

const KEEP_FOR_SENIOR = ["chest_pain", "stroke_neuro", "breathing_difficulty"];

export function ageGroupFromAge(age) {
  const a = Number(age);
  if (!Number.isFinite(a) || a < 0 || a > 120) return null;
  return a <= 12 ? "child" : a <= 17 ? "teen" : a <= 59 ? "adult" : "senior";
}

export function getSymptoms(patient, base) {
  const g = patient.ageGroup, sex = patient.gender;
  const onlySex = (list) => list.filter((s) => !s.only || s.only === sex);
  // Infant and High Fever belong to Children only. The adult dengue/malaria item keeps its content but no longer says "High Fever".
  const adultBase = base.filter((s) => s.id !== "pediatric_fever").map((s) => (s.id === "dengue_fever" ? { ...s, label: "Suspected Dengue / Malaria" } : s));
  if (g === "child") return CHILD;
  if (g === "teen") return [...onlySex(TEEN), ...MEMORY];
  if (g === "senior") return [...adultBase.filter((s) => KEEP_FOR_SENIOR.includes(s.id)), ...SENIOR, ...MEMORY, URINARY];
  return [...adultBase, ...ADULT_BP, ...MEMORY, URINARY, ...(sex === "female" ? ADULT_FEMALE : ADULT_MALE)];
}
