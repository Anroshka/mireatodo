import './globals.css';
import { Providers } from './providers';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'Простое Todo приложение с поддержкой темной темы',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
} 