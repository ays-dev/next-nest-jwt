'use client';

import { useRouter } from 'next/navigation';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useProtectedPage } from '../hooks/UseProtectedPage';

const ProfilePage: FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const { token, setToken } = useAuth();
  const router = useRouter();
  const { loadingContent } = useProtectedPage();

  useEffect(() => {
    if (token) {
      getUserProfile();
    }
  }, [token]);

  const getUserProfile = async () => {
    try {
      const res = await axios.get('http://localhost:3001/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserEmail(res.data.email || '');
    } catch (error) {
      alert('Not authorized or token invalid');
    }
  }

  const handleLogout = () => {
    setToken(null);
    router.push('/login');
  };

  if (loadingContent) {
    return loadingContent;
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <div className='bg-white p-6 rounded shadow w-full max-w-sm flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-bold'>Profile Page</h1>
        <p className='text-lg'>User Email: {userEmail}</p>
        <button
          onClick={handleLogout}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          Logout
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
