import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  couponInput = '';
  popupVisible = false;
  popupMessage = '';

  constructor(public cart: CartService) {}

  shipping(): number {
    return this.cart.subtotal() > 1999 || this.cart.subtotal() === 0 ? 0 : 99;
  }

  couponDiscount(): number {
    return this.cart.couponDiscount();
  }

  total(): number {
    return this.cart.subtotal() + this.shipping() - this.couponDiscount();
  }

  applyCoupon(): void {
    const entered = this.couponInput.trim();
    if (!entered) {
      this.showPopup('Please enter a coupon code.');
      return;
    }

    const valid = this.cart.applyCoupon(entered);
    if (valid) {
      this.couponInput = '';
      this.showPopup('Congratulations! Coupon "SALE" is successfully applied.');
      return;
    }

    this.showPopup('Invalid coupon code. Try SALE.');
  }

  removeCoupon(): void {
    this.cart.removeCoupon();
    this.couponInput = '';
    this.showPopup('Coupon removed successfully.');
  }

  private showPopup(message: string): void {
    this.popupMessage = message;
    this.popupVisible = true;

    window.setTimeout(() => {
      this.popupVisible = false;
    }, 2500);
  }
}
