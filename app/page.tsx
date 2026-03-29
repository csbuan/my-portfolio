'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <div className={styles.logo}>Portfolio</div>
        <ul className={styles.navLinks}>
          <li><Link href="#home">Home</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <section className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <img src="/Users/camillebuan/Coding Projects/my-portfolio/media/my-logo-square.jpeg" alt="Camille logo" />
          <h1>Hi, I&apos;m a Data Scientist</h1>
          <p>Turning data into insights, and insights into impact.
            I build data-driven solutions using analytics, machine learning, and storytelling to solve real-world problems.
          </p>
          <Link href="/projects" className={styles.cta}>
            View My Work
          </Link>
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Featured Projects</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <h3>Titanic Survival Prediction</h3>
            <p>Analyzing Influential Factors That Impact Survival</p>
            <Link href="/projects">Learn More →</Link>
          </div>
          <div className={styles.projectCard}>
            <h3>Maya vs GCash NLP Analysis</h3>
            <p>Sentiment analysis and topic modeling of user reviews comparing two popular Philippine digital wallets.</p>
            <Link href="/projects">Learn More →</Link>
          </div>
          <div className={styles.projectCard}>
            <h3>Personal Portfolio</h3>
            <p>This responsive website showcasing my data science projects and skills, built with Next.js.</p>
            <Link href="/projects">Learn More →</Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
