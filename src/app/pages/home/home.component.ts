import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Product } from '../../models/product.model';

interface HeroSlide {
  title: string;
  subtitle: string;
  cta: string;
  route: string;
  accent: string;
  bg: string;
}

interface CategorySpotlight {
  name: string;
  label: string;
  route: string;
  description: string;
  emoji: string;
  accent: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  hotSelling: Product[] = [];
  forHim: Product[] = [];
  forHer: Product[] = [];
  currentSlide = 0;

  slides: HeroSlide[] = [
    {
      title: 'Luxury for every day',
      subtitle: 'Premium essentials for him and her, designed for effortless confidence and refined everyday style.',
      cta: 'Explore latest picks',
      route: '/category/him',
      accent: '#c7a17b',
      bg: 'linear-gradient(135deg, rgba(122,96,76,0.42), rgba(55,51,45,0.24), rgba(10,10,12,0.94))'
    },
    {
      title: 'Refined essentials',
      subtitle: 'Curated shirts, watches, sneakers, and statement pieces that bring polish to your daily rhythm.',
      cta: 'Shop the edit',
      route: '/category/her',
      accent: '#d7b999',
      bg: 'linear-gradient(135deg, rgba(99,78,62,0.4), rgba(139,114,89,0.18), rgba(10,10,12,0.95))'
    },
    {
      title: 'New season, elevated',
      subtitle: 'Trend-first styles and best-sellers delivered with a premium customer experience.',
      cta: 'View trending now',
      route: '/category/him',
      accent: '#d3c1ae',
      bg: 'linear-gradient(135deg, rgba(78,67,58,0.4), rgba(160,131,101,0.16), rgba(10,10,12,0.96))'
    }
  ];

  spotlightCategories: CategorySpotlight[] = [
    { name: 'HIM', label: 'Modern essentials', route: '/category/him', description: 'Shirts, watches, sneakers and more.', emoji: '🧥', accent: '#d4af37' },
    { name: 'HER', label: 'Fashion-forward picks', route: '/category/her', description: 'T-shirts, sunglasses, silhouettes and luxe basics.', emoji: '👗', accent: '#ff7aa2' },
    { name: 'TRENDING', label: 'Best sellers', route: '/category/him', description: 'Customer favorites and statement pieces.', emoji: '🔥', accent: '#7dd3fc' }
  ];

  constructor(private productService: ProductService) {
    this.hotSelling = this.productService.getHotSelling();
    this.forHim = this.productService.getByGender('him').slice(0, 4);
    this.forHer = this.productService.getByGender('her').slice(0, 4);

    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 5000);
  }

  setSlide(index: number): void {
    this.currentSlide = index;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
