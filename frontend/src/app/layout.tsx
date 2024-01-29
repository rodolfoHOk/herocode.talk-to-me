import type { Metadata } from 'next';
import { Rubik, Inter } from 'next/font/google';
import './globals.css';

export const rubik = Rubik({ subsets: ['latin'] });

export const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Talk to Me',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${rubik.className} bg-app-gray-950 text-app-white`}>
        {children}
      </body>
    </html>
  );
}
