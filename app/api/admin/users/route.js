import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireRole } = require("@/lib/auth");
const { logAudit } = require("@/lib/audit");

export async function GET(request) {
  try {
    const auth = await requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";

    const where = {
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(role ? { role } : {}),
    };

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        city: true,
        province: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load users" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const auth = await requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const { userId, role, isActive } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(role ? { role } : {}),
        ...(typeof isActive === "boolean" ? { isActive } : {}),
      },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });

    await logAudit({
      userId: auth.user.id,
      action: "USER_MODIFIED",
      resource: "USER",
      details: { modifiedUserId: userId, role, isActive },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
