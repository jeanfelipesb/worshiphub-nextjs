'use client'

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
