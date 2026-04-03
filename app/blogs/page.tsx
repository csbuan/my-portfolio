'use client';

import styles from './blogs.module.css';
import NavBar from '../components/NavBar';

export default function Blogs() {
  return (
    <main className={styles.main}>
      <NavBar />

      <section className={styles.container}>
        <h1>Blogs</h1>
        
        <div className={styles.content}>
          <p>Coming soon! Check back for insightful articles on data science, analytics, and web development.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
