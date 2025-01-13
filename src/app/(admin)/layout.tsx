'use client';

import { SessionProvider } from 'next-auth/react';

export default function AdminLayout(props: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <html lang='en' data-mode='light'>
        <body>{props.children}</body>
      </html>
    </SessionProvider>
  );
}
