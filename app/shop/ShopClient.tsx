'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  Sparkles,
  RotateCcw,
  PackageX,
  Check,
} from 'lucide-react';
import { allProducts } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductCategory, Product } from '@/types';
import { formatPKR } from '@/lib/format';

type SortOption =
  | 'featured'
  | 'price-low'
  | 'price-high'
  | 'rating'
  | 'name-asc';

const ITEMS_PER_PAGE = 20;

export function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial URL params
  const categoryParam = searchParams.get('category') as ProductCategory | null;
  const queryParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    categoryParam && CATEGORIES.some((c) => c.id === categoryParam)
      ? categoryParam
      : 'all'
  );
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [debouncedQuery, setDebouncedQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Sync state if URL changes
  useEffect(() => {
    if (categoryParam && CATEGORIES.some((c) => c.id === categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (queryParam !== undefined) {
      setSearchQuery(queryParam);
      setDebouncedQuery(queryParam);
    }
  }, [queryParam]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setCurrentPage(1);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Reset page when filters change
  const handleCategoryChange = (catId: ProductCategory | 'all') => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    if (catId === 'all') {
      router.push('/shop', { scroll: false });
    } else {
      router.push(`/shop?category=${catId}`, { scroll: false });
    }
  };

  const handleClearAll = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDebouncedQuery('');
    setMaxPrice(10000);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy('featured');
    setCurrentPage(1);
    router.push('/shop', { scroll: false });
  };

  // Filter and Sort Pipeline
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (debouncedQuery.trim()) {
        const q = debouncedQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesBrand = product.brand.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesKeywords = product.keywords.some((k) =>
          k.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesBrand && !matchesDesc && !matchesKeywords) {
          return false;
        }
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // In stock
      if (inStockOnly && !product.inStock) {
        return false;
      }
      // On sale
      if (onSaleOnly && !product.discount) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, debouncedQuery, maxPrice, inStockOnly, onSaleOnly]);

  const sortedProducts = useMemo(() => {
    const copy = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return copy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return copy.sort((a, b) => b.price - a.price);
      case 'rating':
        return copy.sort((a, b) => b.rating - a.rating);
      case 'name-asc':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
      default:
        // Keep natural ordering or prioritize featured
        return copy.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Paginated slice
  const displayedCount = Math.min(currentPage * ITEMS_PER_PAGE, sortedProducts.length);
  const currentProducts = sortedProducts.slice(0, displayedCount);
  const hasMore = displayedCount < sortedProducts.length;

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (debouncedQuery ? 1 : 0) +
    (maxPrice < 10000 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Breadcrumb & Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#102B5C] tracking-tight">
              {selectedCategory === 'all'
                ? 'All Products'
                : CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'Products'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Browse our complete supermarket catalogue of {allProducts.length}+ products with local Karachi pricing in PKR.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-semibold text-[#102B5C] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Showing {displayedCount} of {sortedProducts.length} items</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-[#102B5C]">
              <SlidersHorizontal className="w-4 h-4 text-[#EC70C9]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#EC70C9] text-white text-[11px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-bold text-[#173C78] hover:text-[#EC70C9] transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Categories List */}
          <div className="mt-6">
            <h3 className="text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-3">
              Departments
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => handleCategoryChange('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#102B5C] text-white'
                    : 'text-slate-600 hover:bg-[#F8F9FF]'
                }`}
              >
                <span>All Departments</span>
                <span className="text-[11px] opacity-70">{allProducts.length}</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#102B5C] text-white'
                      : 'text-slate-600 hover:bg-[#F8F9FF]'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[11px] opacity-70">{cat.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-[#102B5C] uppercase tracking-wider">
                Max Price
              </h3>
              <span className="text-xs font-bold text-[#173C78]">
                {formatPKR(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-[#173C78] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Rs. 100</span>
              <span>Rs. 10,000</span>
            </div>
          </div>

          {/* Availability & Deals Toggles */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-2">
              Preferences
            </h3>

            <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onSaleOnly}
                onChange={(e) => {
                  setOnSaleOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 rounded text-[#EC70C9] accent-[#EC70C9]"
              />
              <span>On Sale Deals Only</span>
            </label>

            <label className="flex items-center gap-2.5 text-xs font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => {
                  setInStockOnly(e.target.checked);
                  setCurrentPage(1);
                }}
                className="w-4 h-4 rounded text-[#173C78] accent-[#173C78]"
              />
              <span>In-Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Right Section: Toolbar + Products Grid */}
        <div className="lg:col-span-3">
          {/* Controls Bar: Search, Mobile Filter Toggle, Sort Dropdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter current view..."
                className="w-full bg-[#F8F9FF] border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-[#102B5C] focus:outline-none focus:border-[#173C78] focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Button + Sort Select */}
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-[#F3ECFF] text-[#102B5C] px-3.5 py-2 rounded-xl text-xs font-bold border border-[#E9D9FF]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#EC70C9]" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-[#F8F9FF] border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-[#102B5C] focus:outline-none focus:border-[#173C78] cursor-pointer"
                >
                  <option value="featured">Featured / Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name-asc">Product Name (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-xs text-slate-400 font-medium">Active:</span>

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 bg-[#F3ECFF] text-[#102B5C] px-3 py-1 rounded-full text-xs font-bold border border-[#E9D9FF]">
                  <span>Dept: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}</span>
                  <button onClick={() => handleCategoryChange('all')}>
                    <X className="w-3 h-3 text-[#EC70C9]" />
                  </button>
                </span>
              )}

              {debouncedQuery && (
                <span className="inline-flex items-center gap-1.5 bg-[#F3ECFF] text-[#102B5C] px-3 py-1 rounded-full text-xs font-bold border border-[#E9D9FF]">
                  <span>Query: &ldquo;{debouncedQuery}&rdquo;</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 text-[#EC70C9]" />
                  </button>
                </span>
              )}

              {maxPrice < 10000 && (
                <span className="inline-flex items-center gap-1.5 bg-[#F3ECFF] text-[#102B5C] px-3 py-1 rounded-full text-xs font-bold border border-[#E9D9FF]">
                  <span>Under {formatPKR(maxPrice)}</span>
                  <button onClick={() => setMaxPrice(10000)}>
                    <X className="w-3 h-3 text-[#EC70C9]" />
                  </button>
                </span>
              )}

              {onSaleOnly && (
                <span className="inline-flex items-center gap-1.5 bg-[#FBE5F5] text-[#EC70C9] px-3 py-1 rounded-full text-xs font-bold border border-[#FBE5F5]">
                  <span>On Sale</span>
                  <button onClick={() => setOnSaleOnly(false)}>
                    <X className="w-3 h-3 text-[#EC70C9]" />
                  </button>
                </span>
              )}

              {inStockOnly && (
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                  <span>In Stock</span>
                  <button onClick={() => setInStockOnly(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleClearAll}
                className="text-xs font-bold text-rose-600 hover:underline ml-2"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Product Cards Grid or Empty State */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center flex flex-col items-center justify-center my-8 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#F3ECFF] flex items-center justify-center text-[#EC70C9] mb-4">
                <PackageX className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#102B5C]">
                No matching products found
              </h3>
              <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6">
                We couldn&apos;t find any products matching your selected criteria. Try adjusting filters or searching for different keywords.
              </p>
              <button
                onClick={handleClearAll}
                className="inline-flex items-center gap-2 bg-[#173C78] text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-[#102B5C] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination / Load More Button */}
              {hasMore && (
                <div className="mt-12 text-center flex flex-col items-center">
                  <p className="text-xs text-slate-500 mb-3">
                    Showing {displayedCount} of {sortedProducts.length} products
                  </p>
                  <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="inline-flex items-center gap-2 bg-[#102B5C] hover:bg-[#173C78] text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                  >
                    <span>Load More Products</span>
                    <ChevronDown className="w-4 h-4 text-[#EC70C9]" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
          <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-[#102B5C]">
                <SlidersHorizontal className="w-4 h-4 text-[#EC70C9]" />
                <span>Filter Catalogue</span>
              </div>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="mt-4">
              <h4 className="text-xs font-bold text-[#102B5C] uppercase tracking-wider mb-2">
                Departments
              </h4>
              <div className="grid grid-cols-1 gap-1">
                <button
                  onClick={() => {
                    handleCategoryChange('all');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                    selectedCategory === 'all'
                      ? 'bg-[#102B5C] text-white'
                      : 'text-slate-600 bg-slate-50'
                  }`}
                >
                  All Departments ({allProducts.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      handleCategoryChange(cat.id);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold ${
                      selectedCategory === cat.id
                        ? 'bg-[#102B5C] text-white'
                        : 'text-slate-600 bg-slate-50'
                    }`}
                  >
                    {cat.name} ({cat.productCount})
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price Slider */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-xs font-bold mb-2">
                <span>Max Price</span>
                <span className="text-[#173C78]">{formatPKR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#173C78]"
              />
            </div>

            {/* Mobile Toggles */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="accent-[#EC70C9]"
                />
                <span>On Sale Deals Only</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#173C78]"
                />
                <span>In-Stock Only</span>
              </label>
            </div>

            {/* Apply / Reset Buttons */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
              <button
                onClick={handleClearAll}
                className="flex-1 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-[#102B5C] text-white rounded-xl text-xs font-bold hover:bg-[#173C78]"
              >
                Apply Filters ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
