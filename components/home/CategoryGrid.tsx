'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export function CategoryGrid() {
  return (
    <section id="categories" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173C78] bg-[#F3ECFF] px-3 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#EC70C9]" />
              <span>Explore Supermarket Aisles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-xl">
              From pantry staples and teatime treats to kitchenware and children&apos;s toys, browse our curated selections.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#173C78] hover:text-[#EC70C9] transition-colors"
          >
            <span>View All 250+ Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              className="group bg-[#F8F9FF] rounded-2xl border border-slate-100 p-4 flex flex-col justify-between hover:bg-white hover:border-[#E9D9FF] hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Category Image */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white p-3 mb-4 border border-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-2 right-2 bg-[#102B5C] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                  {cat.productCount}+ items
                </span>
              </div>

              {/* Category Info */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-[#102B5C] group-hover:text-[#173C78] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#173C78] group-hover:text-[#EC70C9] transition-colors">
                  <span>Browse aisle</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
