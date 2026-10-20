export type ProductCategory = 
  | 'food-items' 
  | 'snacks' 
  | 'toys' 
  | 'crockery' 
  | 'household';

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortDescription: string;
  image: string;
  productCount: number;
  itemExamples: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  categoryName: string;
  price: number; // in PKR
  originalPrice?: number; // in PKR
  discount?: number; // percentage
  image: string;
  description: string;
  unit: string; // e.g. "5 kg", "150 g", "1 Litre", "Pack of 4"
  inStock: boolean;
  rating: number; // 1-5
  reviewCount: number;
  featured: boolean;
  badge?: 'Bestseller' | 'Sale' | 'New' | 'Popular';
  keywords: string[];
  brand: string;
  origin?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerReview {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  location: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  areaLandmark: string;
  orderNotes?: string;
  paymentMethod: 'cash-on-delivery' | 'easypaisa' | 'bank-transfer';
}

export interface OrderConfirmation {
  orderId: string;
  orderDate: string;
  customer: CheckoutFormData;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
}
