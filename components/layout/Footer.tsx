'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Phone,
  MapPin,
  Clock,
  Mail,
  Send,
  Heart,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#102B5C] text-slate-300 pt-16 pb-12 border-t border-[#173C78]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-[#173C78]/70">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#173C78] flex items-center justify-center text-[#EC70C9] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Quality Products</h4>
              <p className="text-xs text-slate-400 mt-1">
                Hand-picked grocery staples, authentic brands & kitchenware.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#173C78] flex items-center justify-center text-[#E9D9FF] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Better Prices</h4>
              <p className="text-xs text-slate-400 mt-1">
                Pocket-friendly supermarket retail rates on everyday items.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#173C78] flex items-center justify-center text-[#EC70C9] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Convenient Shopping</h4>
              <p className="text-xs text-slate-400 mt-1">
                Swift delivery across Karachi, free on orders above Rs. 2,500.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#173C78] flex items-center justify-center text-[#E9D9FF] shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Open 7 Days a Week</h4>
              <p className="text-xs text-slate-400 mt-1">
                Serving Model Colony & Karachi daily from 9:00 AM to 11:00 PM.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-[#173C78]/70">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block group bg-white/95 hover:bg-white px-3.5 py-2 rounded-2xl shadow-md transition-all"
              aria-label="Saverz Supermarket Home"
            >
              <img
                src="/images/Saverz Supermarket Logo.png"
                alt="Saverz Supermarket"
                className="h-10 sm:h-11 w-auto object-contain"
              />
            </Link>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Saverz Supermarket is an online supermarket delivering fresh groceries, snacks, toys, crockery, and daily household essentials straight to your doorstep in Karachi.
            </p>

            <div className="mt-6 flex flex-col gap-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#EC70C9] shrink-0 mt-0.5" />
                <span>
                  W53M+77F, Liaquat Ali Khan Rd, Model Colony Sheet 4 Lasi Para, Karachi
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E9D9FF] shrink-0" />
                <a
                  href="tel:02134500444"
                  className="hover:text-white font-semibold text-slate-200 transition-colors"
                >
                  (021) 34500444
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-[#EC70C9] shrink-0" />
                <span>Mon – Sun: 9:00 AM – 11:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/" className="hover:text-[#EC70C9] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#EC70C9] transition-colors">
                  Shop All Products (250+)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#EC70C9] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#EC70C9] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#EC70C9] transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-[#EC70C9] transition-colors">
                  Checkout Demo
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#EC70C9] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
              Categories
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/shop?category=${cat.id}`}
                    className="hover:text-[#E9D9FF] transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-slate-500">
                      ({cat.productCount})
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h5 className="text-white font-bold text-sm uppercase tracking-wider mb-2">
              Stay Updated
            </h5>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Subscribe to get notified about weekly deals, fresh arrivals, and exclusive discount codes.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-[#173C78]/70 border border-[#173C78] text-white placeholder-slate-400 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:border-[#EC70C9] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#EC70C9] to-[#173C78] hover:opacity-90 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-opacity flex items-center justify-center gap-2 shadow"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>

              {isSubscribed && (
                <div className="p-2.5 bg-[#173C78] text-[#E9D9FF] rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-[#EC70C9] shrink-0" />
                  <span>Subscribed! Demo state recorded locally.</span>
                </div>
              )}
            </form>

            <p className="text-[11px] text-slate-400 mt-3">
              Note: Prototype demonstration. No unsolicited promotional emails are sent.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 <strong className="text-white">Saverz Supermarket</strong>. All rights reserved. • Liaquat Ali Khan Rd, Model Colony, Karachi.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400">Supported Demo Payments:</span>
            <span className="px-2 py-1 bg-[#173C78] text-white rounded text-[10px] font-bold">
              Cash on Delivery
            </span>
            <span className="px-2 py-1 bg-[#173C78] text-[#E9D9FF] rounded text-[10px] font-bold">
              EasyPaisa
            </span>
            <span className="px-2 py-1 bg-[#173C78] text-white rounded text-[10px] font-bold">
              Bank Transfer
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
