'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { allProducts, getFeaturedProducts } from '@/data/products';
import { ProductCategory } from '@/types';

export function FeaturedProducts() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');

  const categoriesTab = [
    { id: 'all', label: 'All Picks' },
    { id: 'food-items', label: 'Food Items' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'toys', label: 'Toys' },
    { id: 'crockery', label: 'Crockery' },
    { id: 'household', label: 'Household' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? getFeaturedProducts(12)
      : allProducts
          .filter((p) => p.category === selectedCategory && (p.featured || p.badge))
          .slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-[#F8F9FF] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173C78] bg-[#E9D9FF] px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#EC70C9]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight">
              Popular Picks for You
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
              Hand-picked bestsellers and daily essentials loved by households across Karachi.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white hover:bg-[#F3ECFF] text-[#102B5C] border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 text-[#EC70C9]" />
          </Link>
        </div>

        {/* Category Filters Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categoriesTab.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as ProductCategory | 'all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#102B5C] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-[#F3ECFF] border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#173C78] hover:bg-[#102B5C] text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Explore Entire Store Catalogue (250+ Items)</span>
            <ArrowRight className="w-4 h-4 text-[#EC70C9]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
