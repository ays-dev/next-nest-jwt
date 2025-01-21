'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

type AuthContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
  isInitialized: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  isInitialized: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setTokenState(storedToken);
    }
    setIsInitialized(true);
  }, []);

  function setToken(newToken: string | null) {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(newToken);
  }

  return (
    <AuthContext value={{ token, setToken, isInitialized }}>
      {children}
    </AuthContext>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
}
