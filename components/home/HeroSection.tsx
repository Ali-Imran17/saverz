'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles, ShieldCheck, Truck, Store } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F8F9FF] via-[#F3ECFF] to-[#FBE5F5] py-12 md:py-20 lg:py-24 border-b border-slate-100">
      {/* Decorative gradient blur rings */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E9D9FF]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FBE5F5]/60 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
           

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#102B5C] tracking-tight leading-[1.12]">
              Fresh Groceries.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#173C78] via-[#8B2FA3] to-[#EC70C9]">
                Better Living.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Discover fresh groceries, delicious snacks, everyday essentials, children&apos;s toys, and fine crockery — all in one convenient place with unmatched value and fast doorstep delivery.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#EC70C9] hover:bg-[#d85ab5] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-lg shadow-[#EC70C9]/25 hover:shadow-xl transition-all active:scale-95"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#102B5C] font-bold text-base px-7 py-4 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow transition-all"
              >
                <Store className="w-5 h-5 text-[#173C78]" />
                <span>Explore Categories</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-8 border-t border-slate-200/60 grid grid-cols-3 gap-4 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#102B5C]">250+</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  Catalogue Items
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#173C78]">5 Core</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  Aisle Categories
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-[#EC70C9]">Karachi</span>
                <span className="text-xs text-slate-500 font-medium mt-0.5">
                  Local Delivery
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Supermarket Basket Imagery */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Outer soft glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E9D9FF] to-[#FBE5F5] rounded-3xl transform rotate-2 scale-105 opacity-70 filter blur-sm" />

              {/* Main Image Frame */}
              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                <img
                  src="/images/hero-basket.jpg"
                  alt="Saverz Supermarket fresh grocery basket"
                  className="w-full h-auto object-cover rounded-2xl transform hover:scale-102 transition-transform duration-500"
                />

                {/* Floating promo badge on basket */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F3ECFF] flex items-center justify-center text-[#EC70C9]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#102B5C]">100% Quality Assured</p>
                    <p className="text-[11px] text-slate-500">Everyday essentials delivered fresh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
