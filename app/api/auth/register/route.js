import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { hashPassword, signToken, COOKIE_NAME } = require("@/lib/auth");
const { registerSchema } = require("@/lib/validations");
const { logAudit } = require("@/lib/audit");

export async function POST(request) {
  try {
    const body = await request.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, password, phone, city, province, language, role } = result.data;

    // Check if email already registered
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user and profile transactionally
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        phone: phone || null,
        city: city || null,
        province: province || null,
        language,
        role: role === "PROVIDER" ? "PROVIDER" : "PATIENT",
        profile: {
          create: {},
        },
        consents: {
          create: [
            {
              consentType: "TERMS_AND_PRIVACY",
              granted: true,
              ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
              userAgent: request.headers.get("user-agent"),
            },
          ],
        },
      },
      include: {
        profile: true,
      },
    });

    // Create JWT token
    const token = await signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await logAudit({
      userId: user.id,
      action: "USER_REGISTERED",
      resource: "USER",
      details: `User registered with role ${user.role}`,
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    const { passwordHash: _, ...safeUser } = user;

    const response = NextResponse.json(
      { success: true, message: "Account created successfully", user: safeUser },
      { status: 201 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
