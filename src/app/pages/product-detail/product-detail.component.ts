import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  Math = Math;
  product?: Product;
  selectedSize = '';
  selectedColor = '';
  qty = 1;
  justAdded = false;
  notifyMeSubmitted = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    public cart: CartService,
    public wishlist: WishlistService
  ) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.product = this.productService.getById(id);
    if (this.product) {
      this.selectedSize = this.product.sizes[0] ?? '';
      this.selectedColor = this.product.colors[0] ?? '';
    }
  }

  discountPct(): number {
    if (!this.product || this.product.mrp <= this.product.price) return 0;
    return Math.round(((this.product.mrp - this.product.price) / this.product.mrp) * 100);
  }

  addToCart() {
    if (!this.product || this.product.outOfStock) return;
    this.cart.add(this.product, this.selectedSize, this.selectedColor, this.qty);
    this.justAdded = true;
    setTimeout(() => (this.justAdded = false), 1800);
  }

  buyNow() {
    this.addToCart();
    this.router.navigate(['/cart']);
  }

  notifyMe() {
    // Hook this up to a real "back in stock" email/SMS capture endpoint.
    this.notifyMeSubmitted = true;
  }
}
