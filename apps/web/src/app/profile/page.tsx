import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="p-6">
      <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Home
      </Link>
      
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-gray-600">
        Profile page - Authentication required
      </p>
    </div>
  );
}
