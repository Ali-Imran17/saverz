import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Home, Store, ArrowRight, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 bg-[#F8F9FF]">
      <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center shadow-xl">
        {/* Official Logo */}
        <div className="mb-6 flex justify-center">
          <img
            src="/images/Saverz Supermarket Logo.png"
            alt="Saverz Supermarket"
            className="h-12 w-auto object-contain"
          />
        </div>

        <span className="text-xs font-black uppercase tracking-widest text-[#EC70C9] bg-[#FBE5F5] px-3.5 py-1 rounded-full border border-[#FBE5F5]">
          Error 404 • Page Not Found
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-[#102B5C] mt-4 tracking-tight">
          Aisle Not Found!
        </h1>

        <p className="text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
          The page or supermarket shelf you are looking for doesn&apos;t exist, has been moved, or is temporarily out of stock.
        </p>

        {/* Quick Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#102B5C] hover:bg-[#173C78] text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
          >
            <Home className="w-4 h-4 text-[#EC70C9]" />
            <span>Back to Home</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F3ECFF] hover:bg-[#E9D9FF] text-[#102B5C] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl transition-all border border-[#E9D9FF]"
          >
            <Store className="w-4 h-4 text-[#173C78]" />
            <span>Browse Products</span>
          </Link>
        </div>

        {/* Support Help */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
          <span>Need help finding an item? Call our helpline: </span>
          <a
            href="tel:02134500444"
            className="font-bold text-[#173C78] hover:text-[#EC70C9] transition-colors"
          >
            (021) 34500444
          </a>
        </div>
      </div>
    </div>
  );
}
