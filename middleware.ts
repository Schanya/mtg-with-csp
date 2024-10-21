import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const ip = request.ip || "0.0.0.0";
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const data = await response.json();

  if (data.country_code !== "RU") {
    console.log("Access denied");
    return new NextResponse("Access denied", { status: 403 });
  }

  console.log("Access");

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
