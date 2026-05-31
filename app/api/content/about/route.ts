import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { getAbout, saveAbout } from '@/lib/content-store';
import type { AboutContent } from '@/lib/content-types';

export const dynamic = 'force-dynamic';

function isValidAbout(data: unknown): data is AboutContent {
  if (!data || typeof data !== 'object') return false;
  const about = data as AboutContent;
  return (
    typeof about.bio === 'string' &&
    Array.isArray(about.specializations) &&
    Array.isArray(about.skillGroups)
  );
}

export async function GET() {
  const about = await getAbout();
  return NextResponse.json(about);
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!isValidAbout(body)) {
      return NextResponse.json({ error: 'Invalid about content' }, { status: 400 });
    }

    await saveAbout(body);
    return NextResponse.json(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to save about page';
    const status = message.includes('Redis') || message.includes('configured') ? 503 : 400;
    console.error('PUT /api/content/about:', err);
    return NextResponse.json({ error: message }, { status });
  }
}
