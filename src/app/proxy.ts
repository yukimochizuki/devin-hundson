import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/((?!api/auth|login|signup|_next/static|_next/image|favicon.ico).*)',
  ],
};

export const middleware = async (request: NextRequest) => {
  const session = await auth();

  const isAuthPage =
    request.nextUrl.pathname === '/login' ||
    request.nextUrl.pathname === '/signup';

  if (!session && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (session && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
};
