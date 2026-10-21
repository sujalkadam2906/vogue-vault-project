# VOGUE VAULT

VOGUE VAULT is a curated fashion e-commerce frontend built using vanilla JavaScript, modern CSS, and Vite.

## Architecture and Structure

- **Styles (`styles/`):** Modular CSS architecture using variables, typography resets, layout grids, components, pages, and responsive breakpoints.
- **Components (`src/components/`):** Reusable UI component modules for header, footer, product cards, grids, modals, and toasts.
- **Pages (`src/pages/`):** Dedicated page controllers managing catalog discovery, product detail views, bag operations, wishlist bookmarks, simulated checkout, and order confirmations.
- **Services (`src/services/`):** Business logic layer for catalog lookup, search filtering, cart state, wishlist persistence, promo code validation, and order creation.
- **Utils (`src/utils/`):** Pure utility helpers for pricing math, formatting, input validation, and browser local storage.
- **Assets (`assets/`):** Optimized photography (4:5 aspect ratio, under 200 KB each), SVG monograms, and icons. Full photographer licensing records are documented in `assets/images/CREDITS.md`.

## Local Development and Build

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:3000)
npm run dev

# Run unit tests
node tests/cart.test.js
node tests/pricing.test.js
node tests/search.test.js
node tests/storage.test.js

# Build production bundle
npm run build
```

## Before Launch

Complete the following steps before deploying this project to production:

1. **Connect custom domain:** Configure your production domain DNS records and SSL certificates in your hosting provider dashboard (e.g. Vercel, Netlify, Cloudflare Pages, or AWS CloudFront). This configuration cannot be executed in code.
2. **Fill all legal placeholders:** Open `privacy.html`, `terms.html`, `contact.html`, and `shipping.html` to replace all bracketed placeholders with your official entity details:
   - `[BUSINESS LEGAL NAME]`
   - `[CONTACT EMAIL]`
   - `[REGISTERED ADDRESS]`
3. **Have legal documentation reviewed:** Engage qualified legal counsel to review, adjust, and approve the Terms and Conditions and Privacy Policy templates according to your company structure and jurisdiction.
4. **Replace any placeholder imagery:** Confirm that all product photos and marketing media represent your actual product inventory and comply with commercial licensing terms.
