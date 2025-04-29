'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from './util/login-api';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await login(email, password);

      if (email === 'admin@gmail.com' && password === 'admin@1234') {
        router.push('/dashboard'); 
      } else {
        setError('Invalid credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
    finally {
      router.push('/dashboard'); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Backgrounds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full hidden sm:block">
          <img src="/images/background.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute w-full h-full block sm:hidden">
          <img src="/images/background-mobile.png" alt="Mobile Background" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Form */}
      <div className="relative z-10 w-[470px] bg-white rounded-2xl border border-gray-200 p-8 mx-4">
        <div className="flex justify-between py-8">
          <div className="flex justify-center">
            <img src="/images/logo.png" alt="Logo" className="w-30 h-30 object-contain" />
          </div>
          <div className="text-start mt-6">
            <h2 className="text-2xl font-semibold">Login to Account</h2>
            <p className="text-gray-500 text-sm">Please enter your email and password to continue</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <div>
            <label className="text-gray-700 text-sm">Email address:</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm mt-1 w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-gray-700 text-sm">Password</label>
              <Link href="/forgot" className="text-sm text-gray-500 hover:underline">
                Forget Password?
              </Link>
            </div>
            <input
              type="password"
              placeholder=". . . . . ."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-500 text-sm">
              Remember password
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="py-2 mx-10 px-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
