'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main style={{ padding: '4rem 1.5rem', textAlign: 'center', color: 'var(--color-ivory)' }}>
      <h1 style={{ marginBottom: '1rem' }}>Something went wrong</h1>
      <p style={{ marginBottom: '1.5rem', color: 'var(--color-muted)' }}>
        An error occurred while loading this page.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          padding: '0.75rem 1.5rem',
          border: 'none',
          borderRadius: '8px',
          background: 'var(--gradient-cta)',
          color: 'var(--color-navy)',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </main>
  );
}
