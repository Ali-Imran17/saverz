import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts, allProducts } from '@/data/products';
import { ProductDetailsClient } from './ProductDetailsClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | Saverz Supermarket',
    };
  }

  return {
    title: `${product.name} | Saverz Supermarket`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} - Rs. ${product.price}`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product.id, 4);

  return <ProductDetailsClient product={product} relatedProducts={related} />;
}
