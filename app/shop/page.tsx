import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ShopClient } from './ShopClient';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shop All Products | Saverz Supermarket',
  description:
    'Browse our comprehensive catalogue of 250+ supermarket products across food items, snacks, toys, crockery, and daily household supplies in Karachi.',
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-[#173C78] bg-[#F3ECFF] px-4 py-2 rounded-full animate-pulse">
            <Sparkles className="w-4 h-4 text-[#EC70C9]" />
            <span>Loading Saverz Supermarket Catalogue...</span>
          </div>
        </div>
      }
    >
      <ShopClient />
    </Suspense>
  );
}
