# VOGUE VAULT
## Fashion E-Commerce Frontend :  Product Requirements Document

**Project Type:** Frontend-only fashion e-commerce application  
**Project Status:** Planned  
**Version:** 1.0  
**Primary Goal:** Build a polished, functional and maintainable fashion-shopping experience using HTML, CSS and vanilla JavaScript.  
**Backend:** Out of scope for v1  
**Database:** Out of scope for v1

---

## 1. Product Vision

VOGUE VAULT is an original fashion-commerce frontend inspired by the usability of established online fashion retailers.

The application will allow users to discover fashion products, search and filter the catalogue, view product details, select sizes, manage a shopping bag and wishlist, and complete a simulated checkout.

The project must demonstrate practical frontend engineering skills, including DOM manipulation, modular JavaScript, state management, event handling, form validation, responsive design, browser storage, accessibility and testing.

### Product principles

- Design with a clear visual identity and consistent design system.
- Prioritize working functionality over decorative features.
- Use reusable components and modular JavaScript.
- Keep business logic separate from presentation.
- Handle invalid input, empty states and browser-storage failures gracefully.
- Make every visible interactive control perform its intended action.
- Avoid unnecessary dependencies and overengineered abstractions.
- Ensure that important code can be understood and explained by the developer.

---

## 2. Scope and Constraints

### Included in v1

- Multi-page responsive storefront
- Local JavaScript product catalogue
- Product discovery, search, filters and sorting
- Product detail pages and size selection
- Shopping bag and wishlist
- Persistent browser-side state
- Coupon and pricing calculations
- Simulated checkout and order confirmation
- Accessible interactions and responsive layouts
- Automated tests for important business logic
- Git-based version control and deployment

### Explicitly excluded from v1

- Backend APIs and servers
- Database integration
- Real user authentication
- Real payment processing
- Real order submission or fulfillment
- Real delivery tracking
- Live inventory and stock synchronization
- Third-party product feeds
- AI-based recommendations

These capabilities may be considered in a future version. The current implementation must not pretend that simulated features are real services.

---

## 3. Target Users

Primary users:
- Fashion shoppers exploring products by category
- Users comparing prices, discounts and ratings
- Users saving products for later
- Users managing a shopping bag before checkout

The interface should be intuitive for first-time visitors, with clear navigation, understandable pricing and predictable shopping interactions.

---

## 4. Brand and Visual Direction

### Brand identity

Brand name: VOGUE VAULT

Positioning: A modern, curated fashion destination.

The design must establish its own identity rather than reproduce Myntra's logo, exact layout, proprietary assets or distinctive branding.

### Visual principles

- Editorial, fashion-focused presentation
- Strong product photography
- Clear typography hierarchy
- Consistent spacing and alignment
- Restrained use of accent colors
- Minimal, purposeful animations
- Consistent button, input and card styling
- Clear visual feedback for user actions

### Initial design tokens

- Primary: #6C3CF0
- Primary dark: #5125C5
- Main text: #282C3F
- Muted text: #696B79
- Background: #FFFFFF
- Surface: #F7F7FA
- Border: #E5E5EC
- Success: #16803D
- Error: #D93025

These are initial tokens, not immutable values. Validate the final palette against readability and contrast requirements.

### Layout standards

- Desktop: typically 4-5 product cards per row
- Tablet: typically 2-3 cards per row
- Mobile: typically 2 cards per row
- Responsive navigation and filter controls
- Consistent page gutters and maximum content widths
- No unintended horizontal overflow
- Clear focus, hover, active and disabled states

### Asset rules

- Use licensed, permitted or original product images.
- Use descriptive filenames and meaningful alternative text.
- Maintain consistent image ratios and product-card cropping.
- Provide a fallback for failed images.
- Avoid broken links, unrelated stock imagery and fabricated brand claims.
- Do not use copyrighted brand assets without permission.

---

