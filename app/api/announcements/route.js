import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return NextResponse.json({ announcements });
  } catch (error) {
    return NextResponse.json({ announcements: [] }, { status: 500 });
  }
}
