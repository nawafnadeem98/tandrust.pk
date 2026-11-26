import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import TelehealthRoomClient from "@/components/telehealth/TelehealthRoomClient";
const { prisma } = require("@/lib/prisma");

export const revalidate = 0; // Dynamic

export default async function TelehealthRoomPage({ params }) {
  const appointment = await prisma.appointment.findUnique({
    where: { id: params.id },
    include: {
      provider: true,
      patient: { select: { id: true, name: true, email: true } },
    },
  });

  if (!appointment) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/telehealth" className="hover:text-brand-teal transition-colors">Telehealth</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-brand-navy font-semibold truncate">Consultation Room</span>
      </nav>

      {/* Interactive Telehealth Client */}
      <TelehealthRoomClient appointment={appointment} />
    </div>
  );
}
