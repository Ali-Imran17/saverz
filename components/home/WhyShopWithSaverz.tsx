'use client';

import React from 'react';
import { Sparkles, DollarSign, ShoppingBag, ClipboardList, CheckCircle2 } from 'lucide-react';

export function WhyShopWithSaverz() {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Quality Products',
      description: 'Carefully curated grocery staples, authentic brand snacks, safe toys, and verified tableware.',
      iconColor: 'text-[#EC70C9]',
      bgColor: 'bg-[#FBE5F5]',
    },
    {
      icon: DollarSign,
      title: 'Great Prices',
      description: 'Competitive retail prices matching local Karachi market benchmarks with frequent discount deals.',
      iconColor: 'text-[#173C78]',
      bgColor: 'bg-[#F3ECFF]',
    },
    {
      icon: ShoppingBag,
      title: 'Convenient Shopping',
      description: 'Browse all 5 categories from phone or laptop with persistent cart and intuitive category search.',
      iconColor: 'text-[#EC70C9]',
      bgColor: 'bg-[#FBE5F5]',
    },
    {
      icon: ClipboardList,
      title: 'Easy Order Management',
      description: 'Transparent cart calculations, simple demo checkout flow, and instant order summary receipts.',
      iconColor: 'text-[#102B5C]',
      bgColor: 'bg-[#E9D9FF]',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F8F9FF] border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173C78] bg-white px-3 py-1 rounded-full mb-3 border border-slate-200/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#EC70C9]" />
            <span>The Saverz Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight">
            Why Shop with Saverz?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500">
            We are dedicated to providing a simple, dependable, and enjoyable grocery shopping experience for families in Model Colony and throughout Karachi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#E9D9FF] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${item.bgColor} ${item.iconColor} flex items-center justify-center mb-5 shadow-sm`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg text-[#102B5C] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
