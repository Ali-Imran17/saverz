import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/ui/Toast';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Saverz Supermarket & Pharmacy | Fresh Groceries & Everyday Essentials in Karachi',
    template: '%s | Saverz Supermarket & Pharmacy',
  },
  description:
    'Saverz Supermarket & Pharmacy is your premium online supermarket and pharmacy in Model Colony, Karachi. Shop fresh staples, genuine medicines, healthcare items, snacks, toys, crockery, and household products with reliable doorstep delivery.',
  keywords: [
    'Saverz Supermarket & Pharmacy',
    'Online Pharmacy Karachi',
    'Online Grocery Karachi',
    'Model Colony Supermarket',
    'Medicines Delivery Karachi',
    'Fresh Groceries',
    'Snacks',
    'Toys',
    'Crockery',
    'Household items Pakistan',
    'Saverz',
  ],
  authors: [{ name: 'Saverz Supermarket & Pharmacy' }],
  metadataBase: new URL('https://saverz.pk'),
  openGraph: {
    title: 'Saverz Supermarket & Pharmacy | Fresh Groceries & Health Essentials',
    description:
      'Shop 300+ products across food staples, genuine medicines, snacks, toys, crockery, and daily household essentials in Karachi.',
    url: 'https://saverz.pk',
    siteName: 'Saverz Supermarket & Pharmacy',
    locale: 'en_PK',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#F8F9FF] text-[#102B5C] antialiased selection:bg-[#F3ECFF] selection:text-[#102B5C]">
        <CartProvider>
          <WishlistProvider>
            {/* Announcement Top Bar */}
            <AnnouncementBar />

            {/* Main Sticky Navigation wrapped in Suspense */}
            <Suspense fallback={<div className="h-16 bg-white border-b border-slate-100" />}>
              <Navbar />
            </Suspense>

            {/* Main Page Content */}
            <main className="flex-1">{children}</main>

            {/* Global Toast Notification */}
            <Toast />

            {/* Site Footer */}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
