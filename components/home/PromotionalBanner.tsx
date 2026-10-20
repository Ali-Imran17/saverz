'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';

export function PromotionalBanner() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#F3ECFF] via-[#E9D9FF] to-[#FBE5F5] border border-[#E9D9FF] p-8 sm:p-12 lg:p-16 shadow-lg">
          {/* Background decorative circles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#EC70C9]/10 rounded-full blur-xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full text-xs font-bold text-[#102B5C] shadow-sm mb-4">
                <Tag className="w-3.5 h-3.5 text-[#EC70C9]" />
                <span>Special Supermarket Collection • Model Colony</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#102B5C] tracking-tight leading-tight">
                Your Everyday Essentials, <br className="hidden sm:inline" />
                <span className="text-[#173C78]">All in One Place</span>
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed">
                Stock up on premium basmati rice, cooking oils, snacks for teatime, safe children&apos;s toys, elegant crockery, and household cleaning supplies at genuine retail prices.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2.5 bg-[#102B5C] hover:bg-[#173C78] text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-md transition-all active:scale-95"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight className="w-5 h-5 text-[#EC70C9]" />
                </Link>

                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-2xl border border-slate-200/80 text-xs font-semibold text-[#102B5C]">
                  <ShieldCheck className="w-4 h-4 text-[#EC70C9]" />
                  <span>Use coupon code <strong>SAVERZ10</strong> for 10% off</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Items */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
                  alt="Saverz Supermarket fresh products"
                  className="w-full h-56 sm:h-64 object-cover"
                />
                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#102B5C]">Fresh Daily Stock</p>
                    <p className="text-[11px] text-slate-500">Model Colony, Karachi</p>
                  </div>
                  <span className="text-xs font-black text-[#EC70C9] bg-[#FBE5F5] px-2.5 py-1 rounded-lg">
                    Best Value
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
