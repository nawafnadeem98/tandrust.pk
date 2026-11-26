const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting tandrust.pk database seeding...");

  // Clean existing records if any
  await prisma.auditLog.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.announcement.deleteMany({});
  await prisma.feedbackSubmission.deleteMany({});
  await prisma.contactRequest.deleteMany({});
  await prisma.savedArticle.deleteMany({});
  await prisma.savedProvider.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.providerAvailability.deleteMany({});
  await prisma.provider.deleteMany({});
  await prisma.facility.deleteMany({});
  await prisma.healthArticle.deleteMany({});
  await prisma.condition.deleteMany({});
  await prisma.symptom.deleteMany({});
  await prisma.treatment.deleteMany({});
  await prisma.medicine.deleteMany({});
  await prisma.vaccinationInfo.deleteMany({});
  await prisma.patientDocument.deleteMany({});
  await prisma.familyProfile.deleteMany({});
  await prisma.consentRecord.deleteMany({});
  await prisma.userProfile.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash("Pakistan123!", 10);
  const adminPasswordHash = await bcrypt.hash("Admin123!@#", 10);

  // 1. Create Users
  const adminUser = await prisma.user.create({
    data: {
      name: "Super Administrator",
      email: "admin@tandrust.pk",
      passwordHash: adminPasswordHash,
      role: "SUPER_ADMIN",
      phone: "+92 51 9201234",
      city: "Islamabad",
      province: "Islamabad Capital Territory",
      profile: {
        create: {
          gender: "Male",
          bloodGroup: "O+",
          address: "G-5/2, Health Secretariat, Islamabad",
          allergies: "None",
          chronicConditions: "None",
        },
      },
    },
  });

  const editorUser = await prisma.user.create({
    data: {
      name: "Dr. Fatima Noor",
      email: "editor@tandrust.pk",
      passwordHash,
      role: "CONTENT_EDITOR",
      phone: "+92 42 3578901",
      city: "Lahore",
      province: "Punjab",
      profile: {
        create: {
          gender: "Female",
          bloodGroup: "B+",
          address: "Gulberg III, Lahore",
        },
      },
    },
  });

  const reviewerUser = await prisma.user.create({
    data: {
      name: "Prof. Dr. Tariq Mahmood",
      email: "reviewer@tandrust.pk",
      passwordHash,
      role: "CLINICAL_REVIEWER",
      phone: "+92 51 8463000",
      city: "Islamabad",
      province: "Islamabad Capital Territory",
      profile: {
        create: {
          gender: "Male",
          bloodGroup: "A+",
          address: "Sector H-8/4, Islamabad",
        },
      },
    },
  });

  const patientUser = await prisma.user.create({
    data: {
      name: "Muhammad Usman",
      email: "patient@tandrust.pk",
      passwordHash,
      role: "PATIENT",
      phone: "+92 300 1234567",
      city: "Lahore",
      province: "Punjab",
      profile: {
        create: {
          gender: "Male",
          bloodGroup: "B+",
          address: "House 42, Street 8, DHA Phase 5, Lahore",
          allergies: "Penicillin allergy",
          chronicConditions: "Mild Seasonal Asthma",
          emergencyContact: "Zainab Usman (Wife) - +92 300 7654321",
        },
      },
      familyMembers: {
        create: [
          {
            name: "Zainab Usman",
            relationship: "Spouse",
            gender: "Female",
            bloodGroup: "O+",
            notes: "Routine health checkup",
          },
          {
            name: "Hamza Usman",
            relationship: "Child",
            gender: "Male",
            bloodGroup: "B+",
            notes: "EPI vaccination up to date",
          },
        ],
      },
      documents: {
        create: [
          {
            title: "Annual Lipid Profile & HbA1c Report",
            category: "LAB_REPORT",
            fileType: "application/pdf",
            fileSize: 245000,
            fileName: "lipid_profile_hba1c_2026.pdf",
            notes: "Tested at Chughtai Lab Lahore. Fasting glucose normal.",
          },
          {
            title: "Chest X-Ray Digital Copy",
            category: "IMAGING",
            fileType: "application/pdf",
            fileSize: 1850000,
            fileName: "chest_xray_march2026.pdf",
            notes: "Normal lung fields. Clear cardiothoracic ratio.",
          },
        ],
      },
    },
  });

  // 2. Create Healthcare Facilities
  const shifaHospital = await prisma.facility.create({
    data: {
      name: "Shifa International Hospital",
      slug: "shifa-international-hospital-islamabad",
      type: "HOSPITAL",
      description: "Premier tertiary-care teaching hospital accredited by JCI with 550+ beds and comprehensive emergency trauma services.",
      address: "Pitras Bukhari Road, Sector H-8/4",
      area: "Sector H-8",
      city: "Islamabad",
      district: "Islamabad",
      province: "Islamabad Capital Territory",
      phone: "+92 51 8463000",
      emergencyPhone: "+92 51 8463111",
      email: "info@shifa.com.pk",
      openingHours: "24 Hours / 7 Days",
      isEmergency24x7: true,
      isVerified: true,
      latitude: 33.6782,
      longitude: 73.0617,
      isDemonstration: false,
    },
  });

  const akuHospital = await prisma.facility.create({
    data: {
      name: "Aga Khan University Hospital (AKUH)",
      slug: "aga-khan-university-hospital-karachi",
      type: "HOSPITAL",
      description: "Internationally renowned JCI-accredited tertiary care university hospital delivering world-class healthcare, clinical research, and 24/7 emergency response.",
      address: "Stadium Road",
      area: "Gulshan-e-Iqbal",
      city: "Karachi",
      district: "Karachi East",
      province: "Sindh",
      phone: "+92 21 111 911 911",
      emergencyPhone: "+92 21 34861090",
      email: "akuh.information@aku.edu",
      openingHours: "24 Hours / 7 Days",
      isEmergency24x7: true,
      isVerified: true,
      latitude: 24.8934,
      longitude: 67.0754,
    },
  });

  const mayoHospital = await prisma.facility.create({
    data: {
      name: "Mayo Hospital & King Edward Medical University",
      slug: "mayo-hospital-lahore",
      type: "HOSPITAL",
      description: "One of South Asia's largest public teaching healthcare institutions, offering subsidized and free emergency, surgical, and pediatric treatments.",
      address: "Hospital Road, Near Anarkali",
      area: "Old Anarkali",
      city: "Lahore",
      district: "Lahore",
      province: "Punjab",
      phone: "+92 42 99211100",
      emergencyPhone: "+92 42 99211115",
      openingHours: "24 Hours / 7 Days",
      isEmergency24x7: true,
      isVerified: true,
      latitude: 31.5714,
      longitude: 74.3167,
    },
  });

  const ladyReadingHospital = await prisma.facility.create({
    data: {
      name: "Lady Reading Hospital (LRH) MTI",
      slug: "lady-reading-hospital-peshawar",
      type: "HOSPITAL",
      description: "The historical and largest autonomous tertiary care hospital in Khyber Pakhtunkhwa with modern Catheterization Lab, Trauma Center, and Burn Center.",
      address: "Soekarno Square, LRH Road",
      area: "City Center",
      city: "Peshawar",
      district: "Peshawar",
      province: "Khyber Pakhtunkhwa",
      phone: "+92 91 9211430",
      emergencyPhone: "+92 91 9211440",
      openingHours: "24 Hours / 7 Days",
      isEmergency24x7: true,
      isVerified: true,
      latitude: 34.0151,
      longitude: 71.5785,
    },
  });

  const chughtaiLab = await prisma.facility.create({
    data: {
      name: "Chughtai Lab & Diagnostic Center Central Hub",
      slug: "chughtai-lab-central-hub-lahore",
      type: "LABORATORY",
      description: "ISO 15189 accredited diagnostics network offering pathology, molecular biology, radiology, ultrasound, CT, and home sample collection across Pakistan.",
      address: "7 Jail Road, Main Gulberg",
      area: "Gulberg",
      city: "Lahore",
      district: "Lahore",
      province: "Punjab",
      phone: "+92 311 1456789",
      email: "info@chughtailab.com",
      openingHours: "24 Hours / 7 Days",
      isEmergency24x7: true,
      isVerified: true,
      latitude: 31.5326,
      longitude: 74.3412,
    },
  });

  const fazalDinPharmacy = await prisma.facility.create({
    data: {
      name: "Fazal Din's Pharma Plus F-6 Markaz",
      slug: "fazal-dins-pharma-plus-f6-islamabad",
      type: "PHARMACY",
      description: "Established temperature-controlled retail pharmacy chain maintaining strict cold chain management for vaccines, biologics, and prescription medications.",
      address: "Shop 12, Super Market, F-6 Markaz",
      area: "F-6",
      city: "Islamabad",
      district: "Islamabad",
      province: "Islamabad Capital Territory",
      phone: "+92 51 2601789",
      openingHours: "08:00 AM - 12:00 AM (Midnight)",
      isEmergency24x7: false,
      isVerified: true,
      latitude: 33.7297,
      longitude: 73.0747,
    },
  });

  // 3. Create Doctors & Providers
  const drTariq = await prisma.provider.create({
    data: {
      userId: reviewerUser.id,
      title: "Prof. Dr.",
      fullName: "Tariq Mahmood",
      slug: "dr-tariq-mahmood-cardiologist",
      pmcNumber: "PMC-12940-P",
      specialty: "Cardiology",
      subSpecialties: "Interventional Cardiology, Heart Failure, Coronary Angioplasty",
      experienceYears: 24,
      qualifications: "MBBS, FCPS (Cardiology), FACC (USA), FSCAI (USA)",
      bio: "Prof. Dr. Tariq Mahmood is a distinguished Interventional Cardiologist with over two decades of clinical experience in coronary interventions, hypertension management, and preventive heart care.",
      consultationFee: 3500,
      rating: 4.95,
      reviewCount: 84,
      isVerified: true,
      verificationStatus: "APPROVED",
      telehealthEnabled: true,
      phone: "+92 51 8463000",
      email: "tariq.mahmood@tandrust.pk",
      clinicAddress: "Executive Clinics, Shifa International Hospital, Sector H-8/4",
      area: "Sector H-8",
      city: "Islamabad",
      province: "Islamabad Capital Territory",
      facilityId: shifaHospital.id,
      availabilities: {
        create: [
          { dayOfWeek: 1, startTime: "09:00", endTime: "13:00", slotDuration: 30 },
          { dayOfWeek: 2, startTime: "09:00", endTime: "13:00", slotDuration: 30 },
          { dayOfWeek: 3, startTime: "09:00", endTime: "13:00", slotDuration: 30 },
          { dayOfWeek: 4, startTime: "09:00", endTime: "13:00", slotDuration: 30 },
          { dayOfWeek: 5, startTime: "09:00", endTime: "13:00", slotDuration: 30 },
        ],
      },
    },
  });

  const drAyesha = await prisma.provider.create({
    data: {
      title: "Dr.",
      fullName: "Ayesha Malik",
      slug: "dr-ayesha-malik-gynecologist",
      pmcNumber: "PMC-38412-S",
      specialty: "Gynecology & Obstetrics",
      subSpecialties: "High-Risk Pregnancy, Laparoscopic Surgery, Maternal-Fetal Medicine",
      experienceYears: 16,
      qualifications: "MBBS (Dow), FCPS (Obstetrics & Gynaecology), MRCOG (UK)",
      bio: "Dr. Ayesha Malik provides compassionate, evidence-based obstetric and gynecological care, specializing in high-risk antenatal supervision, gestational diabetes, and postpartum recovery.",
      consultationFee: 3000,
      rating: 4.92,
      reviewCount: 112,
      isVerified: true,
      verificationStatus: "APPROVED",
      telehealthEnabled: true,
      phone: "+92 21 111 911 911",
      email: "ayesha.malik@tandrust.pk",
      clinicAddress: "Consulting Clinic 2, Aga Khan University Hospital, Stadium Road",
      area: "Gulshan-e-Iqbal",
      city: "Karachi",
      province: "Sindh",
      facilityId: akuHospital.id,
      availabilities: {
        create: [
          { dayOfWeek: 1, startTime: "14:00", endTime: "18:00", slotDuration: 30 },
          { dayOfWeek: 3, startTime: "14:00", endTime: "18:00", slotDuration: 30 },
          { dayOfWeek: 5, startTime: "14:00", endTime: "18:00", slotDuration: 30 },
          { dayOfWeek: 6, startTime: "10:00", endTime: "14:00", slotDuration: 30 },
        ],
      },
    },
  });

  const drBilal = await prisma.provider.create({
    data: {
      title: "Dr.",
      fullName: "Bilal Ahmad",
      slug: "dr-bilal-ahmad-pediatrician",
      pmcNumber: "PMC-49120-P",
      specialty: "Pediatrics & Child Health",
      subSpecialties: "Neonatology, Pediatric Nutrition, Child Immunization, Asthma",
      experienceYears: 14,
      qualifications: "MBBS (KEMU), FCPS (Pediatrics), MCPS (Child Health)",
      bio: "Dr. Bilal Ahmad is a trusted pediatrician focusing on neonatal care, preventive childhood vaccination, childhood asthma during smog seasons, and growth monitoring.",
      consultationFee: 2500,
      rating: 4.88,
      reviewCount: 96,
      isVerified: true,
      verificationStatus: "APPROVED",
      telehealthEnabled: true,
      phone: "+92 42 3578900",
      email: "bilal.ahmad@tandrust.pk",
      clinicAddress: "Children Wellness Wing, Mayo Hospital, Near Anarkali",
      area: "Anarkali",
      city: "Lahore",
      province: "Punjab",
      facilityId: mayoHospital.id,
      availabilities: {
        create: [
          { dayOfWeek: 1, startTime: "10:00", endTime: "16:00", slotDuration: 20 },
          { dayOfWeek: 2, startTime: "10:00", endTime: "16:00", slotDuration: 20 },
          { dayOfWeek: 4, startTime: "10:00", endTime: "16:00", slotDuration: 20 },
          { dayOfWeek: 5, startTime: "10:00", endTime: "16:00", slotDuration: 20 },
        ],
      },
    },
  });

  const drSanaullah = await prisma.provider.create({
    data: {
      title: "Dr.",
      fullName: "Sanaullah Khan",
      slug: "dr-sanaullah-khan-internal-medicine",
      pmcNumber: "PMC-52199-K",
      specialty: "Internal Medicine",
      subSpecialties: "Infectious Diseases, Diabetes Mellitus, Typhoid, Dengue Management",
      experienceYears: 18,
      qualifications: "MBBS, FCPS (Internal Medicine), MRCP (UK)",
      bio: "Senior consultant physician at Lady Reading Hospital with extensive experience in diagnosing complex infectious illnesses, seasonal vector-borne diseases, and metabolic disorders.",
      consultationFee: 2000,
      rating: 4.85,
      reviewCount: 64,
      isVerified: true,
      verificationStatus: "APPROVED",
      telehealthEnabled: true,
      phone: "+92 91 9211430",
      email: "sanaullah.khan@tandrust.pk",
      clinicAddress: "Physicians Block, Lady Reading Hospital",
      area: "City Center",
      city: "Peshawar",
      province: "Khyber Pakhtunkhwa",
      facilityId: ladyReadingHospital.id,
      availabilities: {
        create: [
          { dayOfWeek: 1, startTime: "08:30", endTime: "14:00", slotDuration: 30 },
          { dayOfWeek: 2, startTime: "08:30", endTime: "14:00", slotDuration: 30 },
          { dayOfWeek: 3, startTime: "08:30", endTime: "14:00", slotDuration: 30 },
          { dayOfWeek: 4, startTime: "08:30", endTime: "14:00", slotDuration: 30 },
        ],
      },
    },
  });

  // 4. Create Initial Appointment for Patient
  await prisma.appointment.create({
    data: {
      patientId: patientUser.id,
      providerId: drTariq.id,
      facilityId: shifaHospital.id,
      serviceName: "Cardiology Routine Follow-up & ECG Review",
      date: "2026-11-05",
      timeSlot: "10:30 AM",
      status: "CONFIRMED",
      patientName: "Muhammad Usman",
      patientPhone: "+92 300 1234567",
      patientEmail: "patient@tandrust.pk",
      notes: "Routine follow-up regarding lipid profile and blood pressure.",
      fee: 3500,
      isPaid: true,
      isTelehealth: false,
    },
  });

  // 5. Create Conditions
  await prisma.condition.create({
    data: {
      name: "Dengue Fever",
      slug: "dengue-fever",
      urduName: "ڈینگی بخار",
      category: "Infectious Diseases",
      overview: "Dengue fever is a mosquito-borne viral infection caused by the dengue virus, transmitted primarily by female Aedes aegypti mosquitoes. In Pakistan, dengue outbreaks frequently peak post-monsoon between August and November.",
      symptomsList: "• Sudden high fever (104°F / 40°C)\n• Severe retro-orbital pain (pain behind the eyes)\n• Severe muscle and joint pain ('breakbone fever')\n• Nausea and recurrent vomiting\n• Skin rash appearing 2 to 5 days after onset of fever\n• Mild bleeding tendencies (nosebleeds, bleeding gums)",
      causes: "Infection with any of the four dengue virus serotypes (DENV-1, DENV-2, DENV-3, DENV-4) transmitted by infected Aedes mosquitoes that bite predominantly during daytime (early morning and late afternoon).",
      riskFactors: "Living in or traveling to urban areas with open standing clean water, poor drainage, improper water storage in barrels or discarded tyres, and previous infection with a different dengue serotype.",
      diagnosis: "Complete Blood Count (CBC) showing leukopenia and dropping platelet count. Dengue NS1 antigen test within the first 5 days of fever, or Dengue IgM/IgG antibody testing after day 5.",
      treatments: "There is no specific antiviral treatment for dengue. Management focuses on supportive care, aggressive oral rehydration solution (ORS), fresh juices, coconut water, and Paracetamol for fever control.",
      selfCare: "• Rest adequately and drink at least 2.5 to 3 liters of fluids daily.\n• Avoid aspirin, ibuprofen, mefenamic acid (Ponstan), or any NSAIDs as they severely increase bleeding risk.\n• Use mosquito repellents and sleep under nets.",
      prevention: "Eliminate standing water in air cooler trays, flowerpots, and uncovered water containers. Install window screens and wear light-colored, long-sleeved clothing.",
      whenToSeeDoctor: "If you develop a high fever with body aches in an area with active dengue cases, get a baseline CBC checked and consult a general physician.",
      whenUrgent: "SEEK IMMEDIATE EMERGENCY CARE AT ONCE IF:\n• Severe, relentless abdominal pain\n• Persistent vomiting (unable to keep fluids down)\n• Bleeding from gums, nose, or blood in vomit/stool\n• Lethargy, extreme fatigue, or sudden cold clammy skin\n• Platelet count dropping below 20,000/μL or rapidly falling with high hematocrit.",
      references: "WHO Dengue Guidelines 2024; National Institute of Health (NIH) Islamabad Dengue Advisory 2025; Pakistan Pediatric Association.",
      reviewerName: "Prof. Dr. Tariq Mahmood, FCPS",
      isDemonstration: false,
    },
  });

  await prisma.condition.create({
    data: {
      name: "Type 2 Diabetes Mellitus",
      slug: "type-2-diabetes",
      urduName: "ذیابیطس ٹائپ 2",
      category: "Metabolic & Endocrine",
      overview: "Type 2 diabetes is a chronic metabolic condition where the body becomes resistant to the effects of insulin or does not produce enough insulin. Pakistan currently has one of the highest prevalences of diabetes globally, affecting over a quarter of adult citizens.",
      symptomsList: "• Increased thirst (polydipsia) and frequent urination (polyuria), especially at night\n• Increased hunger (polyphagia) despite regular eating\n• Unexplained weight loss\n• Persistent fatigue and low energy\n• Blurred vision\n• Slow-healing cuts, sores, or recurrent skin infections\n• Tingling, numbness, or burning sensation in hands or feet (peripheral neuropathy)",
      causes: "Complex interplay of genetic predisposition, South Asian abdominal adiposity (visceral fat), physical inactivity, high-carbohydrate refined diet (white rice, refined flour roti, sugary sweets), and chronic metabolic stress.",
      riskFactors: "Family history of diabetes, age over 35, sedentary lifestyle, history of gestational diabetes during pregnancy, high blood pressure, and central obesity.",
      diagnosis: "Fasting Blood Sugar (FBS) ≥ 126 mg/dL (7.0 mmol/L) on two separate occasions; 2-hour Oral Glucose Tolerance Test (OGTT) ≥ 200 mg/dL; or Glycated Hemoglobin (HbA1c) ≥ 6.5%.",
      treatments: "Lifestyle modification (whole grains, high fiber, daily 30-minute brisk walk), first-line oral hypoglycemic medications (such as Metformin), DPP-4 inhibitors, SGLT-2 inhibitors, and insulin therapy when indicated.",
      selfCare: "• Monitor blood glucose levels regularly with a home glucometer.\n• Check feet daily for blisters, redness, or cracks.\n• Replace refined sugar and sweetened chai with healthy alternatives.\n• Undergo annual diabetic eye exams and urine microalbumin testing.",
      prevention: "Maintain healthy body weight (BMI between 18.5 and 23.0 kg/m² for South Asians), engage in regular aerobic exercise, and replace refined starches with legumes and fresh vegetables.",
      whenToSeeDoctor: "Schedule an appointment if you experience persistent excessive thirst, frequent nighttime urination, or unexplained weight loss.",
      whenUrgent: "SEEK IMMEDIATE EMERGENCY CARE IF:\n• Confusion, drowsiness, or difficulty waking up\n• Deep, rapid breathing with fruity-smelling breath (Diabetic Ketoacidosis)\n• Severe vomiting, high fever, or blood sugar exceeding 400 mg/dL accompanied by dehydration\n• Sudden visual disturbance or acute chest discomfort.",
      references: "International Diabetes Federation (IDF) Diabetes Atlas 10th Edition; Diabetic Association of Pakistan (DAP); American Diabetes Association Standards of Care 2025.",
      reviewerName: "Dr. Ayesha Malik, FCPS",
      isDemonstration: false,
    },
  });

  await prisma.condition.create({
    data: {
      name: "Hypertension (High Blood Pressure)",
      slug: "hypertension",
      urduName: "بلند فشار خون (ہائی بلڈ پریشر)",
      category: "Cardiovascular",
      overview: "Hypertension is a prevalent cardiovascular condition characterized by persistently elevated blood pressure against the artery walls. Known as the 'silent killer' because it often produces no symptoms until severe complications occur.",
      symptomsList: "• Often entirely asymptomatic ('silent')\n• Occipital morning headaches in severe cases\n• Shortness of breath on exertion\n• Dizziness or lightheadedness\n• Occasional nosebleeds\n• Visual disturbances or heart palpitations",
      causes: "Primary (essential) hypertension develops gradually over years due to genetics, arterial stiffness, high dietary sodium intake, obesity, and stress.",
      riskFactors: "Age over 40, family history, high salt consumption common in traditional curries and pickles (achaar), tobacco use, smoking, lack of physical activity, and untreated sleep apnea.",
      diagnosis: "Confirmed when resting systolic pressure is consistently ≥ 140 mmHg and/or diastolic pressure is ≥ 90 mmHg measured on at least two separate clinic visits.",
      treatments: "Dietary Approaches to Stop Hypertension (DASH diet), sodium reduction (< 2,000 mg/day), regular cardiovascular exercise, and antihypertensive medications (ACE inhibitors, ARBs, Calcium Channel Blockers, or thiazide diuretics).",
      selfCare: "• Keep a home blood pressure log morning and evening.\n• Reduce table salt and avoid processed foods.\n• Practice stress reduction techniques and quit smoking.\n• Take prescribed medications daily without skipping doses.",
      prevention: "Regular blood pressure screening once every year for adults, maintaining a healthy weight, and moderate regular exercise.",
      whenToSeeDoctor: "Consult a doctor if your home systolic blood pressure consistently reads between 135-179 mmHg or diastolic between 85-110 mmHg.",
      whenUrgent: "EMERGENCY HYPERTENSIVE CRISIS (CALL 1122 IMMEDIATELY) IF:\n• Blood pressure exceeds 180/120 mmHg WITH ANY OF:\n  - Sudden crushing chest pain or pressure\n  - Sudden numbness, weakness of face or arm, or slurred speech (signs of stroke)\n  - Sudden severe shortness of breath\n  - Sudden loss of vision or seizure.",
      references: "Pakistan Cardiac Society Guidelines; ACC/AHA High Blood Pressure Clinical Practice Guidelines.",
      reviewerName: "Prof. Dr. Tariq Mahmood, FCPS",
      isDemonstration: false,
    },
  });

  await prisma.condition.create({
    data: {
      name: "Typhoid Fever & XDR Typhoid",
      slug: "typhoid-fever",
      urduName: "ٹائیفائیڈ بخار",
      category: "Infectious Diseases",
      overview: "Typhoid fever is a life-threatening systemic infection caused by the bacterium Salmonella enterica serovar Typhi. Pakistan has been facing an outbreak of extensively drug-resistant (XDR) typhoid since 2016, making prevention and vaccination crucial.",
      symptomsList: "• Step-ladder rising fever reaching 103-104°F\n• Severe headache and malaise\n• Abdominal pain, bloating, and tenderness\n• Constipation in early stages or 'pea-soup' diarrhea\n• Rose spots on chest and abdomen (faint pink rash)\n• Enlarged spleen and liver (hepatosplenomegaly)",
      causes: "Ingestion of contaminated food or drinking water handled by an infected person or chronic carrier. Raw salads, unboiled tap water, and street ice are frequent sources.",
      riskFactors: "Lack of access to clean potable drinking water, consuming raw unpasteurized dairy or uncooked street food, and poor hand hygiene before eating.",
      diagnosis: "Blood culture (gold standard, highest yield in first week of fever). Stool and bone marrow culture. Typhidot / Widal tests are not definitive and can cause misleading over-treatment.",
      treatments: "Culture-guided antibiotics. For confirmed XDR typhoid strains resistant to fluoroquinolones, chloramphenicol, and ceftriaxone, Azithromycin or Carbapenems are prescribed by qualified infectious disease specialists.",
      selfCare: "• Drink only boiled or certified filtered bottled water.\n• Eat freshly cooked, hot food.\n• Wash hands thoroughly with soap for 20 seconds before eating and after using the bathroom.",
      prevention: "Get the Typhoid Conjugate Vaccine (TCV). Pakistan became the first country in the world to introduce TCV into its routine immunization programme.",
      whenToSeeDoctor: "Seek clinical consultation for any fever lasting more than 3-4 consecutive days accompanied by headache and stomach pain.",
      whenUrgent: "SEEK IMMEDIATE EMERGENCY HOSPITAL CARE IF:\n• Sudden agonizing abdominal rigidity (sign of intestinal perforation)\n• Blood in stool or vomit\n• Delirium, extreme lethargy, or inability to sit up.",
      references: "NIH Islamabad XDR Typhoid Surveillance; WHO Guidelines for Typhoid Vaccination in Endemic Areas.",
      reviewerName: "Dr. Sanaullah Khan, FCPS",
      isDemonstration: false,
    },
  });

  // 6. Create Medicines with DRAP Information
  await prisma.medicine.create({
    data: {
      name: "Paracetamol",
      slug: "paracetamol",
      genericName: "Paracetamol (Acetaminophen)",
      brandNames: "Panadol, Calpol, Disprol, Febrol",
      category: "Analgesic & Antipyretic",
      approvedUses: "Relief of mild to moderate pain (headache, toothache, muscle aches, sore throat) and reduction of fever in adults and children.",
      formulations: "Tablets (500mg, 665mg Extended Release), Suspension/Syrup (120mg/5ml, 250mg/5ml), Drops (100mg/ml), IV Infusion (1000mg/100ml)",
      safetyInfo: "Safe when used within recommended dosage limits. Never exceed 4,000 mg (8 x 500mg tablets) in 24 hours for adults. Do not combine multiple cold/flu medications containing paracetamol.",
      sideEffects: "Rare at therapeutic doses. Overdose causes severe, irreversible liver toxicity.",
      seriousSideEffects: "Jaundice (yellowing of skin/eyes), dark urine, extreme nausea, acute liver failure from overdose.",
      precautions: "Caution in patients with chronic liver disease, chronic alcohol dependency, or severe kidney impairment.",
      interactions: "Warfarin (prolonged high doses may increase anticoagulant effect).",
      storageInstructions: "Store below 30°C in a dry place protected from heat and moisture.",
      prescriptionRequired: false,
      regulatorySource: "DRAP (Drug Regulatory Authority of Pakistan) & British Pharmacopoeia (BP)",
    },
  });

  await prisma.medicine.create({
    data: {
      name: "Amoxicillin / Clavulanic Acid",
      slug: "amoxicillin-clavulanate",
      genericName: "Co-Amoxiclav (Amoxicillin + Potassium Clavulanate)",
      brandNames: "Augmentin, Amoxil-Clav, Curam, Megapen",
      category: "Broad-Spectrum Antibiotic",
      approvedUses: "Bacterial infections of the respiratory tract (sinusitis, community-acquired pneumonia, acute otitis media), urinary tract infections, skin and soft tissue infections.",
      formulations: "Tablets (375mg, 625mg, 1000mg), Oral Suspension (156mg/5ml, 312mg/5ml, 457mg/5ml), IV Injection (600mg, 1.2g)",
      safetyInfo: "Prescription-only medication. Must complete the full prescribed course even if symptoms resolve earlier to prevent antibiotic resistance.",
      sideEffects: "Diarrhea, nausea, mild stomach cramps, vomiting, candidiasis (fungal infection of mouth or groin).",
      seriousSideEffects: "Severe allergic anaphylaxis (hives, facial swelling, breathing difficulty), cholestatic jaundice or hepatitis, Clostridioides difficile colitis (severe watery diarrhea).",
      precautions: "Strictly contraindicated in individuals with known penicillin or beta-lactam hypersensitivity.",
      interactions: "Methotrexate (increased toxicity), oral contraceptives (may reduce efficacy), probenecid.",
      storageInstructions: "Store dry powder below 25°C. Once reconstituted with water, store suspension in refrigerator (2°C-8°C) and discard after 7 days.",
      prescriptionRequired: true,
      regulatorySource: "DRAP Registered Antibiotic Schedule G",
    },
  });

  await prisma.medicine.create({
    data: {
      name: "Metformin Hydrochloride",
      slug: "metformin",
      genericName: "Metformin Hydrochloride",
      brandNames: "Glucophage, Neodipar, Metfor, Glumet",
      category: "Biguanide Antidiabetic",
      approvedUses: "First-line oral treatment for Type 2 diabetes mellitus to lower blood glucose levels, improve insulin sensitivity, and help weight regulation.",
      formulations: "Immediate Release Tablets (500mg, 850mg, 1000mg), Extended Release (XR/SR) Tablets (500mg, 750mg, 1000mg)",
      safetyInfo: "Should be taken with or immediately after meals to reduce gastrointestinal side effects. Does not typically cause hypoglycemia when taken alone.",
      sideEffects: "Metallic taste in mouth, nausea, abdominal bloating, diarrhea, loss of appetite.",
      seriousSideEffects: "Lactic acidosis (rare but life-threatening complication characterized by malaise, muscle cramps, respiratory distress, and severe somnolence).",
      precautions: "Contraindicated in severe renal impairment (eGFR < 30 mL/min), acute metabolic acidosis, severe dehydration, or heart failure.",
      interactions: "Iodinated radiocontrast agents (temporarily withhold prior to contrast CT scans).",
      storageInstructions: "Store below 30°C in airtight containers.",
      prescriptionRequired: true,
      regulatorySource: "DRAP Essential Medicines List 2024",
    },
  });

  await prisma.medicine.create({
    data: {
      name: "Oral Rehydration Salts (ORS)",
      slug: "oral-rehydration-salts",
      genericName: "WHO Formulation Oral Rehydration Salts",
      brandNames: "Nimkol, Hydralyte, Pedialyte, ORS-N",
      category: "Electrolyte Replacement",
      approvedUses: "Prevention and treatment of dehydration and electrolyte loss caused by acute diarrhea, vomiting, gastroenteritis, cholera, and heat exhaustion.",
      formulations: "Powder sachet to be dissolved in 1 liter (or 200ml) of clean boiled/filtered water.",
      safetyInfo: "Standard life-saving treatment. Dissolve strictly in the exact volume of water indicated on the sachet. Do not boil the solution after mixing.",
      sideEffects: "Extremely safe when mixed in the correct volume. Excessively concentrated mixtures can cause hypernatremia.",
      seriousSideEffects: "Swelling of eyelids or extremities if consumed in gross excess.",
      precautions: "Ensure clean water is used for preparation. Use prepared solution within 24 hours (discard afterwards).",
      interactions: "None of clinical significance.",
      storageInstructions: "Store unmixed sachets in a cool, dry place.",
      prescriptionRequired: false,
      regulatorySource: "WHO Model List of Essential Medicines / DRAP OTC Category",
    },
  });

  // 7. Create Symptoms
  await prisma.symptom.create({
    data: {
      name: "High Fever with Chills",
      slug: "high-fever-with-chills",
      urduName: "کپکپی کے ساتھ تیز بخار",
      description: "Body temperature elevated above 100.4°F (38°C) accompanied by shivering, chills, goosebumps, and generalized muscle aches.",
      commonCauses: "Malaria, Dengue, Typhoid, viral upper respiratory infections, urinary tract infection, pneumonia.",
      selfCareTips: "Wear lightweight clothing, sponge with lukewarm (never ice-cold) water, stay hydrated with ORS, and take paracetamol as directed.",
      urgencyLevel: "MODERATE",
      immediateCareSign: "Seek emergency care if fever exceeds 104°F, does not come down with medication, or is accompanied by stiff neck, confusion, or breathing trouble.",
      relatedConditions: "dengue-fever,typhoid-fever",
    },
  });

  await prisma.symptom.create({
    data: {
      name: "Crushing Chest Pain or Pressure",
      slug: "chest-pain-pressure",
      urduName: "سینے میں شدید درد یا دباؤ",
      description: "A feeling of heavy pressure, squeezing, fullness, or pain in the center or left side of the chest that may radiate to the jaw, neck, left arm, or back.",
      commonCauses: "Acute Myocardial Infarction (Heart Attack), Angina, Pulmonary Embolism, Aortic Dissection, Acid Reflux (GERD).",
      selfCareTips: "Do not attempt self-care. Sit down immediately, loosen tight clothing, and call for emergency ambulance assistance.",
      urgencyLevel: "EMERGENCY",
      immediateCareSign: "CALL RESCUE 1122 IMMEDIATELY. This is a medical emergency requiring urgent hospital evaluation and ECG.",
      relatedConditions: "hypertension",
    },
  });

  // 8. Create Vaccination Info (Pakistan EPI Schedule)
  await prisma.vaccinationInfo.create({
    data: {
      title: "BCG & Oral Polio Vaccine (OPV 0)",
      slug: "bcg-opv-at-birth",
      urduTitle: "پیدائش کے وقت حفاظتی ٹیکے (بی سی جی اور پولیو)",
      targetAgeGroup: "At Birth (Within first 24-48 hours)",
      diseasePrevented: "Severe Childhood Tuberculosis (TB Meningitis) and Poliovirus Type 1, 2, 3.",
      dosesRequired: "1 Dose BCG (Intradermal) + 2 drops OPV",
      scheduleGuidance: "Administered at the maternity ward or nearest Government EPI Center immediately after birth. A small nodule or scar at the left upper arm confirms BCG uptake.",
      nationalProgramNotes: "Provided 100% free of charge by the Government of Pakistan under the Expanded Programme on Immunisation (EPI).",
    },
  });

  await prisma.vaccinationInfo.create({
    data: {
      title: "Typhoid Conjugate Vaccine (TCV)",
      slug: "typhoid-conjugate-vaccine-tcv",
      urduTitle: "ٹائیفائیڈ کنجوگیٹ ویکسین (ٹی سی وی)",
      targetAgeGroup: "9 Months of Age",
      diseasePrevented: "Extensively Drug-Resistant (XDR) Salmonella Typhi.",
      dosesRequired: "Single Intramuscular Dose",
      scheduleGuidance: "Administered at 9 months alongside the first dose of Measles-Rubella (MR-1) vaccine.",
      nationalProgramNotes: "Pakistan is the pioneer nation integrating TCV into national immunization after successful Gavi-supported trials across Sindh and Punjab.",
    },
  });

  // 9. Create Health Articles (Editorial & Reviewed)
  await prisma.healthArticle.create({
    data: {
      title: "Protecting Your Respiratory Health During Smog Season in Pakistan",
      slug: "protecting-respiratory-health-smog-pakistan",
      urduTitle: "پاکستان میں اسموگ کے موسم میں سانس کی حفاظت",
      summary: "Actionable, evidence-based guidance on combating high Air Quality Index (AQI) levels across Lahore, Faisalabad, and Punjab during winter months.",
      content: `### Understanding the Smog Crisis in Pakistan

Every winter between October and January, atmospheric inversion traps particulate matter (PM2.5 and PM10), vehicular exhaust, crop residue smoke, and brick kiln emissions close to the ground across central Punjab and the Indus basin. Air Quality Index (AQI) readings frequently exceed 400–700, entering hazardous zones.

### Health Impacts of High PM2.5 Exposure

Inhaling fine particulate matter penetrates deep into pulmonary alveoli and enters the bloodstream. Common acute effects include:
- Burning sensation in eyes and throat
- Exacerbation of bronchial asthma and COPD
- Persistent dry, hacking cough
- Increased risk of acute coronary syndromes and strokes

### Practical Protective Steps

1. **Monitor Local AQI Daily:** Check local air quality readings before planning morning walks or children's outdoor sports.
2. **Wear N95 / KN95 Respirators:** Standard surgical or cloth masks provide minimal protection against PM2.5 particles. Ensure a tight seal around nose and chin.
3. **Indoor Air Hygiene:** Keep windows and doors tightly sealed during peak smog hours (early morning and late evening). Utilize HEPA air purifiers if accessible, or place air-filtering houseplants (snake plant, spider plant, peace lily).
4. **Hydration & Steam Inhalation:** Drink warm fluids, herbal green tea, and practice gentle steam inhalation before bed to relieve congested nasal passages.
5. **Vulnerable Groups:** Asthmatic patients, elderly citizens, and young children should keep prescribed rescue inhalers readily accessible at all times.`,
      category: "LIVE_WELL",
      subCategory: "prevention",
      tags: "smog, respiratory, asthma, air quality, punjab, public health",
      coverImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      status: "PUBLISHED",
      readTime: 6,
      authorName: "Dr. Fatima Noor",
      authorRole: "Public Health Specialist",
      reviewerName: "Prof. Dr. Tariq Mahmood",
      reviewerRole: "Consultant Physician & Review Board",
      references: "Pakistan Environmental Protection Agency (Pak-EPA); World Health Organization Air Quality Guidelines 2024; Pakistan Chest Society.",
      isFeatured: true,
    },
  });

  await prisma.healthArticle.create({
    data: {
      title: "Balanced Pakistani Nutrition: Healthier Desi Meals Without Sacrificing Flavor",
      slug: "balanced-pakistani-nutrition-healthy-desi-diet",
      urduTitle: "متوازن پاکستانی خوراک: روایتی ذائقے کے ساتھ صحت مند کھانا",
      summary: "How to reform traditional curries, lentils, and bread to reduce coronary risk, tackle visceral fat, and prevent early-onset Type 2 diabetes.",
      content: `### The Double Burden of Malnutrition & Metabolic Disease

Traditional Pakistani cuisine is rich in spices, antioxidants, and lentils. However, modern cooking practices often involve excessive vegetable ghee, prolonged deep-frying, and heavy reliance on refined wheat flour (maida) and polished white rice.

### Practical Culinary Tweaks

#### 1. Roti & Carbohydrate Choices
Replace refined white flour with whole wheat (chakki atta) combined with chickpea flour (besan) or barley flour (jau ka atta). This drops the glycemic index, preventing sudden blood sugar spikes.

#### 2. Oil & Ghee Modification
- Reduce cooking oil from the traditional 4-5 tablespoons per salan down to 1-2 tablespoons.
- Choose cold-pressed mustard oil (sarson ka tel) or extra virgin olive oil for gentle cooking.
- Avoid reheated reused oil, which generates harmful trans fats and advanced glycation end-products.

#### 3. Half-Plate Salad Rule
Begin lunch and dinner with a bowl of fresh cucumber, radish, tomato, and onion dressed with lemon juice. The dietary fiber buffers carbohydrate absorption and creates healthy satiety.

#### 4. Lean Protein Integration
Balance red meat (mutton/beef) by introducing lentils (daal), chickpeas (chana), skinless chicken, and fresh local fish (such as Rohu, Trout, or Pomfret) at least two to three times a week.`,
      category: "LIVE_WELL",
      subCategory: "eat-well",
      tags: "nutrition, diet, diabetes, heart health, desi food, wellness",
      coverImage: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80",
      status: "PUBLISHED",
      readTime: 5,
      authorName: "Dr. Fatima Noor",
      authorRole: "Public Health Specialist",
      reviewerName: "Dr. Ayesha Malik",
      reviewerRole: "Clinical Reviewer",
      references: "Nutrition Division, National Institute of Health Islamabad; Diabetic Association of Pakistan Dietary Recommendations.",
      isFeatured: true,
    },
  });

  await prisma.healthArticle.create({
    data: {
      title: "Essential Antenatal Care: Safe Pregnancy Guide for Expecting Mothers",
      slug: "essential-antenatal-care-safe-pregnancy-pakistan",
      urduTitle: "حمل کی دیکھ بھال: ماؤں کے لیے ضروری طبی رہنما اصول",
      summary: "Crucial trimester-by-trimester milestones, essential ultrasound checks, folic acid supplementation, and warning signs during pregnancy.",
      content: `### Why Comprehensive Antenatal Care Saves Lives

Antenatal care (ANC) is the vital clinical supervision given to pregnant women to ensure the healthiest possible outcome for mother and baby. In Pakistan, attending at least 4 to 8 qualified antenatal consultations dramatically reduces maternal mortality and neonatal complications.

### Core Recommendations by Trimester

#### First Trimester (Weeks 1 to 12)
- **Folic Acid Supplementation:** Take 400 mcg of folic acid daily starting before conception or immediately upon pregnancy confirmation to prevent neural tube defects.
- **Baseline Blood Work:** Complete Blood Count (CBC) to screen for anemia, blood grouping & Rh factor, hepatitis B, hepatitis C, and rubella immunity.
- **Dating Ultrasound:** Confirms viable intrauterine pregnancy and estimated due date.

#### Second Trimester (Weeks 13 to 28)
- **Anomaly Scan (Weeks 18-22):** Detailed fetal anatomical ultrasound performed by a certified sonologist.
- **Oral Glucose Tolerance Test (OGTT at Weeks 24-28):** Essential screening for Gestational Diabetes Mellitus (GDM), which has high prevalence in South Asian pregnancies.
- **Iron and Calcium Supplements:** Daily routine supplementation as advised by your gynecologist.

#### Third Trimester (Weeks 29 to 40)
- Regular blood pressure checks to monitor for Preeclampsia.
- Fetal growth monitoring and position assessment.
- Preparation of safe institutional delivery plans at a verified hospital with neonatal care facilities.`,
      category: "FAMILY_HEALTH",
      subCategory: "pregnancy",
      tags: "pregnancy, maternal health, antenatal, baby, women health",
      coverImage: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&w=1200&q=80",
      status: "PUBLISHED",
      readTime: 7,
      authorName: "Dr. Ayesha Malik",
      authorRole: "Consultant Obstetrician & Gynecologist",
      reviewerName: "Prof. Dr. Tariq Mahmood",
      reviewerRole: "Clinical Review Board",
      references: "Society of Obstetricians & Gynaecologists of Pakistan (SOGP); WHO Maternal Health Guidelines.",
      isFeatured: true,
    },
  });

  // 10. Public Health Announcements
  await prisma.announcement.create({
    data: {
      title: "Public Health Advisory: Seasonal Dengue Vector Control & Free Testing",
      urduTitle: "صحت عامہ کی ہدایت: موسمی ڈینگی کنٹرول اور مفت ٹیسٹ کی سہولت",
      message: "Free CBC and Dengue NS1 testing is active at all designated District Headquarter (DHQ) and Tehsil Headquarter (THQ) hospitals across Punjab, Sindh, and KP. Contact Rescue 1122 or Sehat Helpline (0800-09009) for assistance.",
      urduMessage: "پنجاب، سندھ اور خیبر پختونخوا کے تمام سرکاری ڈی ایچ کیو اور ٹی ایچ کیو ہسپتالوں میں ڈینگی این ایس ون اور سی بی سی ٹیسٹ مفت دستیاب ہیں۔ مدد کے لیے صحت ہیلپ لائن (09009-0800) پر رابطہ کریں۔",
      type: "INFO",
      isActive: true,
      isCritical: false,
      link: "/health/conditions/dengue-fever",
    },
  });

  // 11. Initial Audit Log
  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: "SYSTEM_BOOTSTRAP",
      resource: "DATABASE_INITIALIZATION",
      details: "tandrust.pk core database seeded successfully with authentic clinical information, verified providers, and demonstration records.",
      ipAddress: "127.0.0.1",
    },
  });

  console.log("✅ tandrust.pk database successfully seeded!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
