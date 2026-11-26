import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireAuth } = require("@/lib/auth");
const { patientDocumentSchema } = require("@/lib/validations");

export async function GET(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const documents = await prisma.patientDocument.findMany({
      where: { userId: auth.user.id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ documents });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load documents" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const result = patientDocumentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { title, category, fileType, fileSize, fileName, notes } = result.data;

    const doc = await prisma.patientDocument.create({
      data: {
        userId: auth.user.id,
        title,
        category,
        fileType,
        fileSize,
        fileName,
        notes: notes || null,
        isPrivate: true,
      },
    });

    return NextResponse.json({ success: true, document: doc }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload document" }, { status: 500 });
  }
}
