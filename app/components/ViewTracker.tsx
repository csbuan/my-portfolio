'use client';

import { useEffect } from 'react';
import {
  COUNT_API,
  VIEWS_KEY,
  VIEW_COUNT_EVENT,
  VIEW_SESSION_KEY,
} from '@/lib/counts';

export default function ViewTracker() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      if (sessionStorage.getItem(VIEW_SESSION_KEY)) return;
      sessionStorage.setItem(VIEW_SESSION_KEY, '1');

      fetch(`${COUNT_API}/hit/${VIEWS_KEY}`)
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
        .then((data: { value?: number }) => {
          if (typeof data.value === 'number') {
            window.dispatchEvent(
              new CustomEvent<number>(VIEW_COUNT_EVENT, { detail: data.value })
            );
          }
        })
        .catch((err) => console.error('Error recording site view:', err));
    } catch {
      /* sessionStorage unavailable */
    }
  }, []);

  return null;
}
