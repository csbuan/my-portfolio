'use client';

import Link from 'next/link';
import styles from './certificates.module.css';
import NavBar from '../../components/NavBar';

export default function Certificates() {
  return (
    <main className={styles.main}>
      <NavBar />

      <section className={styles.container}>
        <h1>Certificates</h1>
        
        <div className={styles.content}>
          <p>Coming soon! Displaying my professional certifications and achievements.</p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
