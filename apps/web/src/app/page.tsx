'use client';

import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        {user && (
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Welcome back, <span className="font-semibold">{user.email}</span>!
            </p>
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Turbo Stack
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A lineage-safe, joyful, exponential learning system
        </p>
        
        <div className="flex gap-4 justify-center mb-8">
          <Link
            href="/hello"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Captain's Log
          </Link>
          <Link
            href="/learn"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Start Learning
          </Link>
        </div>

        {user ? (
          <div className="flex gap-3 justify-center">
            <Link
              href="/profile"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-sm"
            >
              View Profile
            </Link>
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <Link
              href="/login"
              className="px-6 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
