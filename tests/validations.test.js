const { test, describe } = require("node:test");
const assert = require("node:assert");
const {
  registerSchema,
  loginSchema,
  appointmentBookingSchema,
  feedbackSchema,
} = require("../lib/validations");

describe("Validation Schemas Tests", () => {
  test("registerSchema succeeds with valid data", () => {
    const valid = {
      name: "Muhammad Ali",
      email: "ali@example.com",
      password: "Password123",
      phone: "+92 300 1234567",
      city: "Lahore",
      province: "Punjab",
      language: "en",
      role: "PATIENT",
    };
    const res = registerSchema.safeParse(valid);
    assert.strictEqual(res.success, true);
  });

  test("registerSchema fails with weak password (missing number)", () => {
    const invalid = {
      name: "Ali",
      email: "ali@example.com",
      password: "PasswordOnly",
    };
    const res = registerSchema.safeParse(invalid);
    assert.strictEqual(res.success, false);
    assert.match(res.error.errors[0].message, /number/i);
  });

  test("registerSchema fails with invalid email format", () => {
    const invalid = {
      name: "Ali",
      email: "not-an-email",
      password: "Password123",
    };
    const res = registerSchema.safeParse(invalid);
    assert.strictEqual(res.success, false);
    assert.match(res.error.errors[0].message, /invalid email/i);
  });

  test("appointmentBookingSchema succeeds with valid parameters", () => {
    const valid = {
      providerId: "a0000000-0000-0000-0000-000000000001",
      date: "2026-11-20",
      timeSlot: "11:30 AM",
      patientName: "Ayesha Khan",
      patientPhone: "+92 321 9876543",
      patientEmail: "ayesha@example.com",
      isTelehealth: false,
    };
    const res = appointmentBookingSchema.safeParse(valid);
    assert.strictEqual(res.success, true);
  });

  test("appointmentBookingSchema rejects invalid date format", () => {
    const invalid = {
      providerId: "a0000000-0000-0000-0000-000000000001",
      date: "20-11-2026", // Wrong format
      timeSlot: "11:30 AM",
      patientName: "Ayesha Khan",
      patientPhone: "+92 321 9876543",
      patientEmail: "ayesha@example.com",
    };
    const res = appointmentBookingSchema.safeParse(invalid);
    assert.strictEqual(res.success, false);
    assert.match(res.error.errors[0].message, /YYYY-MM-DD/i);
  });

  test("feedbackSchema enforces minimum message length", () => {
    const invalid = {
      name: "Citizen",
      email: "citizen@example.pk",
      category: "BUG",
      message: "short", // Under 10 characters
      rating: 5,
    };
    const res = feedbackSchema.safeParse(invalid);
    assert.strictEqual(res.success, false);
  });
});
