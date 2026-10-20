'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  ShoppingCart,
  Star,
  Plus,
  Minus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Store,
  ChevronRight,
  Share2,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import { Product } from '@/types';
import { formatPKR } from '@/lib/format';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/products/ProductCard';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const { addToCart, items, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'delivery'>('description');
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const cartItem = items.find((i) => i.product.id === product.id);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#102B5C] transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link href="/shop" className="hover:text-[#102B5C] transition-colors">
          Shop
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <Link
          href={`/shop?category=${product.category}`}
          className="hover:text-[#102B5C] transition-colors"
        >
          {product.categoryName}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span className="text-[#102B5C] font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        {/* Product Image Column */}
        <div className="lg:col-span-6">
          <div className="relative bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm overflow-hidden flex items-center justify-center aspect-square">
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
              {product.badge && (
                <span
                  className={`text-xs font-black uppercase px-3 py-1 rounded-md shadow-sm ${
                    product.badge === 'Bestseller'
                      ? 'bg-[#102B5C] text-white'
                      : product.badge === 'Popular'
                      ? 'bg-[#173C78] text-[#E9D9FF]'
                      : 'bg-[#EC70C9] text-white'
                  }`}
                >
                  {product.badge}
                </span>
              )}
              {product.discount && (
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-rose-50 text-rose-600 border border-rose-200">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Favorite & Share Buttons */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors border border-slate-200"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors border ${
                  isFavorite
                    ? 'bg-[#FBE5F5] border-[#EC70C9] text-[#EC70C9]'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-[#EC70C9]'
                }`}
                title={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-[#EC70C9]' : ''}`}
                />
              </button>
            </div>

            {/* Main Product Image */}
            <img
              src={
                imageError
                  ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
                  : product.image
              }
              alt={product.name}
              onError={() => setImageError(true)}
              className="w-full h-full object-contain max-h-[420px] transition-transform duration-300 hover:scale-105"
            />
          </div>

          {copiedLink && (
            <p className="text-xs font-bold text-emerald-600 text-center mt-2 animate-in fade-in">
              Product URL copied to clipboard!
            </p>
          )}
        </div>

        {/* Product Details & Purchase Controls */}
        <div className="lg:col-span-6 flex flex-col">
          {/* Category & Brand */}
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-[#173C78]">
            <Link
              href={`/shop?category=${product.category}`}
              className="hover:underline uppercase tracking-wider"
            >
              {product.categoryName}
            </Link>
            <span>•</span>
            <span className="text-slate-500">Brand: {product.brand}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-[#102B5C] tracking-tight leading-snug">
            {product.name}
          </h1>

          {/* Ratings & Stock Status */}
          <div className="flex flex-wrap items-center gap-4 mt-3 pb-5 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">
                ({product.reviewCount} customer ratings)
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>In Stock & Ready for Dispatch</span>
            </div>

            <span className="text-slate-400 font-mono">SKU: {product.id.toUpperCase()}</span>
          </div>

          {/* Price Block */}
          <div className="mt-5 p-5 bg-[#F8F9FF] rounded-2xl border border-slate-200/70">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-[#102B5C]">
                {formatPKR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base sm:text-lg text-slate-400 line-through">
                  {formatPKR(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Unit Specification: <strong className="text-slate-700">{product.unit}</strong> • All taxes included
            </p>
          </div>

          {/* Short Description */}
          <p className="mt-5 text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Selector & Add to Cart */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center justify-between sm:justify-start bg-white border border-slate-200 rounded-2xl p-1 shadow-sm">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-[#F3ECFF] transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-[#102B5C] text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-[#F3ECFF] transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAddToCart}
              className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#173C78] hover:bg-[#102B5C] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              <ShoppingCart className="w-5 h-5 text-[#EC70C9]" />
              <span>Add {quantity > 1 ? `(${quantity})` : ''} to Cart • {formatPKR(product.price * quantity)}</span>
            </button>
          </div>

          {/* Delivery & Service Assurance Badges */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-100 text-slate-700">
              <Truck className="w-4 h-4 text-[#173C78] shrink-0" />
              <div>
                <p className="font-bold text-[#102B5C]">Karachi Delivery</p>
                <p className="text-[11px] text-slate-400">Same / Next Day</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-100 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#EC70C9] shrink-0" />
              <div>
                <p className="font-bold text-[#102B5C]">Original Brands</p>
                <p className="text-[11px] text-slate-400">100% Quality checked</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-slate-100 text-slate-700">
              <RotateCcw className="w-4 h-4 text-[#173C78] shrink-0" />
              <div>
                <p className="font-bold text-[#102B5C]">Easy Returns</p>
                <p className="text-[11px] text-slate-400">At store door</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs (Description, Specifications, Shipping notes) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 mb-16 shadow-sm">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('description')}
            className={`text-sm font-bold pb-2 transition-colors border-b-2 -mb-[18px] ${
              activeTab === 'description'
                ? 'border-[#EC70C9] text-[#102B5C]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Product Overview
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`text-sm font-bold pb-2 transition-colors border-b-2 -mb-[18px] ${
              activeTab === 'details'
                ? 'border-[#EC70C9] text-[#102B5C]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`text-sm font-bold pb-2 transition-colors border-b-2 -mb-[18px] ${
              activeTab === 'delivery'
                ? 'border-[#EC70C9] text-[#102B5C]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Karachi Delivery Info
          </button>
        </div>

        <div className="pt-8 text-sm text-slate-600 leading-relaxed">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <p>
                At Saverz Supermarket, we stock only certified fresh products, authentic grocery brands, and pristine household ware. This item is packaged and handled under strict hygienic supermarket standards.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {product.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#F8F9FF] border border-slate-200 rounded-full text-xs text-slate-500 font-medium"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="max-w-md">
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 font-bold text-slate-500 w-1/3">Brand:</td>
                    <td className="py-2.5 font-semibold text-[#102B5C]">{product.brand}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 font-bold text-slate-500">Unit / Net Wt:</td>
                    <td className="py-2.5 font-semibold text-[#102B5C]">{product.unit}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 font-bold text-slate-500">Category:</td>
                    <td className="py-2.5 font-semibold text-[#102B5C]">{product.categoryName}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-2.5 font-bold text-slate-500">Origin:</td>
                    <td className="py-2.5 font-semibold text-[#102B5C]">{product.origin || 'Pakistan'}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-slate-500">Availability:</td>
                    <td className="py-2.5 font-semibold text-emerald-600">In Stock</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3">
              <p>
                Saverz Supermarket fulfills local deliveries from our hub in Model Colony Sheet 4 Lasi Para, Karachi.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-xs">
                <li>Free shipping on all orders over Rs. 2,500.</li>
                <li>Flat shipping fee of Rs. 150 applies for orders under Rs. 2,500.</li>
                <li>Cash on delivery, Bank transfer, and EasyPaisa options available at checkout.</li>
                <li>Delivery slots operate daily between 9:00 AM and 10:00 PM.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel / Grid */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#102B5C]">
              Related Products in {product.categoryName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Customers who viewed this item also explored these recommendations.
            </p>
          </div>
          <Link
            href={`/shop?category=${product.category}`}
            className="text-xs font-bold text-[#173C78] hover:text-[#EC70C9] transition-colors"
          >
            View More in {product.categoryName} →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>
    </div>
  );
}
