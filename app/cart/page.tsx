'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  Tag,
  ShieldCheck,
  ChevronRight,
  Truck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPKR } from '@/lib/format';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    shipping,
    discount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    total,
    totalItems,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
  };

  const freeShippingThreshold = 2500;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-[#102B5C] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#102B5C] font-semibold">Shopping Cart</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your chosen supermarket items before checkout.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 sm:p-16 text-center flex flex-col items-center justify-center my-8 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-[#F3ECFF] flex items-center justify-center text-[#EC70C9] mb-5 shadow-inner">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-[#102B5C]">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500 max-w-md mt-2 mb-8 leading-relaxed">
            Looks like you haven&apos;t added any groceries or household essentials yet. Explore our 250+ supermarket products and discover today&apos;s best deals.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#173C78] hover:bg-[#102B5C] text-white font-bold text-sm px-8 py-4 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-[#EC70C9]" />
            <span>Start Shopping Now</span>
          </Link>
        </div>
      ) : (
        /* Interactive Cart Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Free Shipping Progress Indicator */}
            <div className="bg-white rounded-2xl border border-[#E9D9FF] p-4 shadow-sm">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="flex items-center gap-1.5 font-bold text-[#102B5C]">
                  <Truck className="w-4 h-4 text-[#EC70C9]" />
                  {remainingForFreeShipping === 0 || appliedCoupon === 'FREESHIP'
                    ? 'Congratulations! You unlocked FREE Delivery across Karachi.'
                    : `Add ${formatPKR(remainingForFreeShipping)} more to get FREE Delivery!`}
                </span>
                <span className="font-extrabold text-[#173C78]">
                  {progressToFreeShipping}%
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#173C78] to-[#EC70C9] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${appliedCoupon === 'FREESHIP' ? 100 : progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Items Table / Cards */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden divide-y divide-slate-100">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#F8F9FF]/50 transition-colors"
                >
                  {/* Thumbnail & Name */}
                  <div className="flex items-center gap-4 flex-1">
                    <Link
                      href={`/product/${product.id}`}
                      className="w-20 h-20 rounded-2xl bg-[#F8F9FF] p-2 border border-slate-100 shrink-0 overflow-hidden flex items-center justify-center"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </Link>

                    <div>
                      <span className="text-[11px] font-semibold text-[#173C78] uppercase tracking-wider">
                        {product.categoryName}
                      </span>
                      <Link
                        href={`/product/${product.id}`}
                        className="block font-bold text-sm sm:text-base text-[#102B5C] hover:text-[#173C78] transition-colors leading-snug mt-0.5 line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <p className="text-xs text-slate-400 mt-0.5">{product.unit}</p>
                      <p className="text-xs font-semibold text-slate-500 sm:hidden mt-1">
                        Unit Price: {formatPKR(product.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price Calculation */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Stepper */}
                    <div className="flex items-center bg-[#F3ECFF] border border-[#E9D9FF] rounded-xl overflow-hidden p-0.5">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#102B5C] hover:bg-[#E9D9FF] rounded-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-9 text-center text-xs font-bold text-[#102B5C]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#102B5C] hover:bg-[#E9D9FF] rounded-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total for item */}
                    <div className="text-right min-w-[90px]">
                      <span className="text-base font-black text-[#102B5C]">
                        {formatPKR(product.price * quantity)}
                      </span>
                      <p className="text-[11px] text-slate-400 hidden sm:block">
                        {formatPKR(product.price)} ea
                      </p>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-slate-400 hover:text-rose-600 p-2 transition-colors"
                      title="Remove from cart"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Shopping Action */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href="/shop"
                className="text-xs sm:text-sm font-bold text-[#173C78] hover:text-[#EC70C9] transition-colors inline-flex items-center gap-1.5"
              >
                <span>← Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-[#102B5C] tracking-tight pb-4 border-b border-slate-100">
                Order Summary
              </h2>

              {/* Items Breakdown */}
              <div className="space-y-3 py-4 text-xs sm:text-sm border-b border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items):</span>
                  <span className="font-bold text-[#102B5C]">{formatPKR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span className="flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      Discount ({appliedCoupon}):
                    </span>
                    <span>-{formatPKR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    Estimated Delivery:
                  </span>
                  <span className="font-bold">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-black">FREE</span>
                    ) : (
                      formatPKR(shipping)
                    )}
                  </span>
                </div>
              </div>

              {/* Final Total */}
              <div className="py-4 border-b border-slate-100 flex items-baseline justify-between">
                <div>
                  <span className="text-sm font-bold text-slate-500">Total Amount</span>
                  <p className="text-[11px] text-slate-400">(Inclusive of all taxes)</p>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-[#102B5C]">
                  {formatPKR(total)}
                </span>
              </div>

              {/* Checkout CTA */}
              <div className="pt-6">
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#EC70C9] hover:bg-[#d65bb4] text-white font-bold text-sm sm:text-base py-4 rounded-2xl shadow-lg shadow-[#EC70C9]/20 transition-all active:scale-95"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Coupon Form */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-2">
                  Promo / Coupon Code
                </label>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2 text-emerald-700 font-bold">
                      <Tag className="w-4 h-4" />
                      <span>{appliedCoupon} Active</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g. SAVERZ10"
                      className="flex-1 bg-[#F8F9FF] border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-[#102B5C] uppercase placeholder-slate-400 focus:outline-none focus:border-[#173C78]"
                    />
                    <button
                      type="submit"
                      className="bg-[#173C78] hover:bg-[#102B5C] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && (
                  <p
                    className={`text-[11px] mt-2 font-medium ${
                      couponFeedback.success ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Safe & Secure Guarantee Notice */}
              <div className="mt-6 pt-4 text-center">
                <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Doorstep delivery & Cash on Delivery available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
