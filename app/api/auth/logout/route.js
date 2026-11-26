import { NextResponse } from "next/server";
const { COOKIE_NAME } = require("@/lib/auth");

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Signed out successfully",
  });

  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
