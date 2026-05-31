export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  featured?: boolean;
  featuredBlurb?: string;
}

export interface Specialization {
  title: string;
  description: string;
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface AboutContent {
  bio: string;
  specializations: Specialization[];
  skillGroups: SkillGroup[];
}

export interface ProfileContent {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  discord: string;
}

export function nextProjectId(projects: Project[]): number {
  if (projects.length === 0) return 1;
  return Math.max(...projects.map((p) => p.id)) + 1;
}
