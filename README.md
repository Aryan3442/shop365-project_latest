# Shop365 — Angular E-commerce Storefront

A fashion storefront for **Him** & **Her** — t-shirts, shirts, perfumes, sunglasses, watches,
bags, footwear — with animated UI, Google/Apple login, wishlist, out-of-stock states on the
hottest sellers, and a payment checkout flow.

## What's fully working right now (no setup needed)
- Home page with animated hero, "Hot Selling" section, Him/Her previews
- Category pages with sub-category chips + sort (Him/Her)
- Product detail page — size/color picker, qty, add to cart, buy now
- **Out of stock** logic: every `hotSelling: true` product in `product.service.ts` is marked
  `outOfStock: true` (per your spec — the hottest sellers show the "Notify Me" flow instead of Add to Cart)
- Wishlist — heart icon anywhere, persisted to `localStorage`
- Cart — qty controls, subtotal/shipping/total, persisted to `localStorage`
- Checkout — address form → "Pay" button
- Login page UI for Google + Apple, with a simulated sign-in so the whole flow is clickable today

## Running it
```bash
npm install
npm start
```
This opens at `http://localhost:4200`.

## Wiring up the three things that need YOUR credentials

### 1. Google Sign-In
- Get an OAuth Client ID: https://console.cloud.google.com/apis/credentials
- `npm i @abacritt/angularx-social-login`
- Add the config to `app.config.ts` (commented pointer already there) and replace the
  `signInWithGoogle()` body in `services/auth.service.ts` with a real
  `SocialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)` call.

### 2. Apple Sign-In
- Register a Services ID: https://developer.apple.com/account/resources/identifiers
- The Apple JS SDK is already loaded in `src/index.html`.
- Replace `signInWithApple()` in `auth.service.ts` with `window.AppleID.auth.init(...)` +
  `signIn()`. **Apple's token must be verified on your backend** — never trust it client-side.

### 3. Payments (Razorpay used as the example gateway)
- Sign up at https://dashboard.razorpay.com, grab your **Key ID** (never expose your Secret Key
  in frontend code).
- Razorpay's `checkout.js` is already loaded in `index.html`.
- In `pages/checkout/checkout.component.ts`, replace `'YOUR_RAZORPAY_KEY_ID'` with your real key,
  and — critically — add a backend endpoint that creates the order server-side
  (`POST /api/create-order`) and another that verifies the payment signature
  (`POST /api/verify-payment`) before you mark an order as paid.
- Prefer Stripe or PayPal instead? Same pattern — swap the SDK script tag and the `payNow()` body.

**Important:** Auth and payments both need a real backend (Node/Express, NestJS, Firebase
Functions, whatever you like) to verify tokens and signatures server-side. Doing this purely in
the browser is not secure for production — happy to help you scaffold that backend next.

## Where the product catalog lives
`src/app/services/product.service.ts` — currently an in-memory array so the app runs standalone.
Swap it for an `HttpClient` call to your real product API/CMS when you have one; the `Product`
interface in `models/product.model.ts` defines the exact shape to return.

## Adding more products/categories
Just add entries to the `PRODUCTS` array in `product.service.ts` — `gender: 'him' | 'her'` and
`category` drive all filtering automatically, no other code changes needed.
