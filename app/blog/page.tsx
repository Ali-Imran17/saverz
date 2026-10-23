import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { BlogClient } from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog & Health Guides | Saverz Supermarket & Pharmacy',
  description:
    'Read healthcare advice, first-aid checklists, supermarket savings strategies, and pantry recipes for Karachi households from Saverz Supermarket & Pharmacy.',
  keywords: [
    'Saverz Blog',
    'Pharmacy Blog Karachi',
    'First Aid Checklist Pakistan',
    'Grocery Savings Tips',
    'Karachi Supermarket Guides',
    'Health and Wellness Pakistan',
  ],
  openGraph: {
    title: 'Blog & Health Guides | Saverz Supermarket & Pharmacy',
    description:
      'Expert pharmaceutical advice, pantry storage hacks, and smart grocery shopping guides in Karachi.',
    url: 'https://saverz.pk/blog',
    siteName: 'Saverz Supermarket & Pharmacy',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F9FF] py-20 text-center text-slate-400">Loading Blog...</div>}>
      <BlogClient />
    </Suspense>
  );
}
