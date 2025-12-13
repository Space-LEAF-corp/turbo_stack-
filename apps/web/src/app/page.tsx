import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Turbo Stack
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A lineage-safe, joyful, exponential learning system
        </p>
        
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
      </div>
    </main>
  );
}