## 5. Technology Stack

### Required

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- JavaScript ES modules
- localStorage for demo persistence
- Git and GitHub

### Recommended development tooling

- Vite for a local development server and production build
- Vitest for automated unit tests
- ESLint for JavaScript linting
- Prettier for consistent formatting

Use only the tooling that provides clear value. Avoid adding React, a CSS framework, a state-management library or a component library to this vanilla-JavaScript version.

Vite is a development and build tool; it does not introduce a backend or database.

---

## 6. Application Pages

### 6.1 Home :  `/`

Requirements:
- Responsive site header
- Original brand logo
- Primary navigation
- Search input
- Cart and wishlist indicators
- Promotional hero section
- Featured categories
- Trending and featured products
- Curated product collections
- Footer with useful navigation
- Responsive mobile navigation

### 6.2 Product Listing :  `/products.html`

Requirements:
- Product grid rendered from the catalogue
- Breadcrumb navigation
- Search query support
- Category and brand filters
- Gender and price filters
- Discount filter
- Sort by price, rating or popularity
- Active filter indicators
- Clear-all-filters action
- Result count
- Empty-results state
- Optional pagination or load-more control if the catalogue grows

Filters must combine correctly. Sorting must preserve the active search query and filters.

### 6.3 Product Details :  `/product.html?id=PRODUCT_ID`

Requirements:
- Direct-link support using the product ID
- Product image gallery
- Product name and brand
- Current price, original price and discount
- Rating and review count, where sample data is provided
- Product description
- Available size selection
- Size validation before adding to the bag
- Wishlist toggle
- Delivery PIN-code interface clearly identified as a simulation
- Related products
- Recently viewed tracking
- Not-found state for invalid product IDs

Product details must always match the selected product, including when opened directly or refreshed.

### 6.4 Shopping Bag :  `/bag.html`

Requirements:
- Display selected products and sizes
- Increase or decrease quantity
- Remove items
- Move items to wishlist
- Show current and original prices
- Show item-level discounts
- Display subtotal, eligible discount and final total
- Apply and remove eligible demo coupons
- Display empty-bag state
- Continue shopping navigation
- Proceed to checkout
- Persist changes across page refreshes

### 6.5 Wishlist :  `/wishlist.html`

Requirements:
- Display saved products
- Add or remove products
- Move a product to the bag with valid size selection
- Prevent duplicate wishlist entries
- Navigate to product details
- Display an empty-wishlist state
- Persist changes across refreshes

### 6.6 Checkout :  `/checkout.html`

Requirements:
- Order summary
- Delivery information form
- Required-field validation
- Email and PIN-code format validation
- Clear field-level error messages
- Demo payment-method selection
- Explicit indication that checkout is simulated
- Submit prevention for invalid forms
- Final total calculation
- Order creation only after successful validation

Do not collect real payment credentials or claim that a real payment has been processed.

### 6.7 Order Confirmation :  `/order-success.html`

Requirements:
- Confirmation of the simulated order
- Generated mock order reference
- Order summary
- Link back to shopping
- Appropriate handling of direct access without a valid recent demo order

The confirmation page must not imply that an actual purchase or delivery has occurred.

### 6.8 Not Found

Provide a friendly fallback for unknown pages and invalid product identifiers.

---

## 7. Product Catalogue and Data Contract

Maintain a single authoritative product catalogue in JavaScript.

Each product must contain:

- id
- name
- brand
- category
- gender
- price
- originalPrice
- rating
- reviewCount
- images
- availableSizes
- colors
- description
- popularity
- isFeatured

Example:

{
  id: "P001",
  name: "Classic Cotton T-Shirt",
  brand: "Urban Thread",
  category: "T-Shirts",
  gender: "Men",
  price: 599,
  originalPrice: 999,
  rating: 4.3,
  reviewCount: 120,
  images: [
    "/assets/images/products/P001-1.jpg",
    "/assets/images/products/P001-2.jpg"
  ],
  availableSizes: ["S", "M", "L", "XL"],
  colors: ["Black", "White"],
  description: "A comfortable everyday cotton T-shirt.",
  popularity: 85,
  isFeatured: true
}

