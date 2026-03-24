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
          <h1>Hi, I'm a Developer</h1>
          <p>Building amazing things with code</p>
          <Link href="/projects" className={styles.cta}>
            View My Work
          </Link>
        </div>
      </section>

      <section className={styles.featured}>
        <h2>Featured Projects</h2>
        <div className={styles.projectGrid}>
          <div className={styles.projectCard}>
            <h3>Project 1</h3>
            <p>A brief description of your first project.</p>
            <Link href="/projects">Learn More →</Link>
          </div>
          <div className={styles.projectCard}>
            <h3>Project 2</h3>
            <p>A brief description of your second project.</p>
            <Link href="/projects">Learn More →</Link>
          </div>
          <div className={styles.projectCard}>
            <h3>Project 3</h3>
            <p>A brief description of your third project.</p>
            <Link href="/projects">Learn More →</Link>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}
