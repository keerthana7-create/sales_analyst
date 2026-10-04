import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Sales Analytics Dashboard',
  description:
    'A modern, professional sales analytics dashboard tracking performance, monthly trends, category breakdowns, and threshold targets from 2022 to 2024.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
