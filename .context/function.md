# Functional Context

## Purpose
IndieMart is a product search and shopping cart aggregator for Indonesian e-commerce platforms. Users can search products, swipe through results like Tinder cards, build a cart, and share their selections via shareable URLs.

## Domains

### Product Search
- **Sources**: klikindomaret, alfacart, alfagift, yogyaonline
- **Search API**: POST /api/search
- **Filters**: By source (optional)
- **Debounced**: 1 second delay on query input

### Product Data Model
```typescript
type Source = 'klikindomaret' | 'alfacart' | 'alfagift' | 'yogyaonline';
type SearchResponse = {
  id?: string;
  name?: string;
  link?: string;
  source?: Source;
  image?: string;
  prices?: number;
};
```

### Shopping Cart
- **Add to Cart**: Swipe right on product cards
- **Remove from Cart**: Swipe left on cart items
- **Deduplication**: Products already in cart are hidden from list view
- **Total Calculation**: Sum of all product prices
- **Persistence**: Via shareable URL (base64-encoded JSON)

### URL Sharing
- **Encoding Flow**: cart → JSON.stringify → btoa → encodeURIComponent → URL
- **Decoding Flow**: URL pathname → decodeURIComponent → atob → JSON.parse → cart
- **Format**: `${origin}/${encodedCartData}`
- **Auto-load**: On page load, decodes URL and switches to cart view

## Modules

### Pages
- **Home** (`src/lib/pages/home/index.tsx`): Main application page
  - State: query, filter, data, cart, view
  - Views: 'list' | 'cart'
  - Default query: 'mie'

### Components
- **Search** (`Search.tsx`): Debounced search input
- **Filter** (`Filter.tsx`): Source filter with clear option
- **List** (`List.tsx`): Swipeable card list (react-tinder-card)
  - List view: prevent left/up/bottom swipe
  - Cart view: prevent right/up/bottom swipe

### Layout
- **Header** (`src/lib/layout/Header.tsx`)
- **Footer** (`src/lib/layout/Footer.tsx`)
- **ThemeToggle** (`src/lib/layout/ThemeToggle.tsx`)
- **Meta** (`src/lib/layout/Meta.tsx`): SEO via react-helmet

### Routing
- **Router**: React Router v6 (`src/lib/router/`)
- **SPA Fallback**: All routes → /index.html (Netlify/Vercel config)

## Data Flow

1. **Search Flow**:
   - User types → debounce (1s) → setState(query)
   - useEffect triggers → searchProduct(query, source)
   - API response → setState(data: AsyncData)
   - Render list with filtered results

2. **Add to Cart Flow**:
   - User swipes right → onSwipeList(dir, product)
   - Check if product exists → add if new
   - setState(cart: [...old, product])
   - Hide product from list view

3. **Remove from Cart Flow**:
   - User swipes left (in cart) → onSwipeCart(dir, product)
   - setState(cart: filter(id !== product.id))

4. **Share Cart Flow**:
   - User clicks share → shareURL(cart)
   - Encode cart → copy to clipboard → toast notification

5. **Load Shared Cart Flow**:
   - User visits URL with cart data → useEffect on mount
   - Decode pathname → setState(cart, view: 'cart')

## Async State Pattern
Uses discriminated union pattern (ts-pattern):
```typescript
type AsyncData<T, E> =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok'; data: T }
  | { kind: 'error'; error: E };
```

## Error Handling
- API errors → show alert: "Kesalahan terjadi, tapi bukan dari kamu kok! :("
- Share failures → toast notification
- URL decode failures → silently logged

## Key Use Cases

1. **Search Products**: User searches for "mie" → see results from all sources
2. **Filter by Source**: User clicks "klikindomaret" → see only Indomaret results
3. **Build Cart**: User swipes right on 5 products → cart count shows 5
4. **View Cart**: User clicks cart icon → see cart with total price
5. **Share Cart**: User clicks share → URL copied to clipboard
6. **Load Shared Cart**: Friend opens URL → sees same cart items
