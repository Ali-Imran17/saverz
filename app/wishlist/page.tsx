'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowRight, ChevronRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/products/ProductCard';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-[#102B5C] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#102B5C] font-semibold">Wishlist</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight">
            My Wishlist
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Items you have saved for later from our supermarket catalogue.
          </p>
        </div>

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center flex flex-col items-center justify-center my-8 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-[#FBE5F5] flex items-center justify-center text-[#EC70C9] mb-5 shadow-inner">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-[#102B5C]">Your Wishlist is Empty</h2>
          <p className="text-sm text-slate-500 max-w-md mt-2 mb-8 leading-relaxed">
            Click the heart icon on any product in our supermarket catalogue to save it here for quick access later.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#173C78] hover:bg-[#102B5C] text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#EC70C9]" />
            <span>Explore Products</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
