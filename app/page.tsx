'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import NavBar from './components/NavBar';
import { COUNT_API, VIEWS_KEY, LIKES_KEY, VIEW_COUNT_EVENT } from '@/lib/counts';

export default function Home() {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const onViewCount = (e: Event) => {
      const v = (e as CustomEvent<number>).detail;
      if (typeof v === 'number') setViews((prev) => Math.max(prev, v));
    };
    window.addEventListener(VIEW_COUNT_EVENT, onViewCount);

    fetch(`${COUNT_API}/get/${VIEWS_KEY}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || data.error) return;
        return data.value as number;
      })
      .then((v) => {
        if (typeof v === 'number') setViews((prev) => Math.max(prev, v));
      })
      .catch((err) => console.error('Error fetching views:', err));

    fetch(`${COUNT_API}/get/${LIKES_KEY}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok || data.error) return 0;
        return data.value;
      })
      .then(setLikes)
      .catch((err) => console.error('Error fetching likes:', err));

    if (localStorage.getItem('hasLiked')) setLiked(true);

    return () => window.removeEventListener(VIEW_COUNT_EVENT, onViewCount);
  }, []);

  const handleLike = () => {
    if (liked) return;
    fetch(`${COUNT_API}/hit/${LIKES_KEY}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data) => {
        setLikes(data.value);
        setLiked(true);
        localStorage.setItem('hasLiked', 'true');
      })
      .catch((err) => console.error('Error incrementing likes:', err));
  };

  return (
    <main className={styles.main}>
      <NavBar />

      <section className={styles.hero} id="home">
        <div className={styles.heroContent}>
          <img src="/media/my-logo-square.jpeg" alt="Camille logo" width={90} height={90} style={{ borderRadius: '50%', objectFit: 'cover' }} />
          <h1>Camille Buan</h1>
          <p>Senior Data Analyst | Data Science</p>

          <section className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statDisplay}>
                <img src="/media/view-logo.png?v=2" alt="Views" className={styles.viewIcon} />
                <span className={styles.statNumber}>{views}</span>
              </div>
              <span className={styles.statLabel}>Views</span>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statDisplay}>
                <button
                  type="button"
                  onClick={handleLike}
                  className={styles.likeIconButton}
                  disabled={liked}
                  aria-label={liked ? 'Liked' : 'Like this portfolio'}
                >
                  <img src="/media/like-logo.png?v=2" alt="" className={styles.likeIcon} width={30} height={30} />
                </button>
                <span className={styles.statNumber} aria-hidden="true">
                  {likes}
                </span>
              </div>
              <span className={styles.statLabel}>Likes</span>
            </div>
          </section>

          <div className={styles.socials}>
            <div className={styles.socialIcons}>
              <a href="mailto:buancamillee@gmail.com" className={styles.socialLink} aria-label="Email">
                <img src="/media/email-logo.png?v=2" alt="Email" className={styles.socialIcon} />
              </a>
            <a href="https://www.linkedin.com/in/camillebuan/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <img src="/media/linkedin-logo.png?v=2" alt="LinkedIn" className={styles.socialIcon} />
            </a>
            <a href="https://github.com/csbuan" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <img src="/media/github-logo.png?v=2" alt="GitHub" className={styles.socialIcon} />
            </a>
            <a href="https://discord.com/users/871335959483015210" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Discord">
              <img src="/media/discord-logo.png?v=2" alt="Discord" className={styles.socialIcon} />
            </a>
          </div>
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


      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
