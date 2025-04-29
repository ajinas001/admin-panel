'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { resetPassword } from '../util/login-api';

export default function Forgot() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      setIsError(true);
      setTimeout(() => router.push('/'), 2000);
      return;
    }

    try {
      const res = await resetPassword({ email, newPassword, confirmPassword });
      setMessage(res.message || 'Password changed successfully!');
      setIsError(false);
    } catch (err) {
      setMessage(err.message || 'Something went wrong.');
      setIsError(true);
    } finally {
      setTimeout(() => router.push('/'), 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full hidden sm:block">
          <img
            src="/images/background.png"
            alt="Background Pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute w-full h-full block sm:hidden">
          <img
            src="/images/background-mobile.png"
            alt="Mobile Background Pattern"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Form */}
      <div className="relative z-10 w-[470px] bg-white rounded-2xl border border-gray-200 p-8 mx-4">
        <div className="flex justify-start py-8">
          <div className="flex justify-center">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-30 h-30 object-contain"
            />
          </div>
          <div className="text-start mt-12">
            <h2 className="text-2xl font-semibold">Forgot Password</h2>
          </div>
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 text-sm">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="estaban_schiller@gmail.com"
              className="text-sm mt-1 w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">New Password</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm">Confirm Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••"
              className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-md outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {message && (
            <p className={`text-sm ${isError ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className="my-10 py-2 mx-10 px-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
}
