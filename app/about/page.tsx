import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Store,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  Truck,
  HeartHandshake,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Saverz Supermarket',
  description:
    'Learn about Saverz Supermarket in Model Colony, Karachi — providing fresh groceries, snacks, toys, crockery, and everyday essentials at great value.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#F8F9FF]">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-[#102B5C] via-[#173C78] to-[#6B21A8] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EC70C9]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-[#E9D9FF] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#EC70C9]" />
            <span>Serving Model Colony & Karachi</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
            About Saverz Supermarket
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            Your neighborhood online supermarket dedicated to simplifying grocery shopping with fresh essentials, everyday savings, and reliable doorstep service.
          </p>
        </div>
      </section>

      {/* Main Narrative & Philosophy */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Story text */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-[#173C78] uppercase tracking-wider bg-[#F3ECFF] px-3 py-1 rounded-full">
                Our Purpose
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight mt-3">
                Making Quality Everyday Essentials Accessible to Every Household
              </h2>
              <div className="mt-5 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>
                  At <strong>Saverz Supermarket</strong>, our focus is simple: provide families in Model Colony and Karachi with a reliable, friendly, and comprehensive online storefront where they can purchase fresh food staples, favourite snacks, safe children&apos;s toys, elegant crockery, and daily household cleaning supplies without unnecessary markups or hassle.
                </p>
                <p>
                  We understand that daily groceries are at the heart of home life. Whether you need aged basmati rice and pure cooking oil for family dinners, biscuits and teas for evening guests, learning blocks for your children, or laundry detergent for the week, Saverz ensures every item is stocked fresh and priced fairly.
                </p>
                <p>
                  By connecting digital convenience with physical supermarket curation, we make weekly and monthly grocery runs easier, faster, and more transparent.
                </p>
              </div>

              {/* Physical Location Point */}
              <div className="mt-8 p-4 rounded-2xl bg-[#F8F9FF] border border-slate-200 flex items-start gap-3 text-xs sm:text-sm text-[#102B5C]">
                <MapPin className="w-5 h-5 text-[#EC70C9] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">Physical Hub & Customer Support:</strong>
                  <span>W53M+77F, Liaquat Ali Khan Rd, Model Colony Sheet 4 Lasi Para, Karachi, Pakistan.</span>
                </div>
              </div>
            </div>

            {/* Right Side Visual Accent */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80"
                  alt="Saverz Supermarket aisles"
                  className="w-full h-80 object-cover"
                />
                <div className="p-6 bg-[#102B5C] text-white">
                  <h3 className="font-bold text-base text-[#E9D9FF]">Saverz Model Colony Hub</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Carefully packing your fresh pantry items and household necessities daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-16 sm:py-20 bg-[#F8F9FF] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-[#173C78] uppercase tracking-wider bg-white px-3 py-1 rounded-full border border-slate-200">
              Our Core Commitments
            </span>
            <h2 className="text-3xl font-black text-[#102B5C] tracking-tight mt-3">
              What Defines the Saverz Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#FBE5F5] text-[#EC70C9] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#102B5C] mb-2">Authentic Products</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We only source genuine brands from reputable Pakistani manufacturers and authorized suppliers. No compromises on pantry freshness or quality.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#F3ECFF] text-[#173C78] flex items-center justify-center mb-5">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#102B5C] mb-2">Honest, Competitive Pricing</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We maintain genuine retail pricing in PKR across every department. Customers always receive clear pricing, itemized invoices, and transparent discounts.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#E9D9FF] text-[#102B5C] flex items-center justify-center mb-5">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#102B5C] mb-2">Friendly Customer Care</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Direct phone support at (021) 34500444 seven days a week. We stand behind our customer community with prompt resolutions and courteous service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Shop CTA */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-[#102B5C] to-[#173C78] rounded-3xl p-10 sm:p-14 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#EC70C9]/10 rounded-full blur-2xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              Ready to Explore Our Aisles?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
              Browse 250+ products across Food Items, Snacks, Toys, Crockery, and Household essentials with instant cart management.
            </p>

            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 bg-[#EC70C9] hover:bg-[#d65bb4] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl transition-all active:scale-95"
              >
                <span>Shop the Catalogue Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
