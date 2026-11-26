import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireAuth } = require("@/lib/auth");

export async function GET(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const family = await prisma.familyProfile.findMany({
      where: { userId: auth.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ family });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load family members" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const { name, relationship, gender, bloodGroup, notes } = body;

    if (!name || !relationship) {
      return NextResponse.json(
        { error: "Name and relationship are required" },
        { status: 400 }
      );
    }

    const member = await prisma.familyProfile.create({
      data: {
        userId: auth.user.id,
        name,
        relationship,
        gender: gender || null,
        bloodGroup: bloodGroup || null,
        notes: notes || null,
      },
    });

    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add family member" }, { status: 500 });
  }
}
