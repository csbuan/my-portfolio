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
  const { Redis } = await import('@upstash/redis');

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  if (url && token) {
    return new Redis({ url, token });
  }

  try {
    return Redis.fromEnv();
  } catch {
    return null;
  }
}

async function readFromKv<T>(key: string): Promise<T | null> {
  const redis = await getRedis();
  if (!redis) return null;

  try {
    const data = await redis.get<T>(key);
    return data ?? null;
  } catch (err) {
    console.error(`Redis read failed (${key}):`, err);
    return null;
  }
}

async function writeToKv<T>(key: string, data: T): Promise<void> {
  const redis = await getRedis();
  if (!redis) {
    throw new Error(
      'Redis is not configured. Add Upstash to your Vercel project and redeploy.'
    );
  }

  try {
    await redis.set(key, data);
  } catch (err) {
    console.error(`Redis write failed (${key}):`, err);
    throw new Error('Failed to save to Redis. Check your Upstash connection on Vercel.');
  }
}

function canWriteLocalFiles(): boolean {
  return process.env.VERCEL !== '1';
}

export async function getProjects(): Promise<Project[]> {
  const fromKv = await readFromKv<Project[]>(KV_KEYS.projects);
  if (fromKv) return fromKv;
  return readJsonFile('projects.json', defaultProjects as Project[]);
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    await writeToKv(KV_KEYS.projects, projects);
    return;
  } catch (err) {
    if (!canWriteLocalFiles()) throw err;
    console.warn('Redis save failed, falling back to local file:', err);
  }
  writeJsonFile('projects.json', projects);
}

export async function getAbout(): Promise<AboutContent> {
  const fromKv = await readFromKv<AboutContent>(KV_KEYS.about);
  if (fromKv) return fromKv;
  return readJsonFile('about.json', defaultAbout as AboutContent);
}

export async function saveAbout(about: AboutContent): Promise<void> {
  try {
    await writeToKv(KV_KEYS.about, about);
    return;
  } catch (err) {
    if (!canWriteLocalFiles()) throw err;
    console.warn('Redis save failed, falling back to local file:', err);
  }
  writeJsonFile('about.json', about);
}

export async function getProfile(): Promise<ProfileContent> {
  const fromKv = await readFromKv<ProfileContent>(KV_KEYS.profile);
  if (fromKv) return fromKv;
  return readJsonFile('profile.json', defaultProfile as ProfileContent);
}

export async function saveProfile(profile: ProfileContent): Promise<void> {
  try {
    await writeToKv(KV_KEYS.profile, profile);
    return;
  } catch (err) {
    if (!canWriteLocalFiles()) throw err;
    console.warn('Redis save failed, falling back to local file:', err);
  }
  writeJsonFile('profile.json', profile);
}

export function normalizeProjects(projects: Project[]): Project[] {
  return projects.map((project, index) => ({
    ...project,
    id: project.id || index + 1,
    technologies: project.technologies.filter(Boolean),
    featured: Boolean(project.featured),
  }));
}
