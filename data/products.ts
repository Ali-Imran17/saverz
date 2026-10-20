import { Product, ProductCategory, CustomerReview } from '@/types';
import { foodProducts } from './products/food';
import { snackProducts } from './products/snacks';
import { toyProducts } from './products/toys';
import { crockeryProducts } from './products/crockery';
import { householdProducts } from './products/household';

export const allProducts: Product[] = [
  ...foodProducts,
  ...snackProducts,
  ...toyProducts,
  ...crockeryProducts,
  ...householdProducts,
];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id || p.slug === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return allProducts.filter((p) => p.category === category);
}

export function getFeaturedProducts(limit = 12): Product[] {
  return allProducts.filter((p) => p.featured).slice(0, limit);
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const current = getProductById(productId);
  if (!current) return allProducts.slice(0, limit);
  return allProducts
    .filter((p) => p.category === current.category && p.id !== current.id)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return allProducts;
  const q = query.toLowerCase().trim();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

export const initialReviews: CustomerReview[] = [
  {
    id: 'rev-001',
    name: 'Syed Hamza Farooq',
    rating: 5,
    date: 'October 14, 2026',
    comment: 'Exceptional shopping experience in Model Colony Karachi! Groceries were fresh, packaging was immaculate, and the order arrived right on schedule.',
    verified: true,
    location: 'Model Colony, Karachi',
  },
  {
    id: 'rev-002',
    name: 'Ayesha Tariq',
    rating: 5,
    date: 'October 11, 2026',
    comment: 'I ordered crockery items and household supplies together. The porcelain bowls were packed with extreme care. Saverz has become my go-to supermarket.',
    verified: true,
    location: 'Malir Cantt, Karachi',
  },
  {
    id: 'rev-003',
    name: 'Mohammad Bilal Khan',
    rating: 5,
    date: 'October 08, 2026',
    comment: 'The prices on basmati rice and cooking oil are significantly more competitive than other marts. Very smooth website layout too.',
    verified: true,
    location: 'Gulshan-e-Iqbal, Karachi',
  },
  {
    id: 'rev-004',
    name: 'Zainab Fatima',
    rating: 5,
    date: 'October 04, 2026',
    comment: 'Bought learning toys for my 4-year-old nephew and snack packs for home. Great quality, original brands, and friendly customer support on the phone.',
    verified: true,
    location: 'Liaquat Ali Khan Rd, Karachi',
  },
];
