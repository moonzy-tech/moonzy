import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  return response;
}

export const config = {
  matcher: "/(.*)",
};
