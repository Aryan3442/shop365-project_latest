import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly _ids = signal<Set<string>>(this.restore());
  readonly ids = computed(() => this._ids());
  readonly count = computed(() => this._ids().size);

  isWishlisted(productId: string): boolean {
    return this._ids().has(productId);
  }

  toggle(product: Product): void {
    const next = new Set(this._ids());
    if (next.has(product.id)) {
      next.delete(product.id);
    } else {
      next.add(product.id);
    }
    this._ids.set(next);
    localStorage.setItem('shop365_wishlist', JSON.stringify([...next]));
  }

  private restore(): Set<string> {
    const raw = localStorage.getItem('shop365_wishlist');
    return new Set(raw ? JSON.parse(raw) : []);
  }
}
