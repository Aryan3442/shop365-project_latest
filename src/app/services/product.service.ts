import { Injectable } from '@angular/core';
import { Product, Gender, ProductCategory } from '../models/product.model';

/**
 * In production, replace PRODUCTS with an HttpClient call to your backend/CMS
 * (e.g. GET /api/products). The shape below is what your API should return.
 */
const PRODUCTS: Product[] = [
  {
    id: 'h-tshirt-01', name: 'Heritage Crew Tee', brand: 'Shop365 Basics', price: 799, mrp: 1199,
    gender: 'him', category: 'T-Shirts',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'],
    colors: ['#111827', '#d1d5db', '#b45309'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.5, reviewCount: 312, description: 'Premium cotton tee with a clean silhouette built for everyday layering.',
    hotSelling: true, outOfStock: true, tags: ['bestseller']
  },
  {
    id: 'h-shirt-01', name: 'Oxford Signature Shirt', brand: 'Shop365 Formal', price: 1899, mrp: 2499,
    gender: 'him', category: 'Shirts',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=80'],
    colors: ['#e5e7eb', '#93c5fd', '#1f2937'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.3, reviewCount: 148, description: 'Structured oxford fabric for polished office looks and relaxed evenings.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'h-perfume-01', name: 'Noir Intense EDP', brand: 'Shop365 Fragrance', price: 2999, mrp: 3999,
    gender: 'him', category: 'Perfumes',
    images: ['https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80'],
    colors: [], sizes: ['50ml', '100ml'],
    rating: 4.7, reviewCount: 501, description: 'Woody-amber notes of oud, saffron and black pepper for a bold signature.',
    hotSelling: true, outOfStock: true, tags: ['bestseller']
  },
  {
    id: 'h-sunglasses-01', name: 'Aviator Classic', brand: 'Shop365 Eyewear', price: 1499, mrp: 1999,
    gender: 'him', category: 'Sunglasses',
    images: ['https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=80'],
    colors: ['#111827', '#7c2d12'], sizes: ['One Size'],
    rating: 4.4, reviewCount: 220, description: 'UV400 protection with a timeless gold-frame silhouette.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'h-watch-01', name: 'Chrono Steel Watch', brand: 'Shop365 Timewear', price: 3499, mrp: 4999,
    gender: 'him', category: 'Watches',
    images: ['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80'],
    colors: ['#374151'], sizes: ['One Size'],
    rating: 4.6, reviewCount: 176, description: 'Stainless steel chronograph built for daily performance and events.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'h-footwear-01', name: 'Retro Runner Sneakers', brand: 'Shop365 Footwear', price: 2599, mrp: 3299,
    gender: 'him', category: 'Footwear',
    images: ['https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=900&q=80'],
    colors: ['#ffffff', '#111827'], sizes: ['7', '8', '9', '10', '11'],
    rating: 4.5, reviewCount: 410, description: 'Retro-inspired runners with lightweight cushioning and breathable knit.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'h-bag-01', name: 'Metro Trail Pack', brand: 'Shop365 Travel', price: 2299, mrp: 3199,
    gender: 'him', category: 'Bags',
    images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80'],
    colors: ['#111827', '#6b7280'], sizes: ['One Size'],
    rating: 4.3, reviewCount: 118, description: 'Functional male backpack with clean lines and enough room for weekend essentials.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'h-jacket-01', name: 'City Light Bomber', brand: 'Shop365 Outerwear', price: 3799, mrp: 4999,
    gender: 'him', category: 'Shirts',
    images: ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'],
    colors: ['#111827', '#f59e0b'], sizes: ['S', 'M', 'L', 'XL'],
    rating: 4.7, reviewCount: 162, description: 'Modern bomber jacket with a clean matte finish and lightweight insulation.',
    hotSelling: true, outOfStock: true, tags: ['bestseller']
  },
  {
    id: 'h-belt-01', name: 'Ridge Leather Belt', brand: 'Shop365 Access', price: 1499, mrp: 2199,
    gender: 'him', category: 'Bags',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80'],
    colors: ['#1f2937', '#b45309'], sizes: ['S', 'M', 'L'],
    rating: 4.4, reviewCount: 88, description: 'Premium leather belt with a structured buckle built for sharp daily styling.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'w-tshirt-01', name: 'Boxy Crop Tee', brand: 'Shop365 Basics', price: 749, mrp: 999,
    gender: 'her', category: 'T-Shirts',
    images: ['https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'],
    colors: ['#fde68a', '#fca5a5', '#ffffff'], sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.4, reviewCount: 289, description: 'Soft cotton crop top designed for easy layering and a relaxed everyday look.',
    hotSelling: true, outOfStock: true, tags: ['bestseller']
  },
  {
    id: 'w-shirt-01', name: 'Satin Resort Shirt', brand: 'Shop365 Formal', price: 1699, mrp: 2299,
    gender: 'her', category: 'Shirts',
    images: ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80'],
    colors: ['#fbcfe8', '#e5e7eb', '#d97706'], sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.2, reviewCount: 97, description: 'Fluid satin shirt with a soft drape for chic daytime styling.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'w-perfume-01', name: 'Bloom Eau de Parfum', brand: 'Shop365 Fragrance', price: 2799, mrp: 3599,
    gender: 'her', category: 'Perfumes',
    images: ['https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80'],
    colors: [], sizes: ['50ml', '100ml'],
    rating: 4.8, reviewCount: 612, description: 'Floral-fruity notes of jasmine, peony, and soft musk for a feminine trail.',
    hotSelling: true, outOfStock: true, tags: ['bestseller']
  },
  {
    id: 'w-sunglasses-01', name: 'Oversized Cat-Eye', brand: 'Shop365 Eyewear', price: 1399, mrp: 1899,
    gender: 'her', category: 'Sunglasses',
    images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80'],
    colors: ['#111827', '#fbbf24'], sizes: ['One Size'],
    rating: 4.5, reviewCount: 203, description: 'Statement cat-eye frames with gradient UV400 lenses for elevated styling.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'w-bag-01', name: 'Structured Tote', brand: 'Shop365 Accessories', price: 2199, mrp: 2999,
    gender: 'her', category: 'Bags',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80'],
    colors: ['#78350f', '#111827'], sizes: ['One Size'],
    rating: 4.3, reviewCount: 134, description: 'Structured vegan-leather tote with soft gold hardware and a roomy interior.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'w-watch-01', name: 'Velvet Dial Watch', brand: 'Shop365 Timewear', price: 3299, mrp: 4499,
    gender: 'her', category: 'Watches',
    images: ['https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80'],
    colors: ['#e5e7eb', '#f9a8d4'], sizes: ['One Size'],
    rating: 4.6, reviewCount: 189, description: 'Slim feminine watch with a polished strap and sculpted dial.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'w-footwear-01', name: 'Luna Street Runner', brand: 'Shop365 Footwear', price: 2499, mrp: 3399,
    gender: 'her', category: 'Footwear',
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80'],
    colors: ['#fdf2f8', '#111827', '#e5e7eb'], sizes: ['5', '6', '7', '8'],
    rating: 4.5, reviewCount: 267, description: 'Everyday trainers with soft cushioning and a sleek city-ready profile.',
    hotSelling: true, outOfStock: true, tags: ['bestseller']
  },
  {
    id: 'w-dress-01', name: 'Rose Silk Dress', brand: 'Shop365 Studio', price: 3299, mrp: 4499,
    gender: 'her', category: 'Dresses',
    images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80'],
    colors: ['#f9a8d4', '#fef3c7', '#d1d5db'], sizes: ['XS', 'S', 'M', 'L'],
    rating: 4.8, reviewCount: 195, description: 'Fluid silk slip dress crafted for elevated evenings and occasion wear.',
    hotSelling: true, outOfStock: false, tags: ['bestseller']
  },
  {
    id: 'w-jewelry-01', name: 'Aurora Gold Set', brand: 'Shop365 Luxe', price: 2599, mrp: 3599,
    gender: 'her', category: 'Bags',
    images: ['https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80'],
    colors: ['#fbbf24', '#f5d0fe'], sizes: ['One Size'],
    rating: 4.7, reviewCount: 132, description: 'Layered gold jewelry set made to pair with minimal and statement looks alike.',
    hotSelling: false, outOfStock: false
  },
  {
    id: 'w-accessory-01', name: 'Luna Silk Scarf', brand: 'Shop365 Access', price: 1299, mrp: 1799,
    gender: 'her', category: 'Accessories',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'],
    colors: ['#f9a8d4', '#dbeafe', '#fef3c7'], sizes: ['One Size'],
    rating: 4.4, reviewCount: 106, description: 'Soft silk scarf with a light drape designed to finish elevated everyday outfits.',
    hotSelling: false, outOfStock: false
  }
];

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = PRODUCTS;

  getAll(): Product[] {
    return this.products;
  }

  getByGender(gender: Gender): Product[] {
    return this.products.filter(p => p.gender === gender);
  }

  getByCategory(gender: Gender, category: ProductCategory): Product[] {
    return this.products.filter(p => p.gender === gender && p.category === category);
  }

  getHotSelling(): Product[] {
    return this.products.filter(p => p.hotSelling);
  }

  getById(id: string): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  getCategories(gender: Gender): ProductCategory[] {
    return [...new Set(this.products.filter(p => p.gender === gender).map(p => p.category))];
  }

  search(query: string): Product[] {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
}
