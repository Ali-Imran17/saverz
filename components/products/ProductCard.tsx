'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, Plus, Minus, Check } from 'lucide-react';
import { Product } from '@/types';
import { formatPKR } from '@/lib/format';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);
  const cartItem = items.find((item) => item.product.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-100/90 shadow-sm hover:shadow-xl hover:border-[#E9D9FF] transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Badges & Wishlist Trigger */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.badge && (
            <span
              className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-sm ${
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
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-600 border border-rose-200">
              {product.discount}% OFF
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-[#FBE5F5] text-[#EC70C9] shadow-sm'
              : 'bg-white/90 backdrop-blur-sm text-slate-400 hover:text-[#EC70C9] hover:bg-white shadow-sm'
          }`}
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavorite ? 'fill-[#EC70C9] scale-110' : ''
            }`}
          />
        </button>
      </div>

      {/* Product Image Clickable Link */}
      <Link
        href={`/product/${product.id}`}
        className="block relative aspect-square w-full bg-[#F8F9FF] overflow-hidden p-4"
      >
        <img
          src={
            imageError
              ? 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80'
              : product.image
          }
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="text-[#173C78] font-medium truncate max-w-[140px]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 font-semibold text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[11px] text-slate-400 font-normal">
                ({product.reviewCount})
              </span>
            </div>
          </div>

          {/* Product Name */}
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-sm text-[#102B5C] group-hover:text-[#173C78] line-clamp-2 leading-snug transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Unit / Weight specification */}
          <p className="text-xs text-slate-400 mt-1">{product.unit}</p>
        </div>

        {/* Pricing & Add to Cart Controls */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-[#102B5C]">
                {formatPKR(product.price)}
              </span>
            </div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPKR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Cart Action Buttons */}
          <div>
            {currentQuantity > 0 ? (
              <div className="flex items-center bg-[#F3ECFF] border border-[#E9D9FF] rounded-xl overflow-hidden p-0.5">
                <button
                  onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#102B5C] hover:bg-[#E9D9FF] rounded-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-[#102B5C]">
                  {currentQuantity}
                </span>
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-7 h-7 flex items-center justify-center text-[#102B5C] hover:bg-[#E9D9FF] rounded-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="inline-flex items-center gap-1.5 bg-[#173C78] hover:bg-[#102B5C] text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-3.5 h-3.5 text-[#EC70C9]" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
