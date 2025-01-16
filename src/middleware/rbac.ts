import { NextResponse } from 'next/server';
import getServerSession from 'next-auth';
import { authConfig } from '@cps/server/auth/config';

/**
 * Middleware function to enforce role-based access control
 * Only allows users with the 'ADMIN' role to access protected API routes
 */
export async function middleware(req: Request) {
  const session = await getServerSession(authConfig);

  // If the user is not authenticated or is not an ADMIN, deny access
  if (!session || !(session as any).user || (session as any).user.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login page if not authorized
  }

  // If authorized, proceed to the next handler
  return NextResponse.next();
}

/**
 * Apply the middleware to the admin API routes
 */
export const config = {
  matcher: ['/api/admin/Product/*'], // Match any route under /api/admin/*
};
