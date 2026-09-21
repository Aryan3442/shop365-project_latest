import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Product, Gender, ProductCategory } from '../../models/product.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  gender: Gender = 'him';
  categories: ProductCategory[] = [];
  activeCategory: ProductCategory | 'All' = 'All';
  products: Product[] = [];
  sort: 'popular' | 'price-asc' | 'price-desc' = 'popular';

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.route.paramMap.subscribe(params => {
      this.gender = (params.get('gender') as Gender) ?? 'him';
      this.categories = this.productService.getCategories(this.gender);
      this.activeCategory = 'All';
      this.applyFilters();
    });
  }

  selectCategory(cat: ProductCategory | 'All') {
    this.activeCategory = cat;
    this.applyFilters();
  }

  onSortChange(value: string) {
    this.sort = value as typeof this.sort;
    this.applyFilters();
  }

  private applyFilters() {
    let list = this.activeCategory === 'All'
      ? this.productService.getByGender(this.gender)
      : this.productService.getByCategory(this.gender, this.activeCategory);

    list = [...list];
    if (this.sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    if (this.sort === 'price-desc') list.sort((a, b) => b.price - a.price);

    this.products = list;
  }
}
