export type Gender = 'him' | 'her';

export type ProductCategory =
  | 'T-Shirts'
  | 'Shirts'
  | 'Hoodies'
  | 'Dresses'
  | 'Accessories'
  | 'Perfumes'
  | 'Sunglasses'
  | 'Watches'
  | 'Bags'
  | 'Footwear';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;               // original price, for showing a discount strike-through
  gender: Gender;
  category: ProductCategory;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  description: string;
  hotSelling: boolean;       // drives the "trending" badge
  outOfStock: boolean;       // true only ever set on hotSelling items per requirement
  tags?: string[];
}

export interface CartItem {
  product: Product;
  qty: number;
  size: string;
  color: string;
}

export interface AppUser {
  id: string;
  name: string;
  email: string;
  photoUrl?: string;
  provider: 'google' | 'apple' | 'email';
}
