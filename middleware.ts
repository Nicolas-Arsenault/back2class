// /middleware.ts

import { NextResponse, type NextRequest } from 'next/server'
import updateSession from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth/confirm')) {
    return NextResponse.next();
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|auth/confirm|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
