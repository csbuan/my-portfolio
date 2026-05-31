import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { getProfile, saveProfile } from '@/lib/content-store';
import type { ProfileContent } from '@/lib/content-types';

export const dynamic = 'force-dynamic';

function isValidProfile(data: unknown): data is ProfileContent {
  if (!data || typeof data !== 'object') return false;
  const profile = data as ProfileContent;
  return (
    typeof profile.name === 'string' &&
    typeof profile.title === 'string' &&
    typeof profile.email === 'string' &&
    typeof profile.linkedin === 'string' &&
    typeof profile.github === 'string' &&
    typeof profile.discord === 'string'
  );
}

export async function GET() {
  const profile = await getProfile();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!isValidProfile(body)) {
      return NextResponse.json({ error: 'Invalid profile content' }, { status: 400 });
    }

    await saveProfile(body);
    return NextResponse.json(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save profile';
    const status = message.includes('Redis') || message.includes('configured') ? 503 : 400;
    console.error('PUT /api/content/profile:', err);
    return NextResponse.json({ error: message }, { status });
  }
}
