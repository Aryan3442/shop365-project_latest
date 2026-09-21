import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  products = computed(() =>
    [...this.wishlist.ids()]
      .map(id => this.productService.getById(id))
      .filter((p): p is NonNullable<typeof p> => !!p)
  );

  constructor(public wishlist: WishlistService, private productService: ProductService) {}
}
