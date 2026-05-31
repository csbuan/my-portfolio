'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AdminContextValue {
  isAdmin: boolean;
  loading: boolean;
  refreshSession: () => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextValue>({
  isAdmin: false,
  loading: true,
  refreshSession: async () => {},
  logout: async () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      setIsAdmin(Boolean(data.authenticated));
    } catch {
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsAdmin(false);
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  return (
    <AdminContext.Provider value={{ isAdmin, loading, refreshSession, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
