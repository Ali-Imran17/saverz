import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  Sparkles, 
  ShoppingBag, 
  ChevronRight, 
  Home, 
  BookOpen 
} from 'lucide-react';
import { BLOG_POSTS, getBlogPostBySlug, getRelatedBlogPosts } from '@/data/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found | Saverz Supermarket & Pharmacy',
    };
  }

  return {
    title: `${post.title} | Saverz Blog`,
    description: post.excerpt,
    keywords: [...post.tags, 'Saverz Supermarket', 'Health Tips Karachi'],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://saverz.pk/blog/${post.slug}`,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedBlogPosts(post.id, 3);

  return (
    <div className="bg-[#F8F9FF] min-h-screen pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-2 text-xs text-slate-500 overflow-x-auto">
          <Link href="/" className="hover:text-[#102B5C] flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/blog" className="hover:text-[#102B5C]">
            Blog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#102B5C] font-semibold truncate max-w-xs sm:max-w-md">
            {post.title}
          </span>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#173C78] hover:text-[#EC70C9] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>

        {/* Category & Read Time */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm"
            style={{ backgroundColor: post.categoryColor }}
          >
            {post.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#102B5C] tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          {post.excerpt}
        </p>

        {/* Author Bio Bar */}
        <div className="mt-6 py-4 border-y border-slate-200/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
            />
            <div>
              <p className="text-sm font-bold text-[#102B5C]">{post.author.name}</p>
              <p className="text-xs text-slate-400">
                {post.author.role} • {post.date}
              </p>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="mt-8 rounded-3xl overflow-hidden shadow-xl aspect-[16/9] bg-slate-100">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="mt-10 bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-sm space-y-6 text-slate-700 text-base leading-relaxed">
          {post.content.map((paragraph, idx) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h2
                  key={idx}
                  className="text-2xl sm:text-3xl font-black text-[#102B5C] pt-6 first:pt-0"
                >
                  {paragraph.replace('### ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('- **')) {
              const clean = paragraph.replace('- **', '');
              const [heading, ...rest] = clean.split('**');
              return (
                <div key={idx} className="pl-4 border-l-4 border-[#173C78] py-1 my-3 bg-[#F8F9FF] rounded-r-xl p-3">
                  <strong className="text-[#102B5C] font-bold">{heading}:</strong> {rest.join('')}
                </div>
              );
            }
            return <p key={idx}>{paragraph}</p>;
          })}

          {/* Key Takeaways Callout */}
          <div className="mt-10 bg-[#F3ECFF] border border-[#E9D9FF] rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173C78] mb-2">
              <Sparkles className="w-4 h-4 text-[#EC70C9]" />
              <span>Key Takeaway from Saverz Supermarket &amp; Pharmacy</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Keeping your household supplied with fresh groceries and genuine medical essentials is crucial for family health and peace of mind. We deliver genuine pharmacy medicines and everyday groceries daily across Karachi.
            </p>

            {post.relatedProductCategory && (
              <div className="mt-6 pt-5 border-t border-[#E9D9FF]/70 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-semibold text-[#102B5C]">
                  Shop authentic products featured in this article:
                </span>
                <Link
                  href={`/shop?category=${post.relatedProductCategory}`}
                  className="inline-flex items-center gap-2 bg-[#102B5C] hover:bg-[#173C78] text-white text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#EC70C9]" />
                  <span>Explore Category Products</span>
                </Link>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-lg"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16">
          <h3 className="text-2xl font-black text-[#102B5C] mb-6">
            Related Guides &amp; Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={rel.coverImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span 
                      className="text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded"
                      style={{ backgroundColor: rel.categoryColor }}
                    >
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-sm text-[#102B5C] group-hover:text-[#173C78] transition-colors mt-2 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-3">{rel.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
