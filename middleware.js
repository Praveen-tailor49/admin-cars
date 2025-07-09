import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'jFhs8HvW0y7Yy4tK4JzqUK9VeR74V5Fe1XzgMQ3nF8A=');

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname == '/login';

  try {
    if (!token) throw new Error('Token missing');
    await jwtVerify(token, secret);
    
    if (isLoginPage) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.next();
  } catch (err) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher:['/((?!_next|favicon.ico|api).*)'],
};

