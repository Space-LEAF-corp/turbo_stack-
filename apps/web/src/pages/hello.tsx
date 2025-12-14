/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';

export default function Hello() {
  const [backendMessage, setBackendMessage] = useState<string>('');
  const [dbEntry, setDbEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from backend
    fetch('http://localhost:3001/api/hello')
      .then(res => res.json())
      .then(data => {
        setBackendMessage(data.message);
        if (data.logEntry) {
          setDbEntry(data.logEntry);
        }
      })
      .catch(err => console.error('Backend error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-center animate-pulse">
          🚀 Captain's Log Online
        </h1>
        
        <div className="space-y-6">
          {/* Frontend Status */}
          <div className="bg-green-900/30 border border-green-500 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">✅ Frontend</h2>
            <p className="text-green-300">Next.js page loaded successfully</p>
          </div>

          {/* Backend Status */}
          <div className={`border rounded-lg p-6 ${
            backendMessage 
              ? 'bg-green-900/30 border-green-500' 
              : 'bg-yellow-900/30 border-yellow-500'
          }`}>
            <h2 className="text-2xl font-semibold mb-2">
              {backendMessage ? '✅' : '⏳'} Backend
            </h2>
            {loading ? (
              <p className="text-yellow-300">Connecting to backend...</p>
            ) : backendMessage ? (
              <p className="text-green-300">{backendMessage}</p>
            ) : (
              <p className="text-red-300">Backend not responding</p>
            )}
          </div>

          {/* Database Status */}
          <div className={`border rounded-lg p-6 ${
            dbEntry 
              ? 'bg-green-900/30 border-green-500' 
              : 'bg-yellow-900/30 border-yellow-500'
          }`}>
            <h2 className="text-2xl font-semibold mb-2">
              {dbEntry ? '✅' : '⏳'} Database
            </h2>
            {loading ? (
              <p className="text-yellow-300">Checking database...</p>
            ) : dbEntry ? (
              <div className="text-green-300">
                <p className="font-semibold">Database connected!</p>
                <div className="mt-2 bg-black/30 p-3 rounded">
                  <p className="text-sm">Latest Log Entry:</p>
                  <p className="text-xs opacity-80">ID: {dbEntry.id}</p>
                  <p>"{dbEntry.content}"</p>
                  <p className="text-xs opacity-60 mt-1">
                    Logged: {new Date(dbEntry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-yellow-300">Database not configured (install Docker & run migrations)</p>
            )}
          </div>

          {/* Full Loop Status */}
          <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6 text-center">
            <h2 className="text-3xl font-bold mb-2">
              {backendMessage && dbEntry ? '🎉' : '🔄'} Full Stack Loop
            </h2>
            <p className="text-lg">
              {backendMessage && dbEntry 
                ? 'Frontend → Backend → Database: ALL SYSTEMS GO!'
                : 'Setting up connections...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
