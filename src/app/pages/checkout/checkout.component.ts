import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

declare const Razorpay: any;

/**
 * REAL PAYMENT INTEGRATION NOTES
 * -----------------------------------------------------------------------
 * This uses Razorpay as the example gateway (works well for India; swap for
 * Stripe/PayPal if you're targeting other markets — the pattern is the same).
 *
 * 1. Sign up at https://dashboard.razorpay.com and grab your Key ID.
 * 2. Razorpay's checkout.js is already loaded in index.html.
 * 3. NEVER create the order on the client. Add a backend endpoint, e.g.
 *      POST /api/create-order  { amount, currency }
 *    which calls Razorpay's Orders API with your SECRET key server-side
 *    and returns an order_id. Use that order_id below instead of a fake one.
 * 4. After payment, verify the payment signature on your backend
 *    (POST /api/verify-payment) before marking the order as paid —
 *    client-side "success" callbacks can be spoofed.
 * -----------------------------------------------------------------------
 */
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  processing = false;
  orderPlaced = false;
  address = { name: '', phone: '', line1: '', city: '', pincode: '' };

  constructor(public cart: CartService, private router: Router) {}

  get total(): number {
    return this.cart.subtotal() + (this.cart.subtotal() > 1999 ? 0 : 99) - this.cart.couponDiscount();
  }

  payNow() {
    this.processing = true;

    // Swap this stubbed order object for a real order_id returned by your backend.
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',
      amount: this.total * 100, // paise
      currency: 'INR',
      name: 'Shop365',
      description: `Order for ${this.cart.count()} item(s)`,
      order_id: undefined, // <-- set this from your backend's create-order response
      handler: (response: any) => {
        // In production: POST response.razorpay_payment_id + order_id + signature
        // to your backend's /api/verify-payment before showing success.
        this.completeOrder();
      },
      prefill: { name: this.address.name, contact: this.address.phone },
      theme: { color: '#d4af37' },
      modal: { ondismiss: () => { this.processing = false; } }
    };

    if (typeof Razorpay !== 'undefined') {
      const rzp = new Razorpay(options);
      rzp.open();
    } else {
      // Razorpay script not loaded (e.g. offline demo) — simulate success so the
      // flow is still fully testable end to end.
      setTimeout(() => this.completeOrder(), 900);
    }
  }

  private completeOrder() {
    this.processing = false;
    this.orderPlaced = true;
    this.cart.clear();
  }

  backHome() {
    this.router.navigate(['/']);
  }
}
