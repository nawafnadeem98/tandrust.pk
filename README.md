# tandrust.pk (tandrust.pk)
## Premium Full-Stack Healthcare Portal for Pakistan

> **"Your Health. Your Care. Your Pakistan."**  
> *آپ کی صحت۔ آپ کی دیکھ بھال۔ آپ کا پاکستان۔*

**tandrust.pk** is an accessible, trustworthy digital healthcare platform designed specifically for the people of Pakistan. Taking structural and accessibility inspiration from NHS.uk, tandrust.pk features an original brand identity, full English and Urdu (Nastaliq RTL) support, a persistent PostgreSQL database with Prisma ORM, secure authentication, appointment scheduling with double-booking prevention, patient & doctor dashboards, and an administrative CMS.

---

## 🌟 Key Features

1. **Brand Identity & Design System**
   - Palette: Healthcare Teal (`#087F68`), Deep Navy (`#12304A`), Soft Mint (`#EAF7F3`), Pale Blue (`#EFF6FB`), Alert Red (`#B42318`).
   - Reusable healthcare logo with medical cross & crescent motif.
   - Dual-language typography: Inter sans-serif & Noto Nastaliq Urdu with dynamic `dir="rtl"` support.

2. **Unified Global Search**
   - Instant search with live debouncing across Medical Conditions, DRAP Medicines, Symptoms, Verified Doctors, Hospitals & Diagnostic Labs.

3. **Clinical Health Reference (A–Z)**
   - `/health`: Alphabetical navigator (A to Z) with category filters.
   - `/health/conditions/[slug]`: Evidence-based condition guides (e.g. Dengue Fever, Type 2 Diabetes, Hypertension, XDR Typhoid) with mandatory red-flag emergency callouts, self-care steps, and clinical reviewer credentials.
   - `/health/symptoms`: Triage urgency categorization (`EMERGENCY`, `HIGH`, `MODERATE`, `LOW`).
   - `/health/tests-and-treatments`: Diagnostic guides (CBC, HbA1c, Obstetric Ultrasound, Hepatitis PCR).

4. **Medicines A–Z (DRAP Verified)**
   - `/medicines`: Searchable database containing generic names, common Pakistani brand names (e.g., Panadol, Augmentin, Glucophage, Nimkol), approved indications, serious adverse effects, and storage guidelines.

5. **Healthcare Services & Doctor Directory**
   - Direct search by city (Karachi, Lahore, Islamabad, Peshawar, Quetta, Multan, Faisalabad) and specialty.
   - Verified Pakistan Medical Commission (PMC / PMDC) registration numbers.
   - Individual doctor profile pages (`/services/[slug]`) with live slot booking.

6. **Appointment Booking with Conflict Prevention**
   - Atomic database transactions in PostgreSQL ensuring no two patients can ever reserve the same provider slot simultaneously.
   - Interactive rescheduling, cancellation, and receipt printing at `/appointments/confirmation/[id]`.

7. **Patient Dashboard (`/my-account`)**
   - Active bookings overview.
   - Private medical reports and lab results metadata.
   - Dependant and family profiles (children, spouse, parents).
   - Data deletion request pipeline.

8. **Doctor Portal (`/provider-dashboard`)**
   - View scheduled patient appointments and clinic notes.
   - Practice working hours and consultation fee settings.

9. **Administrative Console & CMS (`/admin`)**
   - Real-time operational database metrics (users, doctors, bookings, feedback).
   - Doctor verification approval/rejection workflows.
   - Health article authoring and publishing CMS.
   - Immutable security audit logs.

10. **Emergency Services Fast-Response Strip**
    - Instant one-tap dialing for Rescue 1122, Edhi 115, Chhipa 1020, and 24/7 Mental Health Helplines (Umang 0311-7786264, Rozan 0800-22444).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) + React 18
- **Language:** JavaScript
- **Styling:** Tailwind CSS + PostCSS
- **Database & ORM:** PostgreSQL 16 + Prisma ORM
- **Validation:** Zod
- **Authentication:** Server-side sessions with HTTP-only cookies (`jose` JWT + `bcryptjs` password hashing)
- **Icons:** Lucide React
- **Testing:** Node.js native test runner (`node:test`, `node:assert`)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js LTS (v20+ or v24+)
- PostgreSQL 15+ (Running on `localhost:5432`)

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tandrust.pk"
JWT_SECRET="tandrust-pk-secure-secret-key-change-in-production-2026"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"
TELEHEALTH_ENABLED="false"
```

### 3. Database Migration & Seeding
```bash
# Push Prisma schema to PostgreSQL
npm run prisma:push

# Seed authentic demonstration clinical data & accounts
npm run prisma:seed
```

### 4. Run Automated Test Suite
```bash
npm test
```
*Executes all 13 unit, security, double-booking prevention, and role-permission tests.*

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👥 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Patient / Citizen** | `patient@tandrust.pk` | `Pakistan123!` |
| **Doctor / Reviewer** | `reviewer@tandrust.pk` | `Pakistan123!` |
| **Content Editor** | `editor@tandrust.pk` | `Pakistan123!` |
| **Super Admin** | `admin@tandrust.pk` | `Admin123!@#` |

---

## 📜 Medical Disclaimer

Content on tandrust.pk is for educational and public health awareness purposes only. It is not a substitute for professional medical advice, clinical diagnosis, or personalized prescription. In life-threatening emergencies, always dial 1122 or 115 immediately.

## tandrust.pk – setup notes
1. `npm install`
2. Copy `.env.example` to `.env` (keep your existing `DATABASE_URL`, `JWT_SECRET` etc.) and add the AI variables:
   `AI_PROVIDER` (anthropic or openai), `AI_API_KEY`, `AI_MODEL`, optional `AI_BASE_URL`.
3. `npx prisma generate && npx prisma db push && npm run prisma:seed`
4. `npm run dev` (development) or `npm run build && npm start` (production, e.g. Vercel: add the same env vars in the project settings).
The AI assistant lives at `/ai-assistant` (page), `components/ai/AiAssistant.jsx` (UI, voice, Listen to Answer) and `app/api/assistant/route.js` + `lib/ai.js` (server only, key never reaches the browser).


## Database setup (needed for doctors, hospitals, labs, articles)
1. `npm run setup` (creates `.env` and shows what is missing).
2. Create a free Postgres database at neon.tech and copy its connection string into `DATABASE_URL` in `.env`.
3. `npx prisma generate`, `npx prisma db push`, `npm run prisma:seed`.
4. Restart `npm run dev` (`.env` is only read at start-up).
Until `DATABASE_URL` is set the site opens, shows a yellow setup banner, and database lists stay empty (no fake data).
