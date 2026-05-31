import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import type { AboutContent, ProfileContent, Project } from './content-types';

import defaultProjects from '@/content/projects.json';
import defaultAbout from '@/content/about.json';
import defaultProfile from '@/content/profile.json';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const KV_KEYS = {
  projects: 'portfolio:projects',
  about: 'portfolio:about',
  profile: 'portfolio:profile',
} as const;

function readJsonFile<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(CONTENT_DIR, filename);
    const raw = readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  const filePath = path.join(CONTENT_DIR, filename);
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

async function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const { Redis } = await import('@upstash/redis');
  return new Redis({ url, token });
}

async function readFromKv<T>(key: string): Promise<T | null> {
  const redis = await getRedis();
  if (!redis) return null;

  try {
    const data = await redis.get<T>(key);
    return data ?? null;
  } catch {
    return null;
  }
}

async function writeToKv<T>(key: string, data: T): Promise<boolean> {
  const redis = await getRedis();
  if (!redis) return false;

  try {
    await redis.set(key, data);
    return true;
  } catch {
    return false;
  }
}

export async function getProjects(): Promise<Project[]> {
  const fromKv = await readFromKv<Project[]>(KV_KEYS.projects);
  if (fromKv) return fromKv;
  return readJsonFile('projects.json', defaultProjects as Project[]);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  const savedToKv = await writeToKv(KV_KEYS.projects, projects);
  if (!savedToKv) {
    writeJsonFile('projects.json', projects);
  }
}

export async function getAbout(): Promise<AboutContent> {
  const fromKv = await readFromKv<AboutContent>(KV_KEYS.about);
  if (fromKv) return fromKv;
  return readJsonFile('about.json', defaultAbout as AboutContent);
}

export async function saveAbout(about: AboutContent): Promise<void> {
  const savedToKv = await writeToKv(KV_KEYS.about, about);
  if (!savedToKv) {
    writeJsonFile('about.json', about);
  }
}

export async function getProfile(): Promise<ProfileContent> {
  const fromKv = await readFromKv<ProfileContent>(KV_KEYS.profile);
  if (fromKv) return fromKv;
  return readJsonFile('profile.json', defaultProfile as ProfileContent);
}

export async function saveProfile(profile: ProfileContent): Promise<void> {
  const savedToKv = await writeToKv(KV_KEYS.profile, profile);
  if (!savedToKv) {
    writeJsonFile('profile.json', profile);
  }
}

export function normalizeProjects(projects: Project[]): Project[] {
  return projects.map((project, index) => ({
    ...project,
    id: project.id || index + 1,
    technologies: project.technologies.filter(Boolean),
    featured: Boolean(project.featured),
  }));
}
