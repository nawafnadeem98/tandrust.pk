const { test, describe, before, after } = require("node:test");
const assert = require("node:assert");
const { prisma } = require("../lib/prisma");

describe("Database & Appointment Conflict Prevention Tests", () => {
  let provider;
  let patient;
  const testDate = "2026-12-25";
  const testSlot = "11:00 AM";

  before(async () => {
    // Retrieve seeded provider and patient
    provider = await prisma.provider.findFirst({ where: { isVerified: true } });
    patient = await prisma.user.findFirst({ where: { role: "PATIENT" } });

    assert.ok(provider, "Provider should exist in database");
    assert.ok(patient, "Patient should exist in database");

    // Clean any previous test bookings
    await prisma.appointment.deleteMany({
      where: {
        providerId: provider.id,
        date: testDate,
        timeSlot: testSlot,
      },
    });
  });

  after(async () => {
    // Clean up test bookings
    if (provider) {
      await prisma.appointment.deleteMany({
        where: {
          providerId: provider.id,
          date: testDate,
          timeSlot: testSlot,
        },
      });
    }
    await prisma.$disconnect();
  });

  test("Allows booking an open appointment slot", async () => {
    const booking = await prisma.appointment.create({
      data: {
        patientId: patient.id,
        providerId: provider.id,
        serviceName: "Routine Consultation",
        date: testDate,
        timeSlot: testSlot,
        patientName: "Test Patient",
        patientPhone: "+92 300 0000000",
        patientEmail: "testpatient@tandrust.pk",
        status: "CONFIRMED",
        fee: provider.consultationFee,
      },
    });

    assert.ok(booking.id);
    assert.strictEqual(booking.date, testDate);
    assert.strictEqual(booking.timeSlot, testSlot);
  });

  test("Strictly prevents duplicate double-booking for the same provider, date, and time slot", async () => {
    // Attempt to book the exact same slot
    let conflictError = null;

    try {
      await prisma.appointment.create({
        data: {
          patientId: patient.id,
          providerId: provider.id,
          serviceName: "Second Conflicting Booking",
          date: testDate,
          timeSlot: testSlot,
          patientName: "Another Patient",
          patientPhone: "+92 321 0000000",
          patientEmail: "another@tandrust.pk",
          status: "CONFIRMED",
          fee: provider.consultationFee,
        },
      });
    } catch (err) {
      conflictError = err;
    }

    assert.ok(conflictError, "Database constraint or check must reject duplicate slot booking");
    assert.match(conflictError.message, /unique|Unique constraint failed/i);
  });
});
