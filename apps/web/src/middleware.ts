import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface JWTPayLoad {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ORGANIZER";
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  if (!accessToken) {
    if (pathname === "/auth/login" || pathname === "/auth/register") {
      return NextResponse.next();
    }
    return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);
  }

  // if (!accessToken && pathname !== "/auth/login") {
  //   //kick to the login page
  //   return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);
  // } else if (!accessToken && pathname === "/auth/login") {
  //   return NextResponse.next();
  // } else if (!accessToken && pathname === "/auth/register") {
  //   return NextResponse.next();
  // }

  // if (!accessToken)
  //   return NextResponse.redirect(`${req.nextUrl.origin}/auth/login`);

  const { payload } = await jwtVerify<JWTPayLoad>(
    accessToken,
    new TextEncoder().encode(process.env.SECRET_CODE)
  );
  const role = payload.role;
  console.log(payload);

  if (
    (role === "CUSTOMER" && pathname.startsWith("/dashboard/customer")) ||
    (role === "ORGANIZER" && pathname.startsWith("/dashboard/event-organizer"))
  ) {
    return NextResponse.next();
  } else {
    return new NextResponse("Forbidden", { status: 403 });
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