Catalogue rules:

1. Every product ID must be unique.
2. Prices must be finite, non-negative values.
3. Original price must be greater than or equal to current price.
4. Ratings must fall within the documented rating scale.
5. Size options must be valid for the product.
6. Image paths must resolve to usable assets or a fallback.
7. Discount percentage must be derived from prices rather than maintained as an inconsistent duplicate.
8. Search, filters, product details and the bag must use the same catalogue.
9. Use enough realistic sample products to exercise all categories and filters.
10. Product names, prices, ratings and descriptions must be internally consistent.

Recommended initial catalogue: approximately 24-40 products across several categories and brands.

---

## 8. Shopping State and Persistence

### Cart item contract

{
  productId: "P001",
  size: "M",
  quantity: 2
}

A cart entry is identified by the combination of product ID and selected size.

Adding the same product in the same size should update the existing quantity. Adding the same product in another size must create a separate entry.

### Wishlist item contract

{
  productId: "P002",
  addedAt: "2026-10-21T10:00:00.000Z"
}

A product may appear only once in the wishlist.

### Storage keys

- fashion_clone_cart
- fashion_clone_wishlist
- fashion_clone_recent_searches
- fashion_clone_recently_viewed
- fashion_clone_orders
- fashion_clone_last_order

### Persistence requirements

- Read and write through a centralized storage utility.
- Validate parsed values before using them.
- Recover safely from missing, malformed or outdated stored data.
- Display a useful message if persistence fails.
- Keep cart and wishlist indicators synchronized.
- Re-render affected UI after successful state changes.
- Avoid silently overwriting valid state because one read failed.
- Document the limitations of browser storage.

Do not store real credentials, payment details or sensitive personal information.

---

## 9. Search, Filtering and Sorting

### Search

- Match product name, brand and category.
- Ignore letter case and leading or trailing spaces.
- Update results predictably.
- Provide a clear-search action.
- Preserve the query when navigating or refreshing where appropriate.
- Show a useful no-results message.

### Filtering

Support:
- Category
- Brand
- Gender
- Price range
- Minimum discount

Requirements:
- Filters must combine using documented AND/OR rules.
- Multiple values within one filter group may use OR.
- Different filter groups should combine using AND.
- Active selections must be visible.
- Clearing filters must restore the correct results.
- Search and sorting must continue working with active filters.

### Sorting

Support:
- Price: low to high
- Price: high to low
- Highest rating
- Popularity
- Recommended/default order

Use deterministic tie-breaking where possible to avoid products jumping unpredictably.

---

## 10. Pricing and Coupon Rules

All pricing logic must be implemented in reusable, independently testable functions.

### Required calculations

- Item subtotal
- Original-price total
- Discount amount
- Coupon discount
- Shipping charge, if applicable
- Final payable demo total

### Rules

1. Quantities must be positive integers.
2. Unit prices must be valid non-negative values.
3. Never allow negative totals.
4. Round monetary calculations consistently to whole rupees.
5. Calculate discounts from the authoritative catalogue.
6. Recalculate totals whenever cart items or coupon selections change.
7. Define whether coupons apply before or after other discounts.
8. Prevent invalid, expired or ineligible coupons from being applied.
9. Do not allow coupon discounts to exceed the eligible subtotal.
10. Do not represent simulated prices or coupon results as live commercial offers.

Use a small, predefined coupon catalogue. Document minimum purchase requirements and discount caps.

Shipping rules, if included, must be explicitly documented and tested.

---

## 11. Interaction and User Experience Standards

Every interactive element must have a defined outcome.

