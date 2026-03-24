'use client';

import Link from 'next/link';
import styles from './projects.module.css';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project Title 1',
    description: 'A detailed description of your first project. Explain what it does, the technologies used, and the impact.',
    technologies: ['React', 'TypeScript', 'CSS'],
    link: '#',
  },
  {
    id: 2,
    title: 'Project Title 2',
    description: 'A detailed description of your second project. Explain what it does, the technologies used, and the impact.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL'],
    link: '#',
  },
  {
    id: 3,
    title: 'Project Title 3',
    description: 'A detailed description of your third project. Explain what it does, the technologies used, and the impact.',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    link: '#',
  },
  {
    id: 4,
    title: 'Project Title 4',
    description: 'A detailed description of your fourth project. Explain what it does, the technologies used, and the impact.',
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    link: '#',
  },
];

export default function Projects() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>Portfolio</Link>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <section className={styles.container}>
        <h1>My Projects</h1>
        <p className={styles.subtitle}>Explore a selection of my recent work</p>

        <div className={styles.projectsList}>
          {projects.map((project) => (
            <div key={project.id} className={styles.projectItem}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className={styles.technologies}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.tag}>{tech}</span>
                ))}
              </div>
              {project.link && (
                <Link href={project.link} className={styles.projectLink}>
                  View Project →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}
