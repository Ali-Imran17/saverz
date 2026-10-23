'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, 
  Clock, 
  Calendar, 
  Tag, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Share2, 
  X, 
  Check, 
  ExternalLink,
  ShoppingBag,
  Heart,
  ChevronRight,
  Filter
} from 'lucide-react';
import { BLOG_POSTS } from '@/data/blog';
import { BlogPost } from '@/types';

export function BlogClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = ['All', 'Health & Pharmacy', 'Smart Shopping & Savings', 'Family & Home Care', 'Nutrition & Groceries'];

  // All unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach((post) => post.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.content.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedCategory, selectedTag]);

  // Featured post
  const featuredPost = useMemo(() => {
    return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  }, []);

  const handleShare = async (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${post.slug}` : '';
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopiedSlug(post.slug);
        setTimeout(() => setCopiedSlug(null), 2500);
      }
    } catch {
      // fallback
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <div className="bg-[#F8F9FF] min-h-screen pb-20">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#102B5C] via-[#173C78] to-[#6B21A8] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 shadow-inner">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#EC70C9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#E9D9FF]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E9D9FF] bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-[#EC70C9]" />
              <span>Saverz Insights &amp; Wellness</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Health, Pantry &amp; Smart Living Blog
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
              Expert pharmaceutical guides, budget-friendly supermarket shopping advice, Karachi coastal storage tips, and healthy family recipes from the Saverz team.
            </p>
          </div>

          {/* Search Bar in Hero */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles on first-aid, knee caps, grocery savings, recipes..."
                className="w-full bg-white text-[#102B5C] placeholder-slate-400 pl-12 pr-10 py-3.5 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#EC70C9]/30 shadow-lg transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Category Filter Tabs */}
        <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-lg border border-slate-200/80 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 hidden md:inline-flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5" />
            <span>Topics</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedTag(null);
              }}
              className={`shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#102B5C] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#102B5C] hover:bg-[#F3ECFF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Active Tag Filter Notice */}
        {selectedTag && (
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
            <span>Filtering by tag:</span>
            <span className="bg-[#E9D9FF] text-[#102B5C] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              #{selectedTag}
              <button onClick={() => setSelectedTag(null)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}

        {/* Featured Article Spotlight (Only show when on 'All' and no search query) */}
        {selectedCategory === 'All' && !searchQuery && !selectedTag && featuredPost && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-extrabold text-[#173C78] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#EC70C9]" />
                <span>Featured Guide of the Week</span>
              </h2>
            </div>

            <div 
              onClick={() => setReadingPost(featuredPost)}
              className="group cursor-pointer bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image side */}
              <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full overflow-hidden bg-slate-100">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#EC70C9] text-white text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                    Featured
                  </span>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                    <span 
                      className="font-bold uppercase tracking-wider px-2.5 py-1 rounded-md text-white text-[11px]"
                      style={{ backgroundColor: featuredPost.categoryColor }}
                    >
                      {featuredPost.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#102B5C] group-hover:text-[#173C78] transition-colors leading-snug">
                    {featuredPost.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-500 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white shadow"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#102B5C]">
                        {featuredPost.author.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {featuredPost.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleShare(featuredPost, e)}
                      className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
                      title="Copy link"
                      aria-label="Share article"
                    >
                      {copiedSlug === featuredPost.slug ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <span className="inline-flex items-center gap-1.5 bg-[#102B5C] text-white text-xs font-bold px-4 py-2.5 rounded-xl group-hover:bg-[#173C78] transition-colors">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Heading & Result count */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-[#102B5C]">
              {selectedCategory === 'All' ? 'Latest Articles' : selectedCategory}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
            </p>
          </div>

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Popular Tags:
            </span>
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors shrink-0 ${
                  selectedTag === tag
                    ? 'bg-[#102B5C] border-[#102B5C] text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="mt-12 bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#102B5C]">No articles found</h3>
            <p className="text-xs text-slate-500 mt-2">
              We couldn&apos;t find any articles matching &ldquo;{searchQuery}&rdquo;. Try another search term or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedTag(null);
              }}
              className="mt-6 inline-flex items-center gap-2 bg-[#102B5C] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#173C78] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setReadingPost(post)}
                className="group cursor-pointer bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Cover photo */}
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md"
                        style={{ backgroundColor: post.categoryColor }}
                      >
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-[#102B5C] group-hover:text-[#173C78] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="mt-2.5 text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium text-slate-600 bg-[#F8F9FF] border border-slate-200/70 px-2 py-0.5 rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#102B5C] line-clamp-1">
                        {post.author.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        Author
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleShare(post, e)}
                      className="p-2 rounded-lg hover:bg-white text-slate-400 hover:text-slate-600 transition-colors"
                      title="Share link"
                      aria-label="Share article"
                    >
                      {copiedSlug === post.slug ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <span className="text-xs font-bold text-[#173C78] group-hover:text-[#EC70C9] transition-colors flex items-center gap-1">
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Newsletter / Weekly Wellness & Savings Dispatch */}
        <div className="mt-16 bg-gradient-to-r from-[#102B5C] via-[#173C78] to-[#102B5C] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#EC70C9]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E9D9FF] bg-white/10 px-3.5 py-1 rounded-full border border-white/10">
              Weekly Saverz Dispatch
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-3">
              Get Pharmacy Tips &amp; Grocery Deals Straight to Your Inbox
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
              Join 12,000+ Karachi families who receive our weekly nutrition guides, medication advisories, and exclusive mart coupons every Thursday.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-white text-[#102B5C] placeholder-slate-400 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#EC70C9]"
              />
              <button
                type="submit"
                className="bg-[#EC70C9] hover:bg-[#d85ab5] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
              >
                {newsletterSubscribed ? 'Subscribed!' : 'Subscribe Free'}
              </button>
            </form>

            {newsletterSubscribed && (
              <p className="text-xs text-emerald-300 mt-3 flex items-center gap-1.5 font-semibold">
                <Check className="w-4 h-4" />
                Thank you! You are now subscribed to the weekly Saverz Dispatch.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Article Reading Modal */}
      {readingPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto animate-in zoom-in-95 duration-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                <span 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: readingPost.categoryColor }}
                />
                <span>{readingPost.category}</span>
                <span>•</span>
                <span>{readingPost.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(readingPost, e)}
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Share"
                >
                  {copiedSlug === readingPost.slug ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setReadingPost(null)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-10">
              {/* Cover Banner */}
              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-slate-100">
                <img
                  src={readingPost.coverImage}
                  alt={readingPost.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <h1 className="text-2xl sm:text-3xl font-black text-[#102B5C] leading-snug">
                {readingPost.title}
              </h1>

              {/* Author & Date Bar */}
              <div className="mt-4 pb-6 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={readingPost.author.avatar}
                    alt={readingPost.author.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 shadow-sm"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#102B5C]">
                      {readingPost.author.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {readingPost.author.role} • {readingPost.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Formatted Article Body */}
              <div className="mt-8 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {readingPost.content.map((paragraph, idx) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={idx} className="text-lg sm:text-xl font-black text-[#102B5C] pt-4 text-left">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- **')) {
                    const clean = paragraph.replace('- **', '');
                    const [heading, ...rest] = clean.split('**');
                    return (
                      <div key={idx} className="pl-4 border-l-2 border-[#173C78] py-1 my-2 text-sm text-slate-700">
                        <strong className="text-[#102B5C] font-bold">{heading}:</strong> {rest.join('')}
                      </div>
                    );
                  }
                  return (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Key Takeaway Callout Box */}
              <div className="mt-10 bg-[#F3ECFF] border border-[#E9D9FF] rounded-2xl p-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173C78] mb-2">
                  <Sparkles className="w-4 h-4 text-[#EC70C9]" />
                  <span>Key Takeaway from Saverz Supermarket &amp; Pharmacy</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Keeping your home prepared with high-grade pharmaceuticals, fresh nutrition, and reliable first-aid saves precious time and money. All products mentioned in this guide are in stock and delivered daily across Karachi.
                </p>

                {readingPost.relatedProductCategory && (
                  <div className="mt-4 pt-4 border-t border-[#E9D9FF]/70 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-[#102B5C]">
                      Need essentials mentioned in this article?
                    </span>
                    <Link
                      href={`/shop?category=${readingPost.relatedProductCategory}`}
                      onClick={() => setReadingPost(null)}
                      className="inline-flex items-center gap-2 bg-[#102B5C] hover:bg-[#173C78] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#EC70C9]" />
                      <span>Shop Category Aisles</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Tags footer */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-400 mr-2">Article Tags:</span>
                {readingPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
