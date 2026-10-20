'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, MapPin, Sparkles, ChevronRight } from 'lucide-react';

const announcements = [
  'Fresh Products, Better Prices • Your Everyday Essentials in Model Colony, Karachi',
  'Special Launch Offer: Use promo code SAVERZ10 for 10% OFF your entire cart!',
  'Free Express Delivery on all orders above Rs. 2,500 across Karachi!',
  'Shop Smart, Live Better • 250+ Quality Products across 5 Core Categories',
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#102B5C] text-white text-xs border-b border-[#173C78]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Contact snippet */}
        <div className="hidden lg:flex items-center gap-4 text-slate-300">
          <a
            href="tel:02134500444"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#EC70C9]" />
            <span>(021) 34500444</span>
          </a>
          <span className="text-slate-500">•</span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-[#E9D9FF]" />
            <span>Model Colony, Karachi</span>
          </span>
        </div>

        {/* Rotating Announcement */}
        <div className="flex items-center justify-center gap-2 text-center overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-[#EC70C9] shrink-0 animate-pulse" />
          <p className="font-medium text-slate-100 transition-opacity duration-300">
            {announcements[currentIndex]}
          </p>
        </div>

        {/* Quick CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1 text-[#E9D9FF] hover:text-[#EC70C9] font-medium transition-colors"
          >
            <span>Shop Now</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
