import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'modulease' && pwd === 'vip2026') {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required to access Modulease engines.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Modulease Portal"',
    },
  })
}

export const config = {
  matcher: ['/calculator', '/planner'],
}
