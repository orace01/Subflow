import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/auth";

const APP_ROUTES = ["/dashboard", "/abonnements", "/calendrier", "/alertes", "/parametres"];
const ONBOARDING_ROUTES = ["/onboarding/email", "/onboarding/confirmation"];
const GUEST_ONLY_ROUTES = ["/connexion", "/inscription"];

function matches(pathname: string, routes: string[]): boolean {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const session = await db.session.findUnique({ where: { id: token } });
  if (!session) return false;
  if (session.expiresAt < new Date()) return false;

  return true;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const needsApp = matches(pathname, APP_ROUTES);
  const needsOnboarding = matches(pathname, ONBOARDING_ROUTES);
  const guestOnly = matches(pathname, GUEST_ONLY_ROUTES);

  if (!needsApp && !needsOnboarding && !guestOnly) {
    return NextResponse.next();
  }

  const authed = await hasValidSession(request);

  if (needsApp && !authed) {
    const url = request.nextUrl.clone();
    url.pathname = "/connexion";
    return NextResponse.redirect(url);
  }

  if (needsOnboarding && !authed) {
    const url = request.nextUrl.clone();
    url.pathname = "/inscription";
    return NextResponse.redirect(url);
  }

  if (guestOnly && authed) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/abonnements/:path*",
    "/calendrier/:path*",
    "/alertes/:path*",
    "/parametres/:path*",
    "/onboarding/email",
    "/onboarding/confirmation",
    "/connexion",
    "/inscription",
  ],
};
