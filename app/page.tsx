'use client';

import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <img
            src="/media/my-logo-square.jpeg"
            alt="Camille logo"
            width={32}
            height={32}
            style={{ borderRadius: '50%', objectFit: 'cover', marginRight: '0.5rem' }}
          />
          <span>Camille Buan</span>
        </Link>
        <ul className={styles.navLinks}>
          <li><Link href="#home">Home</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <section className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <img src="/media/my-logo-square.jpeg" alt="Camille logo" width={90} height={90} style={{ borderRadius: '50%', objectFit: 'cover' }} />
          <h1>Camille Buan</h1>
          <p>Senior Data Analyst | Data Science</p>

          <div className={styles.socials}>
            <a href="mailto:buancamillee@gmail.com" className={styles.socialLink} aria-label="Email">✉️</a>
            <a href="https://www.linkedin.com/in/camillebuan/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">in</a>
            <a href="https://github.com/csbuan" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">GH</a>
            <a href="https://discord.com/users/871335959483015210" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Discord">🎮</a>
          </div>

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

      <section className={styles.socials}>
        <p>Senior Data Analyst | Data Science</p>
        <div className={styles.socialIcons}>
          <a href="mailto:buancamillee@gmail.com" aria-label="Email" className={styles.socialLink}>✉️</a>
          <a href="https://www.linkedin.com/in/camillebuan/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>in</a>
          <a href="https://github.com/csbuan" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>GH</a>
          <a href="https://discord.com/users/871335959483015210" target="_blank" rel="noopener noreferrer" aria-label="Discord" className={styles.socialLink}>🎮</a>
        </div>
      </section>
      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
