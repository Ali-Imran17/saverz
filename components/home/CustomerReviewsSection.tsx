'use client';

import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Quote } from 'lucide-react';
import { initialReviews } from '@/data/products';
import { CustomerReview } from '@/types';
import { ReviewForm } from './ReviewForm';

export function CustomerReviewsSection() {
  const [reviews, setReviews] = useState<CustomerReview[]>(initialReviews);

  const handleAddReview = (newRev: CustomerReview) => {
    setReviews((prev) => [newRev, ...prev]);
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Testimonials Display */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173C78] bg-[#F3ECFF] px-3 py-1 rounded-full mb-3">
              <MessageSquare className="w-3.5 h-3.5 text-[#EC70C9]" />
              <span>Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight">
              What Our Shoppers Say
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-lg mb-8">
              Real opinions from families shopping at Saverz Supermarket in Model Colony and Karachi. (Demonstration reviews until live server integration).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.slice(0, 4).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-[#F8F9FF] rounded-2xl p-5 border border-slate-100 flex flex-col justify-between hover:border-[#E9D9FF] hover:shadow-md transition-all"
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-[#102B5C] ml-1.5">
                        {rev.rating}.0
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-[#102B5C]">{rev.name}</h4>
                      <p className="text-[11px] text-slate-400">{rev.location}</p>
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Review Form (Roadmap Box 7) */}
          <div className="lg:col-span-5">
            <ReviewForm onAddReview={handleAddReview} />
          </div>
        </div>
      </div>
    </section>
  );
}
