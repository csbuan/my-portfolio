import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api-auth';
import { getProjects, normalizeProjects, saveProjects } from '@/lib/content-store';
import type { Project } from '@/lib/content-types';

export const dynamic = 'force-dynamic';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function PUT(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Expected an array of projects' }, { status: 400 });
    }

    const projects = normalizeProjects(body as Project[]);
    for (const project of projects) {
      if (!project.title?.trim() || !project.description?.trim()) {
        return NextResponse.json(
          { error: 'Each project needs a title and description' },
          { status: 400 }
        );
      }
    }

    await saveProjects(projects);
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
