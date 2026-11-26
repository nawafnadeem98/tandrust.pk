const PAKISTAN_PROVINCES = ["Punjab"];

// Punjab only. Curated list of district headquarters and major towns; verify against an official source before relying on it.
const PAKISTAN_CITIES = ["Lahore", "Faisalabad", "Rawalpindi", "Multan", "Gujranwala", "Sialkot", "Sargodha", "Bahawalpur", "Dera Ghazi Khan", "Sheikhupura", "Rahim Yar Khan", "Gujrat", "Jhelum", "Kasur", "Okara", "Sahiwal", "Khanewal", "Vehari", "Mianwali", "Attock", "Chakwal", "Hafizabad", "Narowal", "Pakpattan", "Toba Tek Singh", "Jhang", "Chiniot", "Khushab", "Bhakkar", "Layyah", "Muzaffargarh", "Lodhran", "Rajanpur", "Bahawalnagar", "Mandi Bahauddin", "Nankana Sahib", "Murree", "Taxila", "Wah Cantonment"];

const EMERGENCY_SERVICES = [
  {
    name: "Rescue 1122",
    number: "1122",
    coverage: "Punjab",
    type: "Ambulance, Fire, Rescue & Disaster Response",
    available: "24/7 Free of Cost",
    description: "Government emergency medical and rescue response team with rapid paramedic transport.",
  },
  {
    name: "Edhi Ambulance Service",
    number: "115",
    coverage: "Nationwide (All Provinces & Remote Areas)",
    type: "Emergency Patient Transport & Air Ambulance",
    available: "24/7 Nationwide",
    description: "The world's largest volunteer ambulance fleet operating across every city, highway, and rural district.",
  },
  {
    name: "National Polio Eradication Helpline",
    number: "1166",
    coverage: "Nationwide (Toll Free)",
    type: "EPI Vaccines, Polio Drops & Immunization Reports",
    available: "08:00 AM - 10:00 PM Daily",
    description: "Official government helpline for requesting routine childhood vaccines and reporting missed vaccine rounds.",
  },
  {
    name: "Sehat Sahulat Program Helpline",
    number: "0800-09009",
    coverage: "Eligible Citizens Across Pakistan (Toll Free)",
    type: "Qaumi Sehat Card & Hospital Empanelment Inquiries",
    available: "24/7 Inquiries",
    description: "Information regarding free inpatient hospitalization benefits, empanelled private hospitals, and card activation.",
  },
  {
    name: "Umang Mental Health Helpline",
    number: "0311-7786264",
    coverage: "Nationwide Support",
    type: "Mental Health Crisis & Suicide Prevention",
    available: "24/7 Confidential",
    description: "Free, confidential clinical psychological counseling and crisis de-escalation by accredited clinical psychologists.",
  },
];

const HEALTHCARE_SPECIALTIES = [
  "Cardiology",
  "General Medicine",
  "Pediatrics & Child Health",
  "Gynecology & Obstetrics",
  "Dermatology",
  "Orthopedic Surgery",
  "Neurology & Neurosurgery",
  "Psychiatry & Mental Health",
  "Gastroenterology",
  "Pulmonology & Respiratory",
  "Dentistry",
  "Ophthalmology (Eye Care)",
  "Urology",
  "ENT (Ear, Nose & Throat)",
  "Physiotherapy & Rehabilitation",
];

module.exports = {
  PAKISTAN_PROVINCES,
  PAKISTAN_CITIES,
  EMERGENCY_SERVICES,
  HEALTHCARE_SPECIALTIES,
};
