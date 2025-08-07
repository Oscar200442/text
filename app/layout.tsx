import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '3D Coverflow Chatbot',
  description: 'A revolutionary chatbot with stunning 3D coverflow effects',
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
