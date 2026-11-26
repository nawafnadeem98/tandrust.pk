import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireAuth } = require("@/lib/auth");
const { logAudit } = require("@/lib/audit");

export async function GET(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.user.id },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { passwordHash, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const {
      name,
      phone,
      city,
      province,
      bloodGroup,
      gender,
      address,
      emergencyContact,
      allergies,
      chronicConditions,
      notificationEmail,
      notificationSms,
    } = body;

    const updatedUser = await prisma.user.update({
      where: { id: auth.user.id },
      data: {
        ...(name ? { name } : {}),
        ...(phone ? { phone } : {}),
        ...(city ? { city } : {}),
        ...(province ? { province } : {}),
        profile: {
          upsert: {
            create: {
              gender: gender || null,
              bloodGroup: bloodGroup || null,
              address: address || null,
              emergencyContact: emergencyContact || null,
              allergies: allergies || null,
              chronicConditions: chronicConditions || null,
              notificationEmail: notificationEmail ?? true,
              notificationSms: notificationSms ?? false,
            },
            update: {
              gender: gender !== undefined ? gender : undefined,
              bloodGroup: bloodGroup !== undefined ? bloodGroup : undefined,
              address: address !== undefined ? address : undefined,
              emergencyContact: emergencyContact !== undefined ? emergencyContact : undefined,
              allergies: allergies !== undefined ? allergies : undefined,
              chronicConditions: chronicConditions !== undefined ? chronicConditions : undefined,
              notificationEmail: notificationEmail !== undefined ? notificationEmail : undefined,
              notificationSms: notificationSms !== undefined ? notificationSms : undefined,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    await logAudit({
      userId: auth.user.id,
      action: "PROFILE_UPDATED",
      resource: "USER_PROFILE",
      details: { updatedFields: Object.keys(body) },
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    const { passwordHash, ...safeUser } = updatedUser;
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
