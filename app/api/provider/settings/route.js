import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireAuth } = require("@/lib/auth");
const { logAudit } = require("@/lib/audit");

export async function PUT(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { user } = auth;
    if (user.role !== "PROVIDER" && !["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
      return NextResponse.json({ error: "Only healthcare providers can update practice settings" }, { status: 403 });
    }

    const body = await request.json();
    const { consultationFee, clinicAddress, isTelehealthActive, phone } = body;

    const provider = await prisma.provider.findFirst({
      where: { userId: user.id },
    });

    if (!provider) {
      return NextResponse.json({ error: "Provider profile not found" }, { status: 404 });
    }

    const updatedProvider = await prisma.provider.update({
      where: { id: provider.id },
      data: {
        ...(consultationFee !== undefined ? { consultationFee: Number(consultationFee) } : {}),
        ...(clinicAddress ? { clinicAddress } : {}),
        ...(phone ? { phone } : {}),
      },
    });

    await logAudit({
      userId: user.id,
      action: "PRACTICE_SETTINGS_UPDATED",
      resource: "PROVIDER",
      details: { providerId: provider.id, updatedFields: Object.keys(body) },
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    return NextResponse.json({
      success: true,
      message: "Practice settings updated successfully",
      provider: updatedProvider,
    });
  } catch (error) {
    console.error("Provider settings update error:", error);
    return NextResponse.json({ error: "Failed to update practice settings" }, { status: 500 });
  }
}
