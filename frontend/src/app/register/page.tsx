'use client';

import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useUnprotectedPage } from '../hooks/UseUnprotectedPage';

const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setToken } = useAuth();
  const router = useRouter();
  const { loadingContent } = useUnprotectedPage();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/register', { email, password });
      const res = await axios.post('http://localhost:3001/auth/login', { email, password });
      const accessToken = res.data.access_token;
      if (accessToken) {
        setToken(accessToken);
        router.push('/profile');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Register failed');
    }
  };

  if (loadingContent) {
    return loadingContent;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <h1 className='text-2xl font-bold mb-6'>Register</h1>
      <form
        onSubmit={handleRegister}
        className='bg-white p-6 rounded shadow w-full max-w-sm'
      >
        <div className='mb-4'>
          <label className='block mb-2 font-semibold'>Email</label>
          <input
            type='email'
            className='border p-2 w-full'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your email'
          />
        </div>
        <div className='mb-4'>
          <label className='block mb-2 font-semibold'>Password</label>
          <input
            type='password'
            className='border p-2 w-full'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Your password'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
