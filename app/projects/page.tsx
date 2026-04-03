'use client';

import Link from 'next/link';
import styles from './projects.module.css';
import NavBar from '../components/NavBar';

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
    description: 'A machine learning project analyzing the Titanic dataset to predict passenger survival using logistic regression. Includes data preprocessing, feature engineering, model training, and evaluation with Python and Jupyter Notebook.',
    technologies: ['Python', 'Jupyter', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    link: 'https://github.com/csbuan/survival-prediction-titanic-logistic-regression',
  },
  {
    id: 2,
    title: 'Maya vs GCash NLP Analysis',
    description: 'Natural language processing analysis comparing user reviews of Maya and GCash digital wallets. Uses sentiment analysis and topic modeling to extract insights from Google Play Store reviews.',
    technologies: ['Python', 'NLP', 'Jupyter', 'NLTK', 'TextBlob'],
    link: 'https://github.com/csbuan/maya-vs-gcash-nlp-analysis',
  },
  {
    id: 3,
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio website built with Next.js and TypeScript. Showcases projects, skills, and experience with clean design and fast performance.',
    technologies: ['Next.js', 'TypeScript', 'CSS', 'React'],
    link: 'https://github.com/csbuan/my-portfolio',
  },
];

export default function Projects() {
  return (
    <main className={styles.main}>
      <NavBar />

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
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
