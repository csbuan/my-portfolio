'use client';

import { useCallback, useEffect, useState } from 'react';
import styles from './projects.module.css';
import NavBar from '../components/NavBar';
import {
  countGet,
  countHit,
  projectLikesKey,
  projectLikeStorageKey,
  projectViewsKey,
} from '@/lib/counts';

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
    title: 'Survival Prediction: Titanic Logistic Regression',
    description:
      'A machine learning project analyzing the Titanic dataset to predict passenger survival using logistic regression. Includes data preprocessing, feature engineering, model training, and evaluation with Python and Jupyter Notebook.',
    technologies: ['Python', 'Jupyter', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    link: 'https://github.com/csbuan/survival-prediction-titanic-logistic-regression',
  },
  {
    id: 2,
    title: 'Maya vs GCash NLP Analysis',
    description:
      'Natural language processing analysis comparing user reviews of Maya and GCash digital wallets. Uses sentiment analysis and topic modeling to extract insights from Google Play Store reviews.',
    technologies: ['Python', 'NLP', 'Jupyter', 'NLTK', 'TextBlob'],
    link: 'https://github.com/csbuan/maya-vs-gcash-nlp-analysis',
  },
  {
    id: 3,
    title: 'Personal Portfolio Website',
    description:
      'A modern, responsive portfolio website built with Next.js and TypeScript. Showcases projects, skills, and experience with clean design and fast performance.',
    technologies: ['Next.js', 'TypeScript', 'CSS', 'React'],
    link: 'https://github.com/csbuan/my-portfolio',
  },
];

type ProjectStats = { views: number; likes: number };

export default function Projects() {
  const [stats, setStats] = useState<Record<number, ProjectStats>>({});
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const likedInit: Record<number, boolean> = {};
    projects.forEach((p) => {
      if (localStorage.getItem(projectLikeStorageKey(p.id))) likedInit[p.id] = true;
    });
    setLiked(likedInit);

    (async () => {
      const next: Record<number, ProjectStats> = {};
      await Promise.all(
        projects.map(async (p) => {
          const [views, likes] = await Promise.all([
            countGet(projectViewsKey(p.id)),
            countGet(projectLikesKey(p.id)),
          ]);
          next[p.id] = { views, likes };
        })
      );
      setStats(next);
    })();
  }, []);

  const handleProjectViewClick = useCallback((projectId: number) => {
    countHit(projectViewsKey(projectId), { keepalive: true })
      .then((value) => {
        setStats((s) => ({
          ...s,
          [projectId]: {
            views: value,
            likes: s[projectId]?.likes ?? 0,
          },
        }));
      })
      .catch((err) => console.error('Error recording project view:', err));
  }, []);

  const handleProjectLike = useCallback((projectId: number) => {
    if (liked[projectId]) return;
    countHit(projectLikesKey(projectId))
      .then((value) => {
        setStats((s) => ({
          ...s,
          [projectId]: {
            views: s[projectId]?.views ?? 0,
            likes: value,
          },
        }));
        setLiked((prev) => ({ ...prev, [projectId]: true }));
        localStorage.setItem(projectLikeStorageKey(projectId), 'true');
      })
      .catch((err) => console.error('Error liking project:', err));
  }, [liked]);

  return (
    <main className={styles.main}>
      <NavBar />

      <section className={styles.container}>
        <h1>My Projects</h1>
        <p className={styles.subtitle}>Explore a selection of my recent work</p>

        <div className={styles.projectsList}>
          {projects.map((project) => {
            const views = stats[project.id]?.views ?? 0;
            const likes = stats[project.id]?.likes ?? 0;
            const projectLiked = liked[project.id] ?? false;

            return (
              <div key={project.id} className={styles.projectItem}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className={styles.technologies}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.tag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.projectMeta}>
                  <div className={styles.projectStats}>
                    <div className={styles.projectStat}>
                      <div className={styles.projectStatDisplay}>
                        <img
                          src="/media/view-logo.png?v=2"
                          alt=""
                          className={styles.viewIcon}
                          width={22}
                          height={22}
                        />
                        <span className={styles.projectStatNumber}>{views}</span>
                      </div>
                      <span className={styles.projectStatLabel}>Views</span>
                    </div>
                    <div className={styles.projectStat}>
                      <div className={styles.projectStatDisplay}>
                        <button
                          type="button"
                          className={styles.projectLikeIconButton}
                          disabled={projectLiked}
                          onClick={() => handleProjectLike(project.id)}
                          aria-label={projectLiked ? 'Liked' : 'Like this project'}
                        >
                          <img
                            src="/media/like-logo.png?v=2"
                            alt=""
                            className={styles.likeIcon}
                            width={22}
                            height={22}
                          />
                        </button>
                        <span className={styles.projectStatNumber} aria-hidden="true">
                          {likes}
                        </span>
                      </div>
                      <span className={styles.projectStatLabel}>Likes</span>
                    </div>
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                      onClick={() => handleProjectViewClick(project.id)}
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
