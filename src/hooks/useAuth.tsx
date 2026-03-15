import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api, setToken, removeToken, getStoredUser, setStoredUser, removeStoredUser } from '@/lib/api';
import { AppRole } from '@/types/database';

interface AuthUser {
  id: number;
  full_name: string;
  email: string;
  role: AppRole;
}

interface AuthContextType {
  user: AuthUser | null;
  role: AppRole | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, role: AppRole) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore user from localStorage
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
      setRole(stored.role);
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: AppRole) => {
    try {
      const data = await api.post('/auth/register', {
        full_name: fullName,
        email,
        password,
        role,
      });
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await api.post('/auth/login', { email, password });
      setToken(data.token);
      setStoredUser(data.user);
      setUser(data.user);
      setRole(data.user.role);
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    removeToken();
    removeStoredUser();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
