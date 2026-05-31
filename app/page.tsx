'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import NavBar from './components/NavBar';
import { COUNT_API, VIEWS_KEY, LIKES_KEY, VIEW_COUNT_EVENT } from '@/lib/counts';
import type { ProfileContent, Project } from '@/lib/content-types';

export default function Home() {
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [profile, setProfile] = useState<ProfileContent | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/api/content/profile')
      .then((res) => (res.ok ? res.json() : null))
      .then(setProfile)
      .catch((err) => console.error('Error loading profile:', err));

    fetch('/api/content/projects')
      .then((res) => (res.ok ? res.json() : []))
      .then((projects: Project[]) => setFeaturedProjects(projects.filter((p) => p.featured)))
      .catch((err) => console.error('Error loading projects:', err));
  }, []);

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
          <h1>{profile?.name ?? 'Camille Buan'}</h1>
          <p>{profile?.title ?? 'Senior Data Analyst | Data Science'}</p>

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
              {profile?.email && (
                <a href={`mailto:${profile.email}`} className={styles.socialLink} aria-label="Email">
                  <img src="/media/email-logo.png?v=2" alt="Email" className={styles.socialIcon} />
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                  <img src="/media/linkedin-logo.png?v=2" alt="LinkedIn" className={styles.socialIcon} />
                </a>
              )}
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                  <img src="/media/github-logo.png?v=2" alt="GitHub" className={styles.socialIcon} />
                </a>
              )}
              {profile?.discord && (
                <a href={profile.discord} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Discord">
                  <img src="/media/discord-logo.png?v=2" alt="Discord" className={styles.socialIcon} />
                </a>
              )}
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
          {featuredProjects.map((project) => (
            <div key={project.id} className={styles.projectCard}>
              <h3>{project.title}</h3>
              <p>{project.featuredBlurb || project.description}</p>
              <Link href="/projects">Learn More →</Link>
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
