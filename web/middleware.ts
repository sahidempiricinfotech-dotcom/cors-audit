import { NextRequest, NextResponse } from 'next/server';

const profileOrigins = [
  'https://app.acme.com',
  'https://admin.acme.com',
  'https://legacy-admin.acme.com'
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname === '/api/profile') {
    const origin = request.headers.get('origin');

    if (origin && profileOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Credentials', 'true');
      response.headers.append('Vary', 'Origin');
    }
  }

  return response;
}

export const config = {
  matcher: ['/api/profile']
};
