
import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { Toaster } from "@repo/ui/components/ui/sonner"
import Head from "next/head";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Featherstats',
    default: 'Featherstats | Lightweight Web Analytics',
  },
  robots: { index: false, follow: false }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        {process.env.NEXT_PUBLIC_FEATHERSTATS_KEY && <Script src={`https://app.featherstats.com/tracker.js?key=${process.env.NEXT_PUBLIC_FEATHERSTATS_KEY}`} />}
      </Head>
      <body className={inter.className}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
