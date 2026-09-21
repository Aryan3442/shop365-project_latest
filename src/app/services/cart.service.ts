import { Injectable, signal, computed } from '@angular/core';
import { CartItem, Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly _items = signal<CartItem[]>(this.restore());
  private readonly _couponCode = signal<string>(this.restoreCoupon());
  readonly items = computed(() => this._items());
  readonly count = computed(() => this._items().reduce((sum, i) => sum + i.qty, 0));
  readonly subtotal = computed(() => this._items().reduce((sum, i) => sum + i.product.price * i.qty, 0));
  readonly couponCode = computed(() => this._couponCode().trim().toUpperCase());
  readonly couponDiscount = computed(() => {
    const code = this.couponCode();
    if (code !== 'SALE') return 0;
    return this.subtotal() * 0.1;
  });

  add(product: Product, size: string, color: string, qty = 1): void {
    if (product.outOfStock) return; // guard: hot-selling sold-out items can't be added
    const items = [...this._items()];
    const existing = items.find(i => i.product.id === product.id && i.size === size && i.color === color);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ product, size, color, qty });
    }
    this.persist(items);
  }

  updateQty(index: number, qty: number): void {
    const items = [...this._items()];
    if (qty <= 0) {
      items.splice(index, 1);
    } else {
      items[index].qty = qty;
    }
    this.persist(items);
  }

  remove(index: number): void {
    const items = [...this._items()];
    items.splice(index, 1);
    this.persist(items);
  }

  clear(): void {
    this.persist([]);
  }

  applyCoupon(code: string): boolean {
    const normalized = code.trim().toUpperCase();
    if (normalized !== 'SALE') {
      this._couponCode.set('');
      localStorage.removeItem('shop365_coupon');
      return false;
    }

    this._couponCode.set(normalized);
    localStorage.setItem('shop365_coupon', normalized);
    return true;
  }

  removeCoupon(): void {
    this._couponCode.set('');
    localStorage.removeItem('shop365_coupon');
  }

  private persist(items: CartItem[]) {
    this._items.set(items);
    localStorage.setItem('shop365_cart', JSON.stringify(items));
  }

  private restore(): CartItem[] {
    const raw = localStorage.getItem('shop365_cart');
    return raw ? JSON.parse(raw) : [];
  }

  private restoreCoupon(): string {
    return localStorage.getItem('shop365_coupon') ?? '';
  }
}
