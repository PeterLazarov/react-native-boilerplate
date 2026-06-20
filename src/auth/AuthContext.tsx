import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { tokenStorage } from './tokenStorage';

type AuthStatus = 'loading' | 'signedIn' | 'signedOut';

interface AuthContextValue {
  status: AuthStatus;
  // Placeholder shape — real OTP/password sign-in lands in Phase 1 (see PLAN.md).
  signIn: (tokens: { accessToken: string; refreshToken: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    // Rehydrate session on launch by checking for a stored token.
    tokenStorage
      .getAccessToken()
      .then((t) => setStatus(t ? 'signedIn' : 'signedOut'))
      .catch(() => setStatus('signedOut'));
  }, []);

  async function signIn(tokens: { accessToken: string; refreshToken: string }) {
    await tokenStorage.setTokens(tokens.accessToken, tokens.refreshToken);
    setStatus('signedIn');
  }

  async function signOut() {
    await tokenStorage.clear();
    setStatus('signedOut');
  }

  return (
    <AuthContext.Provider value={{ status, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
}
