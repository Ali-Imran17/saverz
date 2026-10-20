import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromotionalBanner } from '@/components/home/PromotionalBanner';
import { WhyShopWithSaverz } from '@/components/home/WhyShopWithSaverz';
import { CustomerReviewsSection } from '@/components/home/CustomerReviewsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Shop by Category (5 Core Aisles) */}
      <CategoryGrid />

      {/* 3. Promotional Banner */}
      <PromotionalBanner />

      {/* 4. Featured Products ("Popular Picks for You") */}
      <FeaturedProducts />

      {/* 5. Why Shop With Saverz? */}
      <WhyShopWithSaverz />

      {/* 6. Customer Reviews & Interactive Review Form */}
      <CustomerReviewsSection />
    </div>
  );
}
