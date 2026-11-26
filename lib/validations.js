const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  phone: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  language: z.enum(["en", "ur"]).default("en"),
  role: z.enum(["PATIENT", "PROVIDER"]).default("PATIENT"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const appointmentBookingSchema = z.object({
  providerId: z.string().uuid("Invalid provider ID"),
  facilityId: z.string().uuid("Invalid facility ID").optional().nullable(),
  serviceName: z.string().min(2, "Service name required").default("Consultation"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  timeSlot: z.string().min(2, "Time slot is required"),
  patientName: z.string().min(2, "Patient name required"),
  patientPhone: z.string().min(8, "Valid phone number required"),
  patientEmail: z.string().email("Valid email required"),
  notes: z.string().max(500).optional(),
  isTelehealth: z.boolean().default(false),
});

const appointmentUpdateSchema = z.object({
  status: z.enum(["SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED", "RESCHEDULED"]),
  cancellationReason: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  timeSlot: z.string().optional(),
});

const feedbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  category: z.enum(["CONTENT_ACCURACY", "BUG", "SUGGESTION", "PROVIDER_REPORT"]).default("SUGGESTION"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
  rating: z.number().int().min(1).max(5).default(5),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Valid slug is required"),
  urduTitle: z.string().optional(),
  summary: z.string().min(10, "Summary is required"),
  urduSummary: z.string().optional(),
  content: z.string().min(20, "Content must be detailed"),
  category: z.enum(["LIVE_WELL", "FAMILY_HEALTH", "CONDITIONS", "NEWS"]).default("LIVE_WELL"),
  subCategory: z.string().optional(),
  tags: z.string().optional(),
  coverImage: z.string().url("Must be a valid image URL").optional().or(z.literal("")),
  status: z.enum(["DRAFT", "IN_REVIEW", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  authorName: z.string().min(2).default("tandrust.pk Editorial"),
  reviewerName: z.string().min(2).default("Clinical Review Board"),
  isFeatured: z.boolean().default(false),
});

const providerApplicationSchema = z.object({
  title: z.string().default("Dr."),
  fullName: z.string().min(3, "Full name is required"),
  pmcNumber: z.string().min(4, "PMC / PMDC registration number is required"),
  specialty: z.string().min(2, "Specialty is required"),
  subSpecialties: z.string().optional(),
  experienceYears: z.number().int().min(0).max(60).default(1),
  qualifications: z.string().min(2, "Qualifications required (e.g. MBBS, FCPS)"),
  bio: z.string().min(20, "Please provide a professional bio of at least 20 characters"),
  consultationFee: z.number().int().min(0).max(100000).default(1500),
  clinicAddress: z.string().min(5, "Clinic or hospital address required"),
  area: z.string().min(2, "Area is required"),
  city: z.string().min(2, "City is required"),
  province: z.string().min(2, "Province is required"),
  phone: z.string().min(8, "Contact phone is required"),
  email: z.string().email("Professional email is required"),
  telehealthEnabled: z.boolean().default(true),
});

const patientDocumentSchema = z.object({
  title: z.string().min(2, "Document title is required"),
  category: z.enum(["LAB_REPORT", "PRESCRIPTION", "DISCHARGE_SUMMARY", "IMAGING"]).default("LAB_REPORT"),
  fileType: z.string().default("application/pdf"),
  fileSize: z.number().int().max(15000000, "File size must be below 15MB").default(100000),
  fileName: z.string().min(1, "File name required"),
  notes: z.string().optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  appointmentBookingSchema,
  appointmentUpdateSchema,
  feedbackSchema,
  contactSchema,
  articleSchema,
  providerApplicationSchema,
  patientDocumentSchema,
};
