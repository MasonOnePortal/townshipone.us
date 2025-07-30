import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export function middleware(request) {
  const cookieStore = cookies();
  let isLoggedIn;
  const hasCookie = cookieStore.has("isAuthenticated");
  if (hasCookie) {
    const { value } = cookieStore.get("isAuthenticated");
    isLoggedIn = value;
  } else {
    isLoggedIn = false;
  }

  if (isLoggedIn && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isLoggedIn && request.nextUrl.pathname.startsWith("/user-profile")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (request.headers.host && !request.secure) {
    return {
      redirect: {
        destination: `https://${request.headers.host}${request.url}`,
        permanent: true,
      },
    };
  }
}


