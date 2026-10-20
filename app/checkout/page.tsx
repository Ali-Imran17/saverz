'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronRight,
  ArrowRight,
  PackageCheck,
  AlertCircle,
  ShoppingBag,
  Printer,
  Home,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CheckoutFormData, OrderConfirmation } from '@/types';
import { formatPKR } from '@/lib/format';

const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Hyderabad',
  'Peshawar',
  'Quetta',
  'Sialkot',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shipping, discount, total, clearCart } = useCart();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Karachi',
    areaLandmark: '',
    orderNotes: '',
    paymentMethod: 'cash-on-delivery',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);

  // Validate form
  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || !/^(03\d{2}[- ]?\d{7}|\+92\d{10}|\d{11})$/.test(formData.phone.trim().replace(/\s+/g, ''))) {
      newErrors.phone = 'Valid Pakistani mobile number required (e.g. 0300 1234567)';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required';
    }
    if (!formData.areaLandmark.trim()) {
      newErrors.areaLandmark = 'Area / Sector / Landmark is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    // Simulate processing
    setTimeout(() => {
      const orderId = `SVRZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmation: OrderConfirmation = {
        orderId,
        orderDate: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        customer: { ...formData },
        items: [...items],
        subtotal,
        shipping,
        discount,
        total,
        estimatedDelivery: 'Tomorrow, between 11:00 AM – 3:00 PM',
      };

      setConfirmedOrder(confirmation);
      setIsSubmitting(false);
      clearCart();
    }, 700);
  };

  // If order confirmed, show order confirmation screen
  if (confirmedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl">
          {/* Header */}
          <div className="text-center pb-8 border-b border-slate-100">
            <div className="flex justify-center mb-4">
              <img
                src="/images/Saverz Supermarket Logo.png"
                alt="Saverz Supermarket"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-3 animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Demo Order Placed Successfully
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#102B5C] mt-3">
              Thank You for Your Order!
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Order ID: <strong className="font-mono text-[#173C78]">#{confirmedOrder.orderId}</strong>
            </p>
          </div>

          {/* Demo disclaimer notice */}
          <div className="my-6 p-4 rounded-2xl bg-[#F3ECFF] border border-[#E9D9FF] text-xs text-[#102B5C] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#EC70C9] shrink-0 mt-0.5" />
            <p>
              <strong>Frontend Demonstration:</strong> This is a simulation for Saverz Supermarket. No real payment was charged, and no real delivery is dispatched without the future backend integration.
            </p>
          </div>

          {/* Summary Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-b border-slate-100 text-xs sm:text-sm">
            <div>
              <h3 className="font-bold text-[#102B5C] uppercase tracking-wider text-xs mb-2">
                Delivery Details
              </h3>
              <p className="font-semibold text-slate-800">{confirmedOrder.customer.fullName}</p>
              <p className="text-slate-600">{confirmedOrder.customer.address}, {confirmedOrder.customer.areaLandmark}</p>
              <p className="text-slate-600">{confirmedOrder.customer.city}, Pakistan</p>
              <p className="text-slate-600 mt-1">Phone: {confirmedOrder.customer.phone}</p>
              <p className="text-slate-600">Email: {confirmedOrder.customer.email}</p>
            </div>

            <div>
              <h3 className="font-bold text-[#102B5C] uppercase tracking-wider text-xs mb-2">
                Order Info
              </h3>
              <p className="text-slate-600">
                Payment Method:{' '}
                <strong className="text-[#102B5C] uppercase font-bold">
                  {confirmedOrder.customer.paymentMethod.replace(/-/g, ' ')}
                </strong>
              </p>
              <p className="text-slate-600 mt-1">
                Estimated Delivery: <strong className="text-emerald-700">{confirmedOrder.estimatedDelivery}</strong>
              </p>
              <p className="text-slate-600 mt-1">
                Dispatch Hub: Saverz Model Colony, Karachi
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div className="py-6 border-b border-slate-100">
            <h3 className="font-bold text-[#102B5C] uppercase tracking-wider text-xs mb-4">
              Items Ordered ({confirmedOrder.items.length})
            </h3>
            <div className="space-y-3">
              {confirmedOrder.items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-contain rounded-lg bg-slate-50 p-1 border"
                    />
                    <div>
                      <p className="font-bold text-[#102B5C] line-clamp-1">{product.name}</p>
                      <p className="text-slate-400 text-[11px]">
                        Qty: {quantity} × {formatPKR(product.price)}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#102B5C]">
                    {formatPKR(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Total */}
          <div className="pt-6 space-y-2 text-xs sm:text-sm max-w-xs ml-auto">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-bold text-[#102B5C]">{formatPKR(confirmedOrder.subtotal)}</span>
            </div>
            {confirmedOrder.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Discount:</span>
                <span>-{formatPKR(confirmedOrder.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee:</span>
              <span className="font-bold">
                {confirmedOrder.shipping === 0 ? 'FREE' : formatPKR(confirmedOrder.shipping)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-black text-[#102B5C]">
              <span>Paid Total:</span>
              <span>{formatPKR(confirmedOrder.total)}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#102B5C] hover:bg-[#173C78] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-colors shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If cart is empty, redirect or prompt
  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-12 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#F3ECFF] flex items-center justify-center text-[#EC70C9] mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-[#102B5C]">Your Cart is Empty</h2>
          <p className="text-sm text-slate-500 mt-2 mb-6">
            Please add some products from our supermarket aisles before checking out.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#173C78] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#102B5C]"
          >
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-[#102B5C]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link href="/cart" className="hover:text-[#102B5C]">
          Cart
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[#102B5C] font-semibold">Checkout</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight mb-2">
        Checkout
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        Enter your delivery address and contact information to confirm your Saverz order.
      </p>

      {/* Main Checkout Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Contact & Address Form */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Section 1: Customer Info */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#102B5C] pb-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#102B5C] text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Customer Information</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-[#EC70C9]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Tariq Mehmood"
                  className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors ${
                    errors.fullName ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[#EC70C9]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tariq@example.com"
                  className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors ${
                    errors.email ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                  Mobile Number <span className="text-[#EC70C9]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0300 1234567"
                  className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors ${
                    errors.phone ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#102B5C] pb-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#102B5C] text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Delivery Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              <div>
                <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                  City <span className="text-[#EC70C9]">*</span>
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#F8F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-semibold text-[#102B5C] focus:outline-none focus:border-[#173C78]"
                >
                  {PAKISTANI_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                  Area / Sector / Landmark <span className="text-[#EC70C9]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.areaLandmark}
                  onChange={(e) => setFormData({ ...formData, areaLandmark: e.target.value })}
                  placeholder="e.g. Model Colony, Block 4"
                  className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors ${
                    errors.areaLandmark ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                  }`}
                />
                {errors.areaLandmark && <p className="text-[11px] text-rose-600 mt-1">{errors.areaLandmark}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                  Street Address & House / Flat # <span className="text-[#EC70C9]">*</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House #, Street name, Near specific location..."
                  className={`w-full bg-[#F8F9FF] border rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:bg-white transition-colors resize-none ${
                    errors.address ? 'border-rose-400' : 'border-slate-200 focus:border-[#173C78]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-1.5">
                  Order Delivery Notes (Optional)
                </label>
                <input
                  type="text"
                  value={formData.orderNotes || ''}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  placeholder="e.g. Ring the bell twice, leave with guard..."
                  className="w-full bg-[#F8F9FF] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#102B5C] focus:outline-none focus:border-[#173C78]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-[#102B5C] pb-4 border-b border-slate-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#102B5C] text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Payment Option (Demo Selection)</span>
            </h2>

            <div className="mt-5 space-y-3">
              {/* Cash On Delivery */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cash-on-delivery'
                    ? 'border-[#173C78] bg-[#F3ECFF]/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-[#F8F9FF]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash-on-delivery"
                  checked={formData.paymentMethod === 'cash-on-delivery'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cash-on-delivery' })}
                  className="mt-1 accent-[#173C78]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-4 h-4 text-[#173C78]" />
                    <span className="text-xs font-bold text-[#102B5C]">Cash on Delivery (COD)</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Popular
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Pay with cash directly to the delivery rider when your groceries arrive at your doorstep in Karachi.
                  </p>
                </div>
              </label>

              {/* EasyPaisa */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'easypaisa'
                    ? 'border-[#173C78] bg-[#F3ECFF]/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-[#F8F9FF]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="easypaisa"
                  checked={formData.paymentMethod === 'easypaisa'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'easypaisa' })}
                  className="mt-1 accent-[#173C78]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-[#102B5C]">EasyPaisa / JazzCash Mobile Wallet</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Demo option. In production, wallet prompt or QR code will appear after confirmation.
                  </p>
                </div>
              </label>

              {/* Bank Transfer */}
              <label
                className={`flex items-start gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'bank-transfer'
                    ? 'border-[#173C78] bg-[#F3ECFF]/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:bg-[#F8F9FF]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank-transfer"
                  checked={formData.paymentMethod === 'bank-transfer'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'bank-transfer' })}
                  className="mt-1 accent-[#173C78]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#102B5C]" />
                    <span className="text-xs font-bold text-[#102B5C]">Direct Bank Account Transfer (IBFT)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Demo option. Official Saverz Supermarket bank IBAN will be provided for transfer verification.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary Preview & Confirm Action */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm sticky top-24">
            <h2 className="text-lg font-black text-[#102B5C] pb-4 border-b border-slate-100 flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-normal text-slate-400">
                {items.length} unique items
              </span>
            </h2>

            {/* Scrollable Items Mini-List */}
            <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 my-4 pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 truncate max-w-[200px]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 object-contain rounded bg-slate-50 border shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-[#102B5C] truncate">{product.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {quantity} × {formatPKR(product.price)}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#102B5C] shrink-0">
                    {formatPKR(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-bold text-[#102B5C]">{formatPKR(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount:</span>
                  <span>-{formatPKR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span className="font-bold">
                  {shipping === 0 ? <span className="text-emerald-600">FREE</span> : formatPKR(shipping)}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-black text-[#102B5C]">
                <span>Total Amount:</span>
                <span>{formatPKR(total)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#EC70C9] hover:bg-[#d65bb4] text-white font-bold text-sm py-4 rounded-2xl shadow-lg shadow-[#EC70C9]/20 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Demo Order...</span>
                ) : (
                  <>
                    <span>Confirm Order • {formatPKR(total)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-3">
              By confirming, you test the Saverz Supermarket frontend demo checkout flow.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
