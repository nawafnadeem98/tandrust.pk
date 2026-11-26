import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { feedbackSchema } = require("@/lib/validations");

export async function POST(request) {
  try {
    const body = await request.json();
    const result = feedbackSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const { name, email, category, message, rating } = result.data;

    const feedback = await prisma.feedbackSubmission.create({
      data: {
        name,
        email,
        category,
        message,
        rating,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for helping us improve tandrust.pk. Our editorial team reviews all submissions.",
        feedbackId: feedback.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );
  }
}
