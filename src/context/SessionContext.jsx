import * as React from 'react';
import { ACCOUNT_CONFIG } from '../config';

// Create Session Context
const SessionContext = React.createContext(null);

/**
 * SessionProvider - Provides authentication session context
 * In a real app, this would integrate with your auth provider (Auth.js, Firebase, etc.)
 * Configuration is loaded from account.config.js
 */
export function SessionProvider({ children }) {
  const [session, setSession] = React.useState(() => {
    // Use mock user from config if available
    if (ACCOUNT_CONFIG.mockUser) {
      return { user: ACCOUNT_CONFIG.mockUser };
    }
    return null;
  });

  const signIn = React.useCallback(() => {
    // In a real app, this would trigger your auth flow
    if (ACCOUNT_CONFIG.mockUser) {
      setSession({ user: ACCOUNT_CONFIG.mockUser });
    }
    console.log('User signed in');
  }, []);

  const signOut = React.useCallback(() => {
    // In a real app, this would clear auth tokens and session
    setSession(null);
    console.log('User signed out');
  }, []);

  const value = React.useMemo(
    () => ({
      session,
      signIn,
      signOut,
    }),
    [session, signIn, signOut]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

/**
 * useSession - Hook to access session context
 */
export function useSession() {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export default SessionContext;
