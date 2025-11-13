# Technology Stack

## Core
- **Language**: TypeScript 5.2.2 (strict mode)
- **Runtime**: Node.js 18+
- **Package Manager**: pnpm (lockfile v6.0)
- **Build Tool**: Vite 4.5.0
- **Bundler Optimization**: Million.js 2.6.4 (auto mode)

## Frontend Framework
- **React**: 18.2.0
- **React DOM**: 18.2.0
- **Router**: react-router-dom 6.18.0

## UI & Styling
- **Component Library**: Chakra UI 2.8.1
- **Icons**:
  - @chakra-ui/icons 2.1.1
  - @chakra-icons/bootstrap 1.5.1
  - @chakra-icons/tabler-icons 1.29.0
  - react-icons 4.11.0
- **Emotion**: 11.11.1 (CSS-in-JS)
- **Fonts**: @fontsource/plus-jakarta-sans 5.0.17
- **Animation**:
  - framer-motion 10.16.4
  - @react-spring/web 9.7.3

## Utilities
- **FP Utilities**: @mobily/ts-belt 3.13.1
- **Pattern Matching**: ts-pattern 5.0.5
- **Swipe Cards**: react-tinder-card 1.6.4
- **SEO**: react-helmet 6.1.0

## Development Tools
- **Compiler**: @vitejs/plugin-react-swc 3.5.0 (SWC for faster builds)
- **Type Checking**: vite-plugin-checker
- **Path Aliases**: vite-tsconfig-paths
- **Linter**: ESLint 8.53.0 (config: eslint-config-sznm 2.0.2)
- **Formatter**: Prettier 3.0.3
- **Git Hooks**: Husky 8.0.3
- **Pre-commit**: lint-staged 15.0.2
- **Commit Linting**: commitlint 18.2.0 (@commitlint/config-conventional)
- **Dead Code Detection**: knip 2.40.0

## Deployment
- **Primary**: Netlify (SPA fallback configured)
- **Alternative**: Vercel (vercel.json present)
- **Build Command**: `pnpm build`
- **Base URL**: Configurable via VITE_APP_BASE_URL

## API Integration
- **Backend Proxy**: http://indiemart.yggdrasil.id
- **Proxy Path**: `/api` → backend root
- **API Base URL**: Configurable via VITE_APP_API_BASE_URL

## TypeScript Configuration
- **Target**: ESNext
- **Module**: ESNext (Bundler resolution)
- **JSX**: react-jsx
- **Base URL**: src (alias: ~/* → src/*)
- **Strict Mode**: Enabled
- **No Unused Locals/Parameters**: Enforced
- **Isolated Modules**: Enabled (for Vite)

## Browser Support
- DOM + ESNext features
- Modern browsers (ESNext target)
