import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Turbo Stack - Learning System',
  description: 'A lineage-safe, joyful, exponential learning system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
