import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://tandrust.pk";

  const robots = `# tandrust.pk - Robots.txt
User-agent: *
Allow: /
Disallow: /admin
Disallow: /my-account
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
