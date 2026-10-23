'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Sparkles,
  Phone,
  Store,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { CATEGORIES } from '@/data/categories';
import { formatPKR } from '@/lib/format';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, subtotal } = useCart();
  const { totalWishlist } = useWishlist();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoryDropdownOpen(false);
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop', hasDropdown: true },
    { label: 'Pharmacy', href: '/shop?category=pharmacy' },
    { label: 'Blog', href: '/blog' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white transition-all duration-200 ${
        isScrolled
          ? 'shadow-md border-b border-slate-200/80 py-2'
          : 'border-b border-slate-100 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 group focus:outline-none py-0.5"
            aria-label="Saverz Supermarket & Pharmacy Home"
          >
            <img
              src="/images/saverz-logo-transparent.png"
              alt="Saverz Supermarket & Pharmacy"
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

       
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-lg mx-4 relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 300+ groceries, medicines, snacks, toys, crockery..."
              className="w-full bg-[#F8F9FF] text-[#102B5C] placeholder-slate-400 pl-4 pr-11 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:border-[#173C78] focus:bg-white text-sm transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#173C78] text-white flex items-center justify-center hover:bg-[#102B5C] transition-colors"
              aria-label="Search catalogue"
            >
              <Search className="w-4 h-4 text-[#FBE5F5]" />
            </button>
          </form>

          {/* Navigation Links Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                      className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-2 ${
                        pathname.startsWith('/shop')
                          ? 'text-[#102B5C] font-bold'
                          : 'text-slate-600 hover:text-[#102B5C]'
                      }`}
                    >
                      <span>Shop</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          categoryDropdownOpen ? 'rotate-180 text-[#EC70C9]' : 'text-slate-400'
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {categoryDropdownOpen && (
                      <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 mt-2 animate-in fade-in zoom-in-95 duration-150 z-50">
                        <Link
                          href="/shop"
                          onClick={() => setCategoryDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-[#F3ECFF] text-xs font-bold text-[#102B5C] border-b border-slate-100 mb-1"
                        >
                          <span className="flex items-center gap-2">
                            <Store className="w-4 h-4 text-[#EC70C9]" />
                            All Departments
                          </span>
                          <span className="bg-[#E9D9FF] text-[#102B5C] px-2 py-0.5 rounded-full text-[10px]">
                            250+
                          </span>
                        </Link>
                        {CATEGORIES.map((cat) => (
                          <Link
                            key={cat.id}
                            href={`/shop?category=${cat.id}`}
                            onClick={() => setCategoryDropdownOpen(false)}
                            className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#F8F9FF] text-xs font-medium text-slate-700 hover:text-[#102B5C] transition-colors"
                          >
                            <span>{cat.name}</span>
                            <span className="text-[11px] text-slate-400">
                              {cat.productCount}+
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#102B5C] font-bold border-b-2 border-[#EC70C9] pb-0.5'
                      : 'text-slate-600 hover:text-[#102B5C]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Wishlist & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-2.5 rounded-full text-[#102B5C] hover:bg-[#F3ECFF] hover:text-[#102B5C] transition-colors"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlist > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-[#EC70C9] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {totalWishlist}
                </span>
              )}
            </Link>

            {/* Shopping Cart Icon with Amount */}
            <Link
              href="/cart"
              className="flex items-center gap-3 bg-[#F3ECFF] hover:bg-[#E9D9FF] text-[#102B5C] pl-3.5 pr-4 py-2 rounded-full transition-all group border border-[#E9D9FF]/90 shadow-sm shrink-0"
              aria-label="View Cart"
            >
              <div className="relative flex items-center justify-center shrink-0 mr-0.5">
                <ShoppingCart className="w-5 h-5 text-[#102B5C] group-hover:scale-105 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 bg-[#102B5C] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm leading-none">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left justify-center leading-none">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
                  Cart
                </span>
                <span className="font-extrabold text-xs text-[#102B5C] whitespace-nowrap">
                  {formatPKR(subtotal)}
                </span>
              </div>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#102B5C] hover:bg-[#F8F9FF] transition-colors"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input (Visible on small screens) */}
        <form
          onSubmit={handleSearchSubmit}
          className="md:hidden mt-2.5 relative"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search groceries, snacks, toys..."
            className="w-full bg-[#F8F9FF] text-[#102B5C] placeholder-slate-400 pl-4 pr-11 py-2 rounded-full border border-slate-200 text-sm focus:outline-none focus:border-[#173C78] focus:bg-white"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#173C78] text-white flex items-center justify-center"
            aria-label="Search"
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[115px] bottom-0 bg-white/95 backdrop-blur-md z-50 overflow-y-auto border-t border-slate-200 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Menu
              </span>
              <Link
                href="/"
                className="py-2.5 text-base font-semibold text-[#102B5C] hover:text-[#EC70C9]"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="py-2.5 text-base font-semibold text-[#102B5C] hover:text-[#EC70C9]"
              >
                Shop All Products (250+)
              </Link>
              <Link
                href="/about"
                className="py-2.5 text-base font-semibold text-[#102B5C] hover:text-[#EC70C9]"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="py-2.5 text-base font-semibold text-[#102B5C] hover:text-[#EC70C9]"
              >
                Contact Us
              </Link>
              <Link
                href="/wishlist"
                className="py-2.5 text-base font-semibold text-[#102B5C] hover:text-[#EC70C9] flex items-center justify-between"
              >
                <span>My Wishlist</span>
                <span className="bg-[#FBE5F5] text-[#EC70C9] px-2 py-0.5 rounded-full text-xs font-bold">
                  {totalWishlist} items
                </span>
              </Link>
            </div>

            {/* Mobile Categories list */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Categories
              </span>
              <div className="grid grid-cols-1 gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop?category=${cat.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F8F9FF] hover:bg-[#F3ECFF] text-sm font-medium text-[#102B5C]"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-500 font-normal">
                      {cat.productCount}+ items
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Contact Quick Info */}
            <div className="mt-4 p-4 rounded-2xl bg-[#102B5C] text-white">
              <div className="inline-block mb-3">
                <img
                  src="/images/saverz-logo-transparent.png"
                  alt="Saverz Supermarket & Pharmacy"
                  className="h-9 w-auto object-contain drop-shadow"
                />
              </div>
              <p className="text-xs text-slate-200 mb-2">
                W53M+77F, Liaquat Ali Khan Rd, Model Colony Sheet 4 Lasi Para, Karachi
              </p>
              <a
                href="tel:02134500444"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#E9D9FF]"
              >
                <Phone className="w-4 h-4" />
                <span>(021) 34500444</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
