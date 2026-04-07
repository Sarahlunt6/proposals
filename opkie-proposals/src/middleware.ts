import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/track (tracking pixel - needs to be public)
     * - Public proposal pages are handled by [slug] route
     */
    '/((?!_next/static|_next/image|favicon.ico|api/track).*)',
  ],
}