Required interactions:
- Navigation
- Search
- Filter and sort controls
- Product-card navigation
- Wishlist toggle
- Size selection
- Add to Bag
- Quantity changes
- Remove item
- Coupon application and removal
- Form validation
- Checkout simulation
- Toast notifications
- Modal open and close actions
- Mobile menu open and close

User feedback:
- Confirm successful actions using concise notifications.
- Explain validation errors next to the relevant field.
- Use empty states with useful next actions.
- Disable actions when they are genuinely unavailable.
- Prevent duplicate submissions.
- Preserve form input when validation fails.
- Provide image fallbacks and recovery paths for missing data.

Avoid intrusive popups, unnecessary animations and buttons that only appear functional.

---

## 12. Accessibility Requirements

- Use semantic HTML elements.
- Maintain logical heading hierarchy.
- Associate form labels with inputs.
- Provide descriptive alternative text for meaningful images.
- Use buttons for actions and links for navigation.
- Support keyboard navigation.
- Provide visible keyboard focus.
- Maintain sufficient text and control contrast.
- Ensure icon-only buttons have accessible names.
- Communicate validation errors and status changes accessibly.
- Do not rely on color alone to convey state.
- Respect reduced-motion preferences.
- Ensure dialogs manage focus and support Escape where appropriate.

Target WCAG 2.2 AA practices for the implemented interface.

---

## 13. Responsive Design and Performance

### Responsive behavior

- Desktop, tablet and mobile layouts
- Consistent product image ratios
- Usable navigation at narrow widths
- Accessible mobile filter controls
- No overlapping content
- No unintended horizontal scrolling
- Comfortable touch targets
- Responsive typography and spacing

### Performance

- Use appropriately sized product images.
- Prefer modern image formats where supported.
- Lazy-load below-the-fold product imagery.
- Avoid unnecessary DOM re-rendering.
- Avoid duplicated event listeners.
- Load only required page modules.
- Keep third-party dependencies minimal.
- Handle failed images without breaking product cards.

---

## 14. Architecture and Code Organization

Use small ES modules with clear responsibilities.

- data: product and coupon catalogues
- services: cart, wishlist, search, product and order operations
- utils: storage, formatting, validation, pricing and notifications
- components: reusable header, footer, product card, modal and toast
- pages: page-specific rendering and event handling
- styles: design tokens, reset, shared layout and page-specific styles
- tests: business logic and state-management tests

Architecture rules:

1. Keep product data separate from rendering logic.
2. Keep pricing calculations separate from DOM code.
3. Centralize cart and wishlist mutations.
4. Avoid global mutable state where it is not needed.
5. Use event delegation where it simplifies dynamic product lists.
6. Use stable product IDs instead of relying on array indexes.
7. Keep modules focused and reasonably sized.
8. Avoid duplicated business rules across pages.
9. Do not introduce abstractions without a concrete need.
10. Make future backend integration possible by keeping data access separate from presentation.

---

## 15. Testing Strategy

### Unit tests

Test:
- Price and discount calculations
- Coupon eligibility and caps
- Cart add, update and remove operations
- Product-and-size identity
- Wishlist uniqueness
- Search matching
- Filter combinations
- Sorting
- Form validation
- Storage parsing and recovery

### Integration tests

Test:
- Product catalogue to product-grid rendering
- Product selection to bag updates
- Wishlist changes and indicator synchronization
- Cart updates to checkout totals
- Valid checkout to mock order confirmation

### Browser-level manual tests

Test:
- Navigation and direct links
- Refresh and browser history
- Empty cart and wishlist
- Invalid product IDs
- Missing product images
- Corrupted localStorage values
- Responsive layouts
- Keyboard navigation
- Invalid and valid checkout submissions
- Browser console errors

### Definition of test completion

Tests must be repeatable, use predictable sample data and verify actual behavior rather than merely checking that elements exist.

---

## 16. Development Phases

