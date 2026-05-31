'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useAdmin } from '../components/AdminProvider';
import styles from './admin.module.css';
import { nextProjectId, type AboutContent, type ProfileContent, type Project } from '@/lib/content-types';

type Tab = 'projects' | 'about' | 'profile';

const emptyProject = (): Project => ({
  id: 0,
  title: '',
  description: '',
  technologies: [],
  link: '',
  featured: false,
  featuredBlurb: '',
});

export default function AdminPage() {
  const { isAdmin, loading, refreshSession, logout } = useAdmin();
  const [tab, setTab] = useState<Tab>('projects');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [about, setAbout] = useState<AboutContent>({
    bio: '',
    specializations: [],
    skillGroups: [],
  });
  const [profile, setProfile] = useState<ProfileContent>({
    name: '',
    title: '',
    email: '',
    linkedin: '',
    github: '',
    discord: '',
  });

  const loadContent = useCallback(async () => {
    const [projectsRes, aboutRes, profileRes] = await Promise.all([
      fetch('/api/content/projects'),
      fetch('/api/content/about'),
      fetch('/api/content/profile'),
    ]);

    if (projectsRes.ok) setProjects(await projectsRes.json());
    if (aboutRes.ok) setAbout(await aboutRes.json());
    if (profileRes.ok) setProfile(await profileRes.json());
  }, []);

  useEffect(() => {
    if (isAdmin) loadContent();
  }, [isAdmin, loadContent]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setLoginError(data.error || 'Login failed');
        return;
      }

      setPassword('');
      await refreshSession();
    } catch {
      setLoginError('Something went wrong. Please try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  const saveProjects = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects),
      });
      if (!res.ok) {
        const data = await res.json();
        showMessage('error', data.error || 'Failed to save projects');
        return;
      }
      setProjects(await res.json());
      showMessage('success', 'Projects saved successfully.');
    } catch {
      showMessage('error', 'Failed to save projects.');
    } finally {
      setSaving(false);
    }
  };

  const saveAbout = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(about),
      });
      if (!res.ok) {
        const data = await res.json();
        showMessage('error', data.error || 'Failed to save about page');
        return;
      }
      setAbout(await res.json());
      showMessage('success', 'About page saved successfully.');
    } catch {
      showMessage('error', 'Failed to save about page.');
    } finally {
      setSaving(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/content/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        const data = await res.json();
        showMessage('error', data.error || 'Failed to save profile');
        return;
      }
      setProfile(await res.json());
      showMessage('success', 'Profile saved successfully.');
    } catch {
      showMessage('error', 'Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const updateProject = (index: number, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...updates } : p))
    );
  };

  const addProject = () => {
    setProjects((prev) => [...prev, { ...emptyProject(), id: nextProjectId(prev) }]);
  };

  const removeProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <main className={styles.main}>
        <NavBar />
        <div className={styles.container}>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className={styles.main}>
        <NavBar />
        <div className={styles.container}>
          <div className={styles.loginCard}>
            <h2>Admin Login</h2>
            <p>Sign in to edit your portfolio content. This page is only for you.</p>
            <form onSubmit={handleLogin}>
              <div className={styles.field}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
              {loginError && (
                <div className={`${styles.message} ${styles.messageError}`}>{loginError}</div>
              )}
              <button type="submit" className={styles.btnPrimary} disabled={loggingIn}>
                {loggingIn ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div>
            <h1>Admin Dashboard</h1>
            <p className={styles.subtitle}>Edit your portfolio content. Changes appear on the live site.</p>
          </div>
          <button type="button" className={styles.btnSecondary} onClick={logout}>
            Sign Out
          </button>
        </div>

        {message && (
          <div
            className={`${styles.message} ${
              message.type === 'success' ? styles.messageSuccess : styles.messageError
            }`}
          >
            {message.text}
          </div>
        )}

        <div className={styles.tabs}>
          {(['projects', 'about', 'profile'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'projects' ? 'Projects' : t === 'about' ? 'About' : 'Profile'}
            </button>
          ))}
        </div>

        {tab === 'projects' && (
          <div className={styles.panel}>
            <h2>Manage Projects</h2>
            {projects.map((project, index) => (
              <div key={project.id || index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Project {index + 1}</h3>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() => removeProject(index)}
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.field}>
                  <label>Title</label>
                  <input
                    value={project.title}
                    onChange={(e) => updateProject(index, { title: e.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, { description: e.target.value })}
                  />
                </div>
                <div className={styles.field}>
                  <label>Technologies (comma-separated)</label>
                  <input
                    value={project.technologies.join(', ')}
                    onChange={(e) =>
                      updateProject(index, {
                        technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                      })
                    }
                  />
                </div>
                <div className={styles.field}>
                  <label>Project Link (optional)</label>
                  <input
                    value={project.link || ''}
                    onChange={(e) => updateProject(index, { link: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
                <label className={styles.checkboxField}>
                  <input
                    type="checkbox"
                    checked={Boolean(project.featured)}
                    onChange={(e) => updateProject(index, { featured: e.target.checked })}
                  />
                  Show on home page (Featured)
                </label>
                {project.featured && (
                  <div className={styles.field}>
                    <label>Featured blurb (short text for home page)</label>
                    <input
                      value={project.featuredBlurb || ''}
                      onChange={(e) => updateProject(index, { featuredBlurb: e.target.value })}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className={styles.actions}>
              <button type="button" className={styles.btnSecondary} onClick={addProject}>
                + Add Project
              </button>
              <button type="button" className={styles.btnPrimary} onClick={saveProjects} disabled={saving}>
                {saving ? 'Saving...' : 'Save Projects'}
              </button>
            </div>
          </div>
        )}

        {tab === 'about' && (
          <div className={styles.panel}>
            <h2>About Page</h2>
            <div className={styles.field}>
              <label>Bio</label>
              <textarea
                value={about.bio}
                onChange={(e) => setAbout({ ...about, bio: e.target.value })}
                rows={6}
              />
            </div>

            <h2 style={{ marginTop: '1.5rem' }}>Specializations</h2>
            {about.specializations.map((spec, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Specialization {index + 1}</h3>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() =>
                      setAbout({
                        ...about,
                        specializations: about.specializations.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.field}>
                  <label>Title</label>
                  <input
                    value={spec.title}
                    onChange={(e) => {
                      const next = [...about.specializations];
                      next[index] = { ...spec, title: e.target.value };
                      setAbout({ ...about, specializations: next });
                    }}
                  />
                </div>
                <div className={styles.field}>
                  <label>Description</label>
                  <textarea
                    value={spec.description}
                    onChange={(e) => {
                      const next = [...about.specializations];
                      next[index] = { ...spec, description: e.target.value };
                      setAbout({ ...about, specializations: next });
                    }}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() =>
                setAbout({
                  ...about,
                  specializations: [...about.specializations, { title: '', description: '' }],
                })
              }
            >
              + Add Specialization
            </button>

            <h2 style={{ marginTop: '1.5rem' }}>Technical Skills</h2>
            {about.skillGroups.map((group, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3>Skill Group {index + 1}</h3>
                  <button
                    type="button"
                    className={styles.btnDanger}
                    onClick={() =>
                      setAbout({
                        ...about,
                        skillGroups: about.skillGroups.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
                <div className={styles.field}>
                  <label>Category Title</label>
                  <input
                    value={group.title}
                    onChange={(e) => {
                      const next = [...about.skillGroups];
                      next[index] = { ...group, title: e.target.value };
                      setAbout({ ...about, skillGroups: next });
                    }}
                  />
                </div>
                <div className={styles.field}>
                  <label>Skills (comma-separated)</label>
                  <input
                    value={group.items.join(', ')}
                    onChange={(e) => {
                      const next = [...about.skillGroups];
                      next[index] = {
                        ...group,
                        items: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                      };
                      setAbout({ ...about, skillGroups: next });
                    }}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() =>
                setAbout({
                  ...about,
                  skillGroups: [...about.skillGroups, { title: '', items: [] }],
                })
              }
            >
              + Add Skill Group
            </button>

            <div className={styles.actions}>
              <button type="button" className={styles.btnPrimary} onClick={saveAbout} disabled={saving}>
                {saving ? 'Saving...' : 'Save About Page'}
              </button>
            </div>
          </div>
        )}

        {tab === 'profile' && (
          <div className={styles.panel}>
            <h2>Home Page Profile</h2>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Name</label>
                <input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className={styles.field}>
                <label>Title / Tagline</label>
                <input
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label>LinkedIn URL</label>
              <input
                value={profile.linkedin}
                onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label>GitHub URL</label>
              <input
                value={profile.github}
                onChange={(e) => setProfile({ ...profile, github: e.target.value })}
              />
            </div>
            <div className={styles.field}>
              <label>Discord URL</label>
              <input
                value={profile.discord}
                onChange={(e) => setProfile({ ...profile, discord: e.target.value })}
              />
            </div>
            <div className={styles.actions}>
              <button type="button" className={styles.btnPrimary} onClick={saveProfile} disabled={saving}>
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
