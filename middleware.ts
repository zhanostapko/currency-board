import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  const isAuthPage = ["/login", "/register"].includes(req.nextUrl.pathname);
  const isProtectedPage = req.nextUrl.pathname.startsWith("/dashboard");
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (isProtectedPage) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*", "/login", "/register"],
};
