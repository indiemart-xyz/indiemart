# IndieMart - Context Summary

## What Is This?
IndieMart is a Tinder-style product search aggregator for Indonesian e-commerce (Klikindomaret, Alfacart, Alfagift, Yogya Online). Users swipe right to add products to cart, swipe left to remove, and share cart via URL.

## Tech Stack (Core)
- **React 18.2** + **TypeScript 5.2** (strict)
- **Vite 4.5** (SWC, Million.js optimization)
- **Chakra UI 2.8** (styling + components)
- **React Router 6** (SPA routing)
- **pnpm** (package manager)
- **Node 18+** (runtime)

## Key Libraries
- **FP**: ts-belt (FP utils), ts-pattern (pattern matching)
- **Animation**: framer-motion, react-spring
- **Swipe**: react-tinder-card
- **SEO**: react-helmet

## Project Structure
```
src/
├── lib/
│   ├── pages/home/        # Main app (search, filter, cart)
│   │   ├── index.tsx      # Home component (state, effects)
│   │   ├── api.ts         # searchProduct API
│   │   ├── types.ts       # SearchResponse, AsyncData
│   │   ├── utils.ts       # Format helpers
│   │   ├── Search.tsx     # Debounced search input
│   │   ├── Filter.tsx     # Source filter
│   │   └── List.tsx       # Swipeable cards
│   ├── layout/            # Header, Footer, ThemeToggle, Meta
│   ├── router/            # Routes, Routings
│   └── styles/theme/      # Chakra theme config
├── App.tsx
└── index.tsx
```

## Data Model
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
type AsyncData<T, E> =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok'; data: T }
  | { kind: 'error'; error: E };
```

## State Management
Single component state in Home:
- **query**: Search term (debounced 1s)
- **filter**: { source?: Source }
- **data**: AsyncData<SearchResponse[], unknown>
- **cart**: SearchResponse[]
- **view**: 'list' | 'cart'

## Core Flows

### 1. Search
User types → debounce (1s) → POST /api/search → render list

### 2. Add to Cart
Swipe right → check duplicates → add to cart → hide from list

### 3. Remove from Cart
Swipe left (in cart view) → filter out product

### 4. Share Cart
Click share → cart → JSON → base64 → URL → clipboard → toast

### 5. Load Shared Cart
Visit URL → decode pathname → set cart + switch to cart view

## API Integration
- **Proxy**: /api → http://indiemart.yggdrasil.id
- **Search**: POST /api/search (body: { query, source? })
- **Config**: VITE_APP_API_BASE_URL (default: /api)

## Standards (KISS + DRY)

### Code Style
- **Prettier**: 2 spaces, single quotes, semicolons, LF
- **ESLint**: sznm config, no unused vars/params
- **TypeScript**: Strict mode, no implicit any

### Commits
- **Format**: Conventional Commits (feat/fix/docs/refactor/etc)
- **Hooks**: Husky + lint-staged (lint + format on commit)
- **Linting**: Commitlint (@commitlint/config-conventional)

### Naming
- **Components**: PascalCase (ThemeToggle.tsx)
- **Utils**: camelCase (utils.ts, searchProduct)
- **Types**: PascalCase (SearchResponse)

### Branching
- **Main**: `main`
- **Feature**: No strict convention

## Dev Workflow
```bash
pnpm dev          # Start dev server (HMR)
pnpm build        # Build for prod → dist/
pnpm lint         # ESLint check
pnpm format       # Prettier format
```

## Deployment
- **Netlify**: Build `pnpm build`, publish dist/, Node 18, SPA fallback
- **Vercel**: Auto-detect Vite, vercel.json configured
- **CI**: .github/workflows/ (release, license updates)

## Environment Variables
- **VITE_APP_BASE_URL**: App base path (default: /)
- **VITE_APP_API_BASE_URL**: API URL (default: /api)
- **File**: .env (gitignored), .env.example (tracked)

## Key Features
1. **Search**: Debounced search across 4 e-commerce sources
2. **Filter**: By source (Klikindomaret, Alfacart, Alfagift, Yogya Online)
3. **Swipe**: Tinder-style cards (right = add, left = remove)
4. **Cart**: Total price, duplicate prevention
5. **Share**: Base64-encoded URL sharing
6. **Theme**: Light/dark mode toggle (Chakra UI)
7. **Responsive**: Mobile-first design

## Current State
- **No Tests**: Test framework not configured
- **No CI Checks**: Linting/tests not enforced in PR
- **No Monitoring**: Error tracking not configured
- **Simple State**: No Zustand/Redux (local state only)

## Future Improvements
- Add Vitest for testing
- Add CI/CD checks (lint, test, build)
- Add error monitoring (Sentry)
- Add product details page
- Add user authentication
- Add order history
- Add backend (currently proxied)

## Development Tips
- **Path Alias**: Use `~/` for src imports (e.g., `import { Home } from '~/lib/pages/home'`)
- **FP Patterns**: Prefer ts-belt/ts-pattern over imperative code
- **Async State**: Use AsyncData discriminated union
- **Swipe Directions**: List (right only), Cart (left only)
- **Default Query**: 'mie' (popular Indonesian instant noodles)

## Dependencies to Know
- **Million.js**: React compiler optimization (auto mode)
- **SWC**: Faster than Babel (3-5x speedup)
- **Chakra UI**: Built-in accessibility, responsive props
- **ts-belt**: FP utils (F.debounce, etc)
- **ts-pattern**: Pattern matching (match/with/otherwise)

## Context Files
- **.context/technology.md**: Full tech stack details
- **.context/function.md**: Domains, modules, data flows
- **.context/standard.md**: Coding standards, conventions
- **.context/plan/**: Feature plans (use for new features)
- **claude.md**: This file (compact summary)

## Agent Instructions
1. **Read context first**: Check .context/ before asking questions
2. **Follow KISS/DRY**: Simple > complex, reuse > duplicate
3. **Match style**: Follow prettier/eslint config
4. **Conventional commits**: Use feat/fix/refactor/etc
5. **Plan features**: Use .context/plan/ template
6. **Update context**: Keep claude.md in sync after changes
7. **No tests yet**: Focus on functionality first

## Quick Reference
- **Main Entry**: src/index.tsx → App.tsx → routes.tsx → Home
- **API Call**: src/lib/pages/home/api.ts (searchProduct)
- **Types**: src/lib/pages/home/types.ts
- **Theme**: src/lib/styles/theme/
- **Config**: vite.config.ts, tsconfig.json, .prettierrc
