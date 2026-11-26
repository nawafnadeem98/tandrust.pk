import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireRole } = require("@/lib/auth");
const { logAudit } = require("@/lib/audit");

export async function GET(request) {
  try {
    const auth = await requireRole(request, ["ADMIN", "SUPER_ADMIN", "PROVIDER_STAFF"]);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const providers = await prisma.provider.findMany({
      include: {
        facility: { select: { name: true, city: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ providers });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load providers" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const auth = await requireRole(request, ["ADMIN", "SUPER_ADMIN", "PROVIDER_STAFF"]);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const { providerId, verificationStatus, verificationNotes } = body;

    if (!providerId || !verificationStatus) {
      return NextResponse.json(
        { error: "Provider ID and verificationStatus are required" },
        { status: 400 }
      );
    }

    const isVerified = verificationStatus === "APPROVED";

    const updated = await prisma.provider.update({
      where: { id: providerId },
      data: {
        verificationStatus,
        isVerified,
        verificationNotes: verificationNotes || null,
      },
    });

    await logAudit({
      userId: auth.user.id,
      action: `PROVIDER_STATUS_${verificationStatus}`,
      resource: "PROVIDER",
      details: { providerId, status: verificationStatus, notes: verificationNotes },
    });

    return NextResponse.json({ success: true, provider: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update provider status" }, { status: 500 });
  }
}
