import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define public paths that don't require authentication
  const isPublicPath = pathname === '/login' || pathname === '/';

  // Get the token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // If there is no token and the path is not public, redirect to login
  if (!token && !isPublicPath) {
    const loginUrl = new URL('/login', request.url);
    // You can also add a callback URL to redirect back after login
    // loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If there is a token and the user is trying to access login, redirect to home
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
