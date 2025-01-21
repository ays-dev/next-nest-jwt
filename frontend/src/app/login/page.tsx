'use client';

import React, { FC, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useUnprotectedPage } from '../hooks/UseUnprotectedPage';

const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setToken } = useAuth();
  const { loadingContent } = useUnprotectedPage();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
      const accessToken = res.data.access_token;
      if (accessToken) {
        setToken(accessToken);
        alert('Login success! Token: ' + accessToken);
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  if (loadingContent) {
    return loadingContent;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50'>
      <h1 className='text-2xl font-bold mb-6'>Login</h1>
      <form
        onSubmit={handleLogin}
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
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
