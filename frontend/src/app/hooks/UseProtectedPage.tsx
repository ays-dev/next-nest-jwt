'use client';

import { useRouter } from 'next/navigation';
import { JSX, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

type UseProtectedResult = {
  loadingContent: JSX.Element | null;
};

export const useProtectedPage = (): UseProtectedResult  => {
  const { isInitialized, token } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isInitialized && !token) {
      setRedirecting(true);
      router.replace('/register');
    }
  }, [isInitialized, token, router]);

  if (!isInitialized) {
    return {
      loadingContent: (
        <div className='min-h-screen flex items-center justify-center'>
          Initializing...
        </div>
      ),
    };
  }

  if (redirecting) {
    return {
      loadingContent: (
        <div className='min-h-screen flex items-center justify-center'>
          Redirecting...
        </div>
      ),
    };
  }

  return { loadingContent: null };
}