### Phase 0 :  Foundation
- Confirm brand direction and assets.
- Create repository and project structure.
- Configure Vite and optional quality tools.
- Establish CSS tokens and global styles.
- Create shared layout and responsive header.

### Phase 1 :  Home and Product Catalogue
- Create product data.
- Build reusable product cards.
- Render featured products and product grids.
- Implement listing page and product details.
- Add image fallbacks.

### Phase 2 :  Product Discovery
- Implement search.
- Implement filters and sorting.
- Add query-string support.
- Add breadcrumbs, empty states and result counts.

### Phase 3 :  Shopping State
- Implement storage utilities.
- Implement cart operations.
- Implement size selection and validation.
- Implement wishlist operations.
- Synchronize indicators and totals.

### Phase 4 :  Checkout
- Implement coupon calculations.
- Build delivery form and validation.
- Implement demo order creation.
- Build confirmation page.
- Verify cart-clearing and order-persistence rules.

### Phase 5 :  Quality and Polish
- Add automated tests.
- Verify responsive behavior and accessibility.
- Fix console errors and broken links.
- Optimize assets and interactions.
- Write documentation.
- Build and deploy the application.

### Phase 6 :  Optional Enhancements
- Recently viewed products
- Quick-view modal
- Recent searches
- Dark mode
- Additional product collections
- More advanced visual transitions

Each phase must meet its acceptance criteria before the next phase begins.

---

## 17. Repository and Delivery Standards

The repository should contain:
- Application source code
- Required assets
- Dependency and script definitions, if using npm
- Lockfile
- README.md
- PRD.md
- .gitignore
- Automated tests
- Clear setup and deployment instructions

Do not commit:
- node_modules
- local secrets or credentials
- unnecessary generated build files
- temporary debugging artifacts
- unrelated downloads

Use descriptive commits corresponding to completed milestones.

The README must explain:
- Project overview
- Features
- Technology stack
- Local setup
- Development and build commands
- Test commands
- Known limitations
- Deployment details
- Screenshots or a demo link when available

---

## 18. Acceptance Criteria

The project is considered complete when:

1. All required pages render correctly.
2. Search, filters and sorting work together.
3. Product details resolve from valid IDs.
4. Invalid IDs produce a useful fallback.
5. Size selection is validated before adding sized products.
6. Cart operations correctly distinguish product sizes.
7. Cart and wishlist persist across refreshes.
8. Corrupted stored data does not crash the application.
9. Pricing and coupons pass automated tests.
10. Checkout validates inputs and generates only a simulated order.
11. Every visible interactive control works.
12. Empty and error states are implemented.
13. Keyboard navigation and visible focus are supported.
14. Desktop, tablet and mobile layouts are usable.
15. Production build succeeds.
16. Core automated tests pass.
17. No known critical browser-console errors remain.
18. README and setup instructions are accurate.
19. The developer can explain the architecture and important business logic.

---

## 19. Non-Negotiable Engineering Principles

- Do not generate the entire application in one AI prompt.
- Do not add a library just because it is popular.
- Do not build decorative UI before defining behavior.
- Do not copy code without reviewing and understanding it.
- Do not duplicate product or pricing data.
- Do not treat browser storage as a secure database.
- Do not claim simulated services are real.
- Do not ignore accessibility or error handling.
- Do not mark a feature complete without testing it.
- Do not sacrifice maintainability for a quick visual demo.

## 20. Immediate Next Step

Start with the smallest working foundation:

1. Inspect the existing project directory.
2. Preserve useful existing work.
3. Finalize the original brand identity and design tokens.
4. Set up the local development environment.
5. Build the shared header and home-page shell.
6. Render a small, representative product collection.
7. Verify the page in a browser before adding more functionality.

**Build one complete, understandable feature at a time. The goal is not merely to make VOGUE VAULT look finished; the goal is to make it behave correctly, remain maintainable and demonstrate genuine frontend engineering ability.**