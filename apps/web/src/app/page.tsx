import Link from 'next/link';

export default function Home() {
  return (
    <main 
      className="flex min-h-screen flex-col items-center justify-center p-24 relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2071&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="text-center relative z-10">
        <h1 className="text-6xl font-bold mb-4 tracking-wider" style={{ color: '#2dd4bf' }}>
          SPACE LEAF CORP
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          Reaching for the stars, protecting what matters
        </p>
        
        <div className="flex gap-3 justify-center">
          <Link
            href="/login"
            className="px-6 py-2 bg-white bg-opacity-90 border-2 border-emerald-500 text-emerald-900 rounded-lg hover:bg-emerald-50 transition font-semibold"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
