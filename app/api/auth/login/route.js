import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { comparePassword, signToken, COOKIE_NAME } = require("@/lib/auth");
const { loginSchema } = require("@/lib/validations");
const { logAudit } = require("@/lib/audit");

export async function POST(request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Invalid input" },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        profile: true,
        provider: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: "This account has been deactivated. Please contact support." },
        { status: 403 }
      );
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    await logAudit({
      userId: user.id,
      action: "USER_LOGIN",
      resource: "AUTH",
      details: `Successful login for ${user.email}`,
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    const { passwordHash: _, ...safeUser } = user;

    const response = NextResponse.json(
      { success: true, message: "Signed in successfully", user: safeUser },
      { status: 200 }
    );

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
