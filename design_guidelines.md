# Design Guidelines for Mitra Safety Indonesia E-Commerce Website

## Design Approach
**Industry Reference**: E-commerce leaders (Tokopedia, Shopee for Indonesian market; Amazon, Shopify globally)
**Priority**: Mobile-first design with conversion optimization focus
**Market**: Indonesian safety equipment buyers (B2B and B2C)

## Core Design Principles

### 1. Mobile-First Layout System
- Start with mobile (320px+) and scale to desktop (1920px)
- Use Tailwind spacing: p-2, p-4, p-6, p-8 for consistent rhythm
- Minimum touch targets: 48x48px with adequate spacing
- Responsive grid: 1 column mobile, 2-3 columns tablet, 3-4 columns desktop

### 2. Color Palette
**Primary Colors (Safety Industry)**
- Safety Orange/Red: For urgency, CTAs, safety warnings
- Industrial Blue: For trust, professionalism, headers
- Neutral Grays: For backgrounds, cards, text hierarchy

**Accent Colors**
- Success Green: For confirmations, availability badges
- Alert Yellow: For limited stock warnings (use sparingly)

**Light Mode** (primary for Indonesian market)
- Background: White/very light gray
- Text: Dark gray for readability
- Cards: Subtle shadows with white backgrounds

### 3. Typography
**Font Stack**: Google Fonts via CDN
- Primary: Inter or Nunito (excellent Bahasa Indonesia support)
- Headings: Bold (700), sizes 24px-48px mobile, 32px-72px desktop
- Body: Regular (400), 14px-16px mobile, 16px-18px desktop
- Price: Semi-bold (600), prominent sizing

### 4. Visual Hierarchy & Content

#### Homepage Structure
1. **Hero Section**: Large product imagery or category showcase (80vh mobile, 60vh desktop)
2. **Featured Categories**: Grid with icon/image + label
3. **Best Sellers**: Horizontal scroll on mobile, grid on desktop
4. **Promotions/Trust Badges**: "Trusted by 500+ companies"
5. **Category Deep Links**: Quick access to main product types

#### Product Pages
1. **Image Gallery**: Multiple angles, zoomable, swipeable carousel
2. **Product Title & SKU**: Clear hierarchy
3. **Price Display**: Large, prominent with discount strikethrough
4. **Add to Cart**: Fixed bottom bar on mobile, sidebar on desktop
5. **Specifications**: Tabbed or accordion format
6. **Related Products**: Cross-sell section

#### Navigation
- **Mobile**: Hamburger menu with search bar always visible
- **Desktop**: Mega menu with category dropdowns
- **Breadcrumbs**: Home > Category > Subcategory > Product
- **Maximum 3 clicks** to any product

### 5. Component Library

**Cards**
- Product cards: Image, title, price, rating, quick-add button
- Clean borders, subtle shadows (shadow-sm)
- Hover states: slight elevation (shadow-md transition)

**Buttons**
- Primary CTA: Solid background, high contrast
- Secondary: Outline variant with blurred background when over images
- Icon buttons: Shopping cart, wishlist, search

**Forms**
- Large input fields (min-height 44px)
- Clear labels and validation messages
- Auto-detect Indonesian phone/address formats

**Search & Filters**
- Sticky search bar on all pages
- Faceted filters: Price, category, brand, availability
- Clear active filter indicators

### 6. Performance & Optimization

**Images**
- WebP format for all product images
- Multiple resolutions: thumbnail, medium, large
- Lazy loading below fold
- Compression target: 70-80% reduction from original

**Loading States**
- Skeleton screens for product grids
- Progressive image loading
- Loading indicators for cart updates

**Caching**
- Static assets cached (1 year)
- API responses cached where appropriate

### 7. Checkout Flow (3 Steps Maximum)

**Step 1: Cart Review**
- Item list with quantity adjustment
- Remove/save for later options
- Subtotal calculation

**Step 2: Shipping & Contact**
- Guest checkout option (no forced registration)
- Indonesian address format with province/city dropdowns
- Phone number validation for WhatsApp integration

**Step 3: Order Confirmation**
- Order summary
- Payment method selection
- Submit order CTA

### 8. Accessibility Requirements

**Semantic HTML**
- `<nav>`, `<main>`, `<article>`, `<button>` elements
- Proper heading hierarchy (h1 → h6)

**ARIA Support**
- Labels for all form inputs
- Live regions for cart updates
- Descriptive alt text: "Red industrial safety helmet with adjustable chin strap"

**Keyboard Navigation**
- All interactive elements tabbable
- Skip to content link
- Focus indicators visible

### 9. Trust & Conversion Elements

**Product Trust Signals**
- High-quality images from 4-6 angles
- Short demo videos (15-30 seconds)
- Product certifications/safety standards badges
- Customer reviews and ratings

**Site-Wide Trust**
- Secure checkout badges
- Customer testimonials: "Dipercaya oleh 500+ perusahaan"
- Clear return policy
- WhatsApp support widget

**Pricing Transparency**
- All prices in IDR (Indonesian Rupiah)
- Format: Rp 150.000 (with thousands separator)
- Discount badges: "Hemat 25%"

### 10. Indonesian Market Specifics

**Language**
- Full Bahasa Indonesia interface
- Common terms: "Keranjang" (Cart), "Beli Sekarang" (Buy Now)
- Province/city selectors for shipping

**Payment Integration Readiness**
- Popular methods: Bank transfer, e-wallet (GoPay, OVO, Dana)
- COD (Cash on Delivery) option

**Images Section**

**Hero Section**: Yes - large hero image
- Main hero: Industrial worker wearing safety equipment, Indonesian setting
- Dimensions: 1920x800px desktop, 768x600px mobile
- Message overlay: Company value proposition

**Category Images**
- Icon-style illustrations for each safety category
- Dimensions: 400x400px, uniform sizing

**Product Images**
- Professional photography with white/neutral backgrounds
- Multiple angles: front, side, detail shots, in-use
- Minimum 6 images per product
- Dimensions: 1200x1200px (square), zoomable

**Trust Section Images**
- Customer logos (if B2B)
- Certification badges
- Team/warehouse photos for credibility

This design framework ensures a conversion-optimized, accessible, and performant e-commerce experience tailored to the Indonesian safety equipment market.