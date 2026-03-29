'use client';

import Link from 'next/link';
import styles from './about.module.css';
import NavBar from '../../components/NavBar';

export default function About() {
  return (
    <main className={styles.main}>
      <NavBar />

      <section className={styles.container}>
        <h1>About Me</h1>
        
        <div className={styles.content}>
          <div className={styles.bio}>
            <p>
              Hello! I&apos;m a passionate developer with a love for creating beautiful and functional web applications.
              With experience in modern web technologies, I strive to build solutions that make a difference.
            </p>
            
            <h2>Skills</h2>
            <div className={styles.skillsGrid}>
              <div className={styles.skillItem}>
                <h3>Frontend</h3>
                <ul>
                  <li>React / Next.js</li>
                  <li>TypeScript</li>
                  <li>CSS / Tailwind</li>
                  <li>JavaScript</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Backend</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Express</li>
                  <li>PostgreSQL</li>
                  <li>REST APIs</li>
                </ul>
              </div>
              <div className={styles.skillItem}>
                <h3>Tools & More</h3>
                <ul>
                  <li>Git / GitHub</li>
                  <li>VS Code</li>
                  <li>Docker</li>
                  <li>Vercel</li>
                </ul>
              </div>
            </div>

            <h2>Experience</h2>
            <div className={styles.experience}>
              <div className={styles.experienceItem}>
                <h3>Project / Role Name</h3>
                <p className={styles.date}>Year - Year</p>
                <p>Brief description of what you did, technologies used, and the impact of your work.</p>
              </div>
              <div className={styles.experienceItem}>
                <h3>Another Project / Role</h3>
                <p className={styles.date}>Year - Year</p>
                <p>Brief description of what you did, technologies used, and the impact of your work.</p>
              </div>
            </div>

            <h2>Education</h2>
            <div className={styles.education}>
              <div className={styles.educationItem}>
                <h3>Degree / Certification</h3>
                <p className={styles.date}>School / Platform</p>
                <p>Brief description or focus areas.</p>
              </div>
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
