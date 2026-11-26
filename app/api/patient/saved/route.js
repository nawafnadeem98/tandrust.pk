import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");
const { requireAuth } = require("@/lib/auth");

export async function GET(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const [savedArticles, savedProviders] = await Promise.all([
      prisma.savedArticle.findMany({
        where: { userId: auth.user.id },
        include: { article: true },
      }),
      prisma.savedProvider.findMany({
        where: { userId: auth.user.id },
        include: { provider: true },
      }),
    ]);

    return NextResponse.json({ savedArticles, savedProviders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load saved items" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const auth = await requireAuth(request);
    if (auth.error) return NextResponse.json({ error: auth.error }, { status: auth.status });

    const body = await request.json();
    const { type, id } = body; // type = "article" | "provider"

    if (type === "article") {
      const existing = await prisma.savedArticle.findUnique({
        where: {
          userId_articleId: {
            userId: auth.user.id,
            articleId: id,
          },
        },
      });

      if (existing) {
        await prisma.savedArticle.delete({
          where: { id: existing.id },
        });
        return NextResponse.json({ saved: false });
      } else {
        await prisma.savedArticle.create({
          data: { userId: auth.user.id, articleId: id },
        });
        return NextResponse.json({ saved: true });
      }
    } else if (type === "provider") {
      const existing = await prisma.savedProvider.findUnique({
        where: {
          userId_providerId: {
            userId: auth.user.id,
            providerId: id,
          },
        },
      });

      if (existing) {
        await prisma.savedProvider.delete({
          where: { id: existing.id },
        });
        return NextResponse.json({ saved: false });
      } else {
        await prisma.savedProvider.create({
          data: { userId: auth.user.id, providerId: id },
        });
        return NextResponse.json({ saved: true });
      }
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update saved item" }, { status: 500 });
  }
}
