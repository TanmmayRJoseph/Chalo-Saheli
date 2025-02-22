import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  /* we will check if the user has token if he/she has token then we will */
  const path = request.nextUrl.pathname;
  //all public path for which user doesn't need to be logged in
  const publicPath =
    path === "/closedapp" ||
    path === "/langSelection" ||
    path === "/login-as" ||
    path === "/login-as-Saheli" ||
    path === "/login-as-Saarthi" ||
    path === "/mainpage" ||
    path === "/rideOptions" ||
    path === "sign-up-as-Saheli" ||
    path === "why-us";

  const token = request.cookies.get("token")?.value || "";

  if (publicPath && token) {
    return NextResponse.redirect(new URL("/mainpage", request.url));
  }

  if (!publicPath && !token) {
    return NextResponse.redirect(new URL("/login-as", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/langSelection",
    "/login-as",
    "/login-as-Saheli",
    "/login-as-Saarthi",
    "/rideOptions",
    "/sign-up-as-Saheli",
    "/driverrating",
    "/why-us",
    "/mainpage",
    "/sosoptions",
  ],
};
