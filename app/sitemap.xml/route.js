import { NextResponse } from "next/server";
const { prisma } = require("@/lib/prisma");

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tandrust.pk";

  const staticUrls = [
    "",
    "/health",
    "/health/conditions",
    "/health/symptoms",
    "/health/tests-and-treatments",
    "/medicines",
    "/services",
    "/services/doctors",
    "/services/hospitals",
    "/services/laboratories",
    "/services/pharmacies",
    "/services/telehealth",
    "/appointments",
    "/live-well",
    "/family-health",
    "/emergency",
    "/health-news",
    "/about",
    "/editorial-policy",
    "/medical-review-policy",
    "/provider-verification",
    "/privacy",
    "/terms",
    "/accessibility",
    "/contact",
    "/feedback",
    "/sitemap",
  ];

  try {
    const [conditions, medicines, articles, doctors] = await Promise.all([
      prisma.condition.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.medicine.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.healthArticle.findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
      }),
      prisma.provider.findMany({
        where: { isVerified: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    for (const path of staticUrls) {
      xml += `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <changefreq>daily</changefreq>\n    <priority>${path === "" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
    }

    // Dynamic Conditions
    for (const c of conditions) {
      xml += `  <url>\n    <loc>${baseUrl}/health/conditions/${c.slug}</loc>\n    <lastmod>${c.updatedAt.toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }

    // Dynamic Medicines
    for (const m of medicines) {
      xml += `  <url>\n    <loc>${baseUrl}/medicines/${m.slug}</loc>\n    <lastmod>${m.updatedAt.toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }

    // Dynamic Articles
    for (const a of articles) {
      xml += `  <url>\n    <loc>${baseUrl}/live-well/${a.slug}</loc>\n    <lastmod>${a.updatedAt.toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    // Dynamic Doctors
    for (const d of doctors) {
      xml += `  <url>\n    <loc>${baseUrl}/services/${d.slug}</loc>\n    <lastmod>${d.updatedAt.toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    xml += `</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    return new Response("Error generating sitemap", { status: 500 });
  }
}
