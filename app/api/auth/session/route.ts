import { NextResponse } from 'next/server';
import { isAdminSession } from '@/lib/auth';

export async function GET() {
  const authenticated = await isAdminSession();
  return NextResponse.json({ authenticated });
}
