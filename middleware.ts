import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SERVER_BASE_URL } from "./constants/enums";
import { ApiSuccessResponse, User } from "./types/types";

const protectedRoutes = "/dashboard";
const publicRoutes = ["/", "/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = path.startsWith(protectedRoutes);
  const isPublicRoute = publicRoutes.includes(path);
  const cookie = (await cookies()).get("TOKEN")?.value;

  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
