'use client';

import React, { useState } from 'react';
import { Star, Send, CheckCircle2 } from 'lucide-react';
import { CustomerReview } from '@/types';

interface ReviewFormProps {
  onAddReview?: (review: CustomerReview) => void;
}

export function ReviewForm({ onAddReview }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      rating,
      date: 'Just now',
      comment: comment.trim(),
      verified: true,
      location: 'Karachi, Pakistan',
    };

    if (onAddReview) {
      onAddReview(newRev);
    }

    setSubmitted(true);
    setName('');
    setEmail('');
    setComment('');
    setRating(5);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#102B5C]">Submit Your Review</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Share your shopping experience with Saverz Supermarket. We value every feedback!
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-xl bg-[#F3ECFF] border border-[#E9D9FF] text-center flex flex-col items-center justify-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-10 h-10 text-[#EC70C9]" />
          <h4 className="font-bold text-[#102B5C] text-base">Thank You for Your Review!</h4>
          <p className="text-xs text-slate-600 max-w-sm">
            Your review has been successfully added to our community testimonials.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-3 text-xs font-bold text-[#173C78] hover:underline"
          >
            Submit another review
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                Name <span className="text-[#EC70C9]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full bg-[#F8F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#102B5C] focus:outline-none focus:border-[#173C78] focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                Email <span className="text-[#EC70C9]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#F8F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#102B5C] focus:outline-none focus:border-[#173C78] focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
              Rating <span className="text-[#EC70C9]">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-slate-300 hover:scale-110 transition-transform focus:outline-none"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-[#102B5C] ml-2">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
              Your Review <span className="text-[#EC70C9]">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review here... How was your experience?"
              className="w-full bg-[#F8F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#102B5C] focus:outline-none focus:border-[#173C78] focus:bg-white transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#EC70C9] hover:bg-[#d65bb4] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <span>Submit Review</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
}
