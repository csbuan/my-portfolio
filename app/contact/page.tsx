'use client';

import { FormEvent, useState } from 'react';
import styles from './contact.module.css';
import NavBar from '../components/NavBar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/buancamillee@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact Form: ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json();
      if (!response.ok || result?.success !== 'true') {
        throw new Error('Form submission failed');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitError('Sorry, message failed to send. Please email me directly at buancamillee@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className={styles.main}>
      <NavBar />

      <section className={styles.container}>
        <h1>Get In Touch</h1>
        <p className={styles.subtitle}>Feel free to reach out. I&apos;m always open to new opportunities and interesting projects.</p>

        <div className={styles.content}>
          <div className={styles.contactInfo}>
            <h2>Contact Information</h2>
            <div className={styles.infoItem}>
              <h3>Email</h3>
              <a href="mailto:buancamillee@gmail.com">buancamillee@gmail.com</a>
            </div>
            <div className={styles.infoItem}>
              <h3>LinkedIn</h3>
              <a href="https://www.linkedin.com/in/camillebuan/" target="_blank" rel="noopener noreferrer">
                linkedin.com/in/camillebuan
              </a>
            </div>
            <div className={styles.infoItem}>
              <h3>GitHub</h3>
              <a href="https://github.com/csbuan" target="_blank" rel="noopener noreferrer">
                github.com/csbuan
              </a>
            </div>
            <div className={styles.infoItem}>
              <h3>Discord</h3>
              <a href="https://discord.com/users/871335959483015210" target="_blank" rel="noopener noreferrer">
                @csbuan
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

            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitted && (
              <p className={styles.successMessage}>
                Thanks for reaching out! I&apos;ll get back to you soon.
              </p>
            )}
            {submitError && (
              <p className={styles.errorMessage}>{submitError}</p>
            )}
          </form>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>&copy; 2023 Camille Buan. All rights reserved.</p>
      </footer>
    </main>
  );
}
