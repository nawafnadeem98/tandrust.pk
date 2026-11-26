import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireRole } = require("@/lib/auth");

export async function GET(request) {
  try {
    const auth = await requireRole(request, ["ADMIN", "SUPER_ADMIN", "CONTENT_EDITOR", "CLINICAL_REVIEWER"]);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const [
      totalUsers,
      totalProviders,
      pendingProviders,
      totalAppointments,
      totalArticles,
      pendingFeedback,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.provider.count(),
      prisma.provider.count({ where: { verificationStatus: "PENDING" } }),
      prisma.appointment.count(),
      prisma.healthArticle.count(),
      prisma.feedbackSubmission.count({ where: { status: "PENDING" } }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true, email: true, role: true } } },
      }),
    ]);

    return NextResponse.json({
      metrics: {
        totalUsers,
        totalProviders,
        pendingProviders,
        totalAppointments,
        totalArticles,
        pendingFeedback,
      },
      recentAuditLogs,
    });
  } catch (error) {
    console.error("Admin metrics error:", error);
    return NextResponse.json({ error: "Failed to load metrics" }, { status: 500 });
  }
}
