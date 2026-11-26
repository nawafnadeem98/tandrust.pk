import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { contactSchema } = require("@/lib/validations");

export async function POST(request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = result.data;

    const requestRecord = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. Our clinical and support desks will respond within 24-48 business hours.",
        requestId: requestRecord.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact request error:", error);
    return NextResponse.json(
      { error: "Failed to submit request" },
      { status: 500 }
    );
  }
}
