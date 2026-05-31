'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#0a1d4b', color: '#f7ebe0', fontFamily: 'system-ui, sans-serif' }}>
        <main style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ marginBottom: '1rem' }}>Something went wrong</h1>
          <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>
            {error.message || 'An unexpected error occurred.'}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              background: '#cc9e4a',
              color: '#0a1d4b',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
