import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Retrieve the token from cookies (example using cookies)
  const token = window.localStorage.getItem('user_key');
  console.log('?????', {token });
  
  // Define protected routes
  const protectedRoutes = ['/movie/*', '/movie/', '/movie/list', '/movie/add'];

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    // If token doesn't exist, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next(); // Proceed to the requested route
}

export const config = {
  matcher: ['/movie/*', '/movie/', '/movie/list', '/movie/add'],
}
