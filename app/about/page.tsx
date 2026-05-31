'use client';

import { useEffect, useState } from 'react';
import styles from './about.module.css';
import NavBar from '../components/NavBar';
import type { AboutContent } from '@/lib/content-types';

export default function About() {
  const [about, setAbout] = useState<AboutContent | null>(null);

  useEffect(() => {
    fetch('/api/content/about')
      .then((res) => (res.ok ? res.json() : null))
      .then(setAbout)
      .catch((err) => console.error('Error loading about content:', err));
  }, []);

  if (!about) {
    return (
      <main className={styles.main}>
        <NavBar />
        <section className={styles.container}>
          <h1>About Me</h1>
          <p>Loading...</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <NavBar />

      <section className={styles.container}>
        <h1>About Me</h1>

        <div className={styles.content}>
          <div className={styles.bio}>
            <p>{about.bio}</p>

            <h2>Specializations</h2>
            <div className={styles.skillsGrid}>
              {about.specializations.map((spec) => (
                <div key={spec.title} className={styles.skillItem}>
                  <h3>{spec.title}</h3>
                  <p>{spec.description}</p>
                </div>
              ))}
            </div>

            <h2>Technical Skills</h2>
            <div className={styles.skillsGrid}>
              {about.skillGroups.map((group) => (
                <div key={group.title} className={styles.skillItem}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
