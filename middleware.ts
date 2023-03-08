import { NextResponse } from 'next/server';

import { jwtVerify } from 'jose';

import type { NextRequest } from 'next/server';

// had to make this again here as the other one is in "auth.ts" with bcrypt which is not supported on edge run-times
const secret = new TextEncoder().encode(process.env.JWT_SECRET);
type JWTPayload = { id: string; email: string };
const validateJWT = async (jwt: string) => {
  const { payload } = await jwtVerify(jwt, secret);
  return payload.payload as JWTPayload;
};

const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/signin') ||
    pathname.startsWith('/register') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === '/') {
    req.nextUrl.pathname = '/home';
    return NextResponse.redirect(req.nextUrl);
  }

  const jwt = req.cookies.get(process.env.COOKIE_NAME!);

  if (!jwt) {
    req.nextUrl.pathname = '/signin';
    return NextResponse.redirect(req.nextUrl);
  }

  try {
    await validateJWT(jwt.value);
    return NextResponse.next();
  } catch (e) {
    console.error(e);
    req.nextUrl.pathname = '/signin';
    return NextResponse.redirect(req.nextUrl);
  }
}
