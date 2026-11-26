import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import BookingForm from "@/components/providers/BookingForm";
const { prisma } = require("@/lib/prisma");

export const revalidate = 0; // Dynamic

export default async function BookByProviderIdPage({ params }) {
  const provider = await prisma.provider.findUnique({
    where: { id: params.providerId },
    include: { facility: true },
  });

  if (!provider) notFound();

  // Redirect to friendly slug URL or render directly
  redirect(`/services/${provider.slug}`);
}
