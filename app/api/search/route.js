import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").trim();
    const type = searchParams.get("type") || "all";
    const city = searchParams.get("city") || "";

    if (!q || q.length < 2) {
      return NextResponse.json({
        query: q,
        total: 0,
        results: {
          conditions: [],
          medicines: [],
          symptoms: [],
          providers: [],
          facilities: [],
          articles: [],
        },
      });
    }

    const searchQuery = { contains: q, mode: "insensitive" };

    const results = {
      conditions: [],
      medicines: [],
      symptoms: [],
      providers: [],
      facilities: [],
      articles: [],
    };

    if (type === "all" || type === "conditions") {
      results.conditions = await prisma.condition.findMany({
        where: {
          OR: [
            { name: searchQuery },
            { overview: searchQuery },
            { category: searchQuery },
          ],
        },
        select: { id: true, name: true, slug: true, category: true, overview: true },
        take: 5,
      });
    }

    if (type === "all" || type === "medicines") {
      results.medicines = await prisma.medicine.findMany({
        where: {
          OR: [
            { name: searchQuery },
            { genericName: searchQuery },
            { brandNames: searchQuery },
            { category: searchQuery },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          genericName: true,
          brandNames: true,
          category: true,
        },
        take: 5,
      });
    }

    if (type === "all" || type === "symptoms") {
      results.symptoms = await prisma.symptom.findMany({
        where: {
          OR: [
            { name: searchQuery },
            { description: searchQuery },
            { commonCauses: searchQuery },
          ],
        },
        select: {
          id: true,
          name: true,
          slug: true,
          urgencyLevel: true,
          description: true,
        },
        take: 5,
      });
    }

    if (type === "all" || type === "providers") {
      const providerWhere = {
        AND: [
          city ? { city: { equals: city, mode: "insensitive" } } : {},
          {
            OR: [
              { fullName: searchQuery },
              { specialty: searchQuery },
              { clinicAddress: searchQuery },
            ],
          },
        ],
      };

      results.providers = await prisma.provider.findMany({
        where: providerWhere,
        select: {
          id: true,
          title: true,
          fullName: true,
          slug: true,
          specialty: true,
          city: true,
          consultationFee: true,
          rating: true,
          clinicAddress: true,
        },
        take: 5,
      });
    }

    if (type === "all" || type === "facilities") {
      const facilityWhere = {
        AND: [
          city ? { city: { equals: city, mode: "insensitive" } } : {},
          {
            OR: [
              { name: searchQuery },
              { type: { in: Object.values(prisma.FacilityType || {}) } },
              { address: searchQuery },
              { area: searchQuery },
            ],
          },
        ],
      };

      results.facilities = await prisma.facility.findMany({
        where: {
          OR: [
            { name: searchQuery },
            { address: searchQuery },
            { area: searchQuery },
          ],
          ...(city ? { city: { equals: city, mode: "insensitive" } } : {}),
        },
        select: {
          id: true,
          name: true,
          slug: true,
          type: true,
          city: true,
          area: true,
          phone: true,
        },
        take: 5,
      });
    }

    if (type === "all" || type === "articles") {
      results.articles = await prisma.healthArticle.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: searchQuery },
            { summary: searchQuery },
            { tags: searchQuery },
          ],
        },
        select: {
          id: true,
          title: true,
          slug: true,
          category: true,
          summary: true,
          readTime: true,
        },
        take: 5,
      });
    }

    const total =
      results.conditions.length +
      results.medicines.length +
      results.symptoms.length +
      results.providers.length +
      results.facilities.length +
      results.articles.length;

    return NextResponse.json({
      query: q,
      total,
      results,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Error executing search" },
      { status: 500 }
    );
  }
}
