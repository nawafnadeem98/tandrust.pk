import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { getSessionUser, requireAuth } = require("@/lib/auth");
const { appointmentBookingSchema } = require("@/lib/validations");
const { logAudit } = require("@/lib/audit");

export async function GET(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { user } = auth;
    let appointments = [];

    if (user.role === "PATIENT") {
      appointments = await prisma.appointment.findMany({
        where: { patientId: user.id },
        include: {
          provider: {
            select: {
              id: true,
              fullName: true,
              title: true,
              specialty: true,
              city: true,
              clinicAddress: true,
              phone: true,
            },
          },
          facility: {
            select: {
              id: true,
              name: true,
              address: true,
              city: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } else if (user.role === "PROVIDER") {
      // Find provider record for this user
      const provider = await prisma.provider.findFirst({
        where: { userId: user.id },
      });

      if (!provider) {
        return NextResponse.json({ appointments: [] });
      }

      appointments = await prisma.appointment.findMany({
        where: { providerId: provider.id },
        include: {
          patient: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
        orderBy: { date: "asc" },
      });
    } else if (["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
      appointments = await prisma.appointment.findMany({
        include: {
          patient: { select: { id: true, name: true, email: true } },
          provider: { select: { id: true, fullName: true, specialty: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      });
    }

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Fetch appointments error:", error);
    return NextResponse.json(
      { error: "Failed to load appointments" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { user } = auth;
    const body = await request.json();

    const result = appointmentBookingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const {
      providerId,
      facilityId,
      serviceName,
      date,
      timeSlot,
      patientName,
      patientPhone,
      patientEmail,
      notes,
      isTelehealth,
    } = result.data;

    // Verify provider exists
    const provider = await prisma.provider.findUnique({
      where: { id: providerId },
    });

    if (!provider) {
      return NextResponse.json(
        { error: "The requested healthcare provider was not found." },
        { status: 404 }
      );
    }

    // Atomic transaction checking double booking and inserting
    const newAppointment = await prisma.$transaction(async (tx) => {
      // Check for conflicting active booking for same provider, date and time
      const existingConflict = await tx.appointment.findFirst({
        where: {
          providerId,
          date,
          timeSlot,
          status: { notIn: ["CANCELLED"] },
        },
      });

      if (existingConflict) {
        throw new Error(
          `This time slot (${timeSlot} on ${date}) is already booked. Please choose another time.`
        );
      }

      const appointment = await tx.appointment.create({
        data: {
          patientId: user.id,
          providerId,
          facilityId: facilityId || provider.facilityId || null,
          serviceName,
          date,
          timeSlot,
          patientName,
          patientPhone,
          patientEmail,
          notes: notes || null,
          fee: provider.consultationFee,
          isTelehealth,
          telehealthLink: isTelehealth
            ? `https://telehealth.tandrust.pk/room/${providerId.slice(0, 8)}-${Date.now().toString(36)}`
            : null,
          status: "CONFIRMED",
        },
        include: {
          provider: true,
          facility: true,
        },
      });

      // Create notification for patient
      await tx.notification.create({
        data: {
          userId: user.id,
          title: "Appointment Confirmed",
          message: `Your appointment with ${provider.title} ${provider.fullName} on ${date} at ${timeSlot} is confirmed.`,
          type: "APPOINTMENT",
          link: `/appointments/confirmation/${appointment.id}`,
        },
      });

      return appointment;
    });

    await logAudit({
      userId: user.id,
      action: "APPOINTMENT_BOOKED",
      resource: "APPOINTMENT",
      details: {
        appointmentId: newAppointment.id,
        provider: provider.fullName,
        date,
        timeSlot,
      },
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Appointment booked successfully",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to book appointment" },
      { status: 409 }
    );
  }
}

// Reschedule or Cancel
export async function PATCH(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { user } = auth;
    const body = await request.json();
    const { appointmentId, action, date, timeSlot, cancellationReason } = body;

    if (!appointmentId) {
      return NextResponse.json(
        { error: "Appointment ID is required" },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Authorization check: patient or provider or admin
    const isOwner = appointment.patientId === user.id;
    const isProvider = user.role === "PROVIDER";
    const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(user.role);

    if (!isOwner && !isProvider && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (action === "CONFIRM") {
      const updated = await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "CONFIRMED" },
      });
      return NextResponse.json({
        success: true,
        message: "Appointment confirmed successfully",
        appointment: updated,
      });
    }

    if (action === "COMPLETE") {
      const updated = await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "COMPLETED" },
      });
      return NextResponse.json({
        success: true,
        message: "Consultation marked as completed",
        appointment: updated,
      });
    }

    if (action === "CANCEL") {
      const updated = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          status: "CANCELLED",
          cancellationReason: cancellationReason || "Cancelled by user",
        },
      });

      await logAudit({
        userId: user.id,
        action: "APPOINTMENT_CANCELLED",
        resource: "APPOINTMENT",
        details: { appointmentId, reason: cancellationReason },
      });

      return NextResponse.json({
        success: true,
        message: "Appointment cancelled successfully",
        appointment: updated,
      });
    }

    if (action === "RESCHEDULE") {
      if (!date || !timeSlot) {
        return NextResponse.json(
          { error: "New date and timeSlot are required for rescheduling" },
          { status: 400 }
        );
      }

      // Check slot conflict
      const conflict = await prisma.appointment.findFirst({
        where: {
          providerId: appointment.providerId,
          date,
          timeSlot,
          id: { not: appointmentId },
          status: { notIn: ["CANCELLED"] },
        },
      });

      if (conflict) {
        return NextResponse.json(
          { error: `Slot ${timeSlot} on ${date} is already taken.` },
          { status: 409 }
        );
      }

      const updated = await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          date,
          timeSlot,
          status: "RESCHEDULED",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Appointment rescheduled successfully",
        appointment: updated,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Appointment update error:", error);
    return NextResponse.json(
      { error: "Failed to update appointment" },
      { status: 500 }
    );
  }
}
