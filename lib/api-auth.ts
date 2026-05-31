import { NextResponse } from 'next/server';
import { isAdminSession } from '@/lib/auth';

export async function requireAdmin(): Promise<NextResponse | null> {
  const isAdmin = await isAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
