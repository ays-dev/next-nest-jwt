'use client';

import { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

type UseUnprotectedResult = {
  loadingContent: JSX.Element | null;
};

export const useUnprotectedPage = (): UseUnprotectedResult => {
  const { isInitialized, token } = useAuth();
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isInitialized && token) {
      setRedirecting(true);
      router.replace('/profile');
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
