import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('modulease_auth')
  const { pathname } = req.url ? new URL(req.url) : { pathname: req.nextUrl.pathname }

  // Allow access to login page and api routes
  if (pathname.startsWith('/login') || pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // If authenticated via cookie, let them through
  if (cookie && cookie.value === 'authenticated') {
    return NextResponse.next()
  }

  // Otherwise, redirect to the custom login portal
  const loginUrl = new URL('/login', req.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/calculator', '/planner'],
}
