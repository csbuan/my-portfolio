export const COUNT_API = 'https://countapi.mileshilliard.com/api/v1';

export function projectViewsKey(projectId: number) {
  return `csbuan-project-${projectId}-views`;
}

export function projectLikesKey(projectId: number) {
  return `csbuan-project-${projectId}-likes`;
}

export function projectLikeStorageKey(projectId: number) {
  return `portfolioProjectLiked-${projectId}`;
}

export async function countGet(key: string): Promise<number> {
  const res = await fetch(`${COUNT_API}/get/${key}`);
  const data: unknown = await res.json();
  const rec = data as { error?: string; value?: number };
  if (!res.ok || rec.error) return 0;
  return typeof rec.value === 'number' ? rec.value : 0;
}

export async function countHit(key: string, init?: RequestInit): Promise<number> {
  const res = await fetch(`${COUNT_API}/hit/${key}`, init);
  const data: unknown = await res.json();
  const rec = data as { value?: number };
  if (!res.ok) throw new Error(String(res.status));
  return typeof rec.value === 'number' ? rec.value : 0;
}
