'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

export default function HomePage() {
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace('/profile');
    }
  }, [token, router]);

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='bg-white p-6 rounded shadow w-full max-w-sm flex flex-col items-center'>
        <h1 className='text-2xl font-bold mb-4'>Home</h1>
        <h2 className='font-bold mb-4 text-gray-600'>
          Next.js, TailwindCSS, NestJS, Passport
        </h2>
        <div className='flex gap-4'>
          <button
            onClick={() => router.push('/login')}
            className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
          >
            Login
          </button>
          <button
            onClick={() => router.push('/register')}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          >
            Register
          </button>
        </div>
      </div>
    </main>
  );
}
