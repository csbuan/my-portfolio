import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = typeof body.password === 'string' ? body.password : '';

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Admin login is not configured on this server.' },
        { status: 503 }
      );
    }

    if (!verifyPassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = createSessionToken();
    const cookieStore = await cookies();
    cookieStore.set(sessionCookieOptions(token));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
