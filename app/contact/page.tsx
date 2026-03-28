'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import styles from './contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement form submission (e.g., send email service)
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className={styles.main}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>Portfolio</Link>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </nav>

      <section className={styles.container}>
        <h1>Get In Touch</h1>
        <p className={styles.subtitle}>Feel free to reach out. I&apos;m always open to new opportunities and interesting projects.</p>

        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <h2>Contact Information</h2>
            <div className={styles.infoItem}>
              <h3>Email</h3>
              <a href="mailto:your.email@example.com">your.email@example.com</a>
            </div>
            <div className={styles.infoItem}>
              <h3>LinkedIn</h3>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/yourprofile
              </a>
            </div>
            <div className={styles.infoItem}>
              <h3>GitHub</h3>
              <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer">
                github.com/yourprofile
              </a>
            </div>
            <div className={styles.infoItem}>
              <h3>Twitter</h3>
              <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                @yourprofile
              </a>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Send Me a Message</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project..."
                rows={5}
              ></textarea>
            </div>

            <button type="submit" className={styles.submitButton}>
              Send Message
            </button>

            {submitted && (
              <p className={styles.successMessage}>
                Thanks for reaching out! I&apos;ll get back to you soon.
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2024 My Portfolio. All rights reserved.</p>
      </footer>
    </main>
  );
}
