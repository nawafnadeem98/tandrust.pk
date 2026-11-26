import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireRole } = require("@/lib/auth");
const { articleSchema } = require("@/lib/validations");
const { logAudit } = require("@/lib/audit");

export async function GET(request) {
  try {
    const articles = await prisma.healthArticle.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ articles });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load articles" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = await requireRole(request, ["ADMIN", "SUPER_ADMIN", "CONTENT_EDITOR", "CLINICAL_REVIEWER"]);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const result = articleSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }

    const {
      title,
      slug,
      urduTitle,
      summary,
      urduSummary,
      content,
      category,
      subCategory,
      tags,
      coverImage,
      status,
      authorName,
      reviewerName,
      isFeatured,
    } = result.data;

    // Check slug collision
    const existing = await prisma.healthArticle.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An article with this URL slug already exists." },
        { status: 409 }
      );
    }

    const article = await prisma.healthArticle.create({
      data: {
        title,
        slug,
        urduTitle: urduTitle || null,
        summary,
        urduSummary: urduSummary || null,
        content,
        category,
        subCategory: subCategory || null,
        tags: tags || null,
        coverImage: coverImage || null,
        status,
        authorName,
        reviewerName,
        isFeatured,
      },
    });

    await logAudit({
      userId: auth.user.id,
      action: "ARTICLE_CREATED",
      resource: "ARTICLE",
      details: { articleId: article.id, title, slug, status },
    });

    return NextResponse.json({ success: true, article }, { status: 201 });
  } catch (error) {
    console.error("Create article error:", error);
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const auth = await requireRole(request, ["ADMIN", "SUPER_ADMIN", "CONTENT_EDITOR", "CLINICAL_REVIEWER"]);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) return NextResponse.json({ error: "Article ID is required" }, { status: 400 });

    const updated = await prisma.healthArticle.update({
      where: { id },
      data,
    });

    await logAudit({
      userId: auth.user.id,
      action: "ARTICLE_UPDATED",
      resource: "ARTICLE",
      details: { articleId: id, status: updated.status },
    });

    return NextResponse.json({ success: true, article: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const auth = await requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Article ID is required" }, { status: 400 });

    await prisma.healthArticle.delete({ where: { id } });

    await logAudit({
      userId: auth.user.id,
      action: "ARTICLE_DELETED",
      resource: "ARTICLE",
      details: { articleId: id },
    });

    return NextResponse.json({ success: true, message: "Article deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
