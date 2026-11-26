"use client";

import React from "react";
import Link from "next/link";

// Official logo image supplied by the site owner (do not redraw).
export default function Logo({ size = "normal" }) {
  return (
    <Link
      href="/"
      className="flex items-center group focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2 rounded-lg"
      aria-label="tandrust - Home"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/tandrust-logo.png"
        alt="tandrust.pk"
        className={`w-auto rounded-lg ${size === "large" ? "h-14" : "h-10 sm:h-11"}`}
      />
    </Link>
  );
}
