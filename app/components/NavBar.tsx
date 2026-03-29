'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './NavBar.module.css';

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.navWrapper}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <img
            src="/media/my-logo-square.jpeg"
            alt="Portfolio logo"
            width={32}
            height={32}
            style={{ borderRadius: '50%', objectFit: 'cover', marginRight: '0.5rem' }}
          />
          <span>Portfolio</span>
        </Link>

        <button
          className={`${styles.menuToggle} ${open ? styles.open : ''}`}
          onClick={() => setOpen(prev => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.navLinks} ${open ? styles.active : ''}`}>
          <li><Link href="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link href="/projects" onClick={() => setOpen(false)}>Projects</Link></li>
          <li><Link href="/blogs" onClick={() => setOpen(false)}>Blogs</Link></li>
          <li><Link href="/certificates" onClick={() => setOpen(false)}>Certificates</Link></li>
          <li><Link href="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
