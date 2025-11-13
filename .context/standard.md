# Project Standards

## Principles
- **KISS (Keep It Simple, Stupid)**: Prefer simple solutions over complex ones
- **DRY (Don't Repeat Yourself)**: Extract reusable logic into utilities
- **Functional Programming**: Use FP patterns (ts-belt, ts-pattern)
- **Type Safety**: Leverage TypeScript strict mode

## Code Style

### Formatting (Prettier)
- **Line Ending**: LF (Unix)
- **Semicolons**: Required
- **Quotes**: Single quotes
- **Tab Width**: 2 spaces
- **Trailing Comma**: ES5 style
- **Auto-format**: On commit (lint-staged)

### Linting (ESLint)
- **Config**: eslint-config-sznm
- **Scope**: All .js, .jsx, .ts, .tsx in src/
- **No Unused**: Locals and parameters disallowed
- **Consistent Casing**: Enforced in filenames
- **No Fallthrough**: Switch cases must break/return

### TypeScript
- **Strict Mode**: Enabled
- **Target**: ESNext
- **JSX**: react-jsx (new transform)
- **Path Aliases**: Use `~/` for src imports
- **No Any**: Avoid implicit any types
- **Isolated Modules**: Required for Vite compatibility

## Naming Conventions

### Files
- **Components**: PascalCase (e.g., `ThemeToggle.tsx`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: camelCase (e.g., `types.ts`)
- **Config**: kebab-case (e.g., `vite.config.ts`)

### Code
- **Components**: PascalCase (e.g., `const Home = () => {}`)
- **Functions**: camelCase (e.g., `const searchProduct = () => {}`)
- **Types**: PascalCase (e.g., `type SearchResponse = {}`)
- **Constants**: camelCase (e.g., `const baseURL = ''`)

## Git Workflow

### Branching
- **Main Branch**: `main`
- **Feature Branches**: No strict convention observed
- **Protection**: None configured (small project)

### Commits (Commitlint)
- **Format**: Conventional Commits (@commitlint/config-conventional)
- **Types**: feat, fix, docs, style, refactor, test, chore, ci
- **Scope**: Optional (e.g., `feat(home): add filter`)
- **Examples**:
  - `feat: add healthcheck endpoint`
  - `fix(cart): prevent duplicate products`
  - `refactor: extract cart logic to hooks`

### Pre-commit Hooks (Husky + lint-staged)
- **On Commit**:
  1. Run ESLint on staged files
  2. Run Prettier on staged files
  3. Run Commitlint on commit message
- **Location**: .husky/pre-commit
- **Config**: .lintstagedrc.json

## Testing
- **Current State**: No test framework configured
- **Future**: Consider Vitest (Vite-native) or Jest

## Environment Variables
- **VITE_APP_BASE_URL**: App base path (default: `/`)
- **VITE_APP_API_BASE_URL**: API base URL (default: `/api`)
- **File**: .env (ignored), .env.example (tracked)

## Dependencies

### Adding Dependencies
- **Use**: `pnpm add <package>`
- **Justification**: Document why in PR/commit (for non-trivial libs)
- **Prefer**: Lightweight, well-maintained packages
- **Check**: Bundle size impact (knip for unused)

### Updating Dependencies
- **Tool**: Renovate (renovate.json configured)
- **Auto-merge**: Not configured
- **Review**: Check breaking changes before merging

## Build & Deploy

### Local Development
- **Start**: `pnpm dev` (Vite dev server with HMR)
- **Port**: Auto-assigned (default 5173)
- **Open**: Auto-opens browser

### Production Build
- **Command**: `pnpm build`
- **Output**: dist/ directory
- **Type Check**: Via vite-plugin-checker
- **Lint**: Via vite-plugin-checker

### Deployment
- **Netlify**:
  - Build: `pnpm build`
  - Publish: dist/
  - Node: 18
  - SPA: Redirect /* → /index.html (200)
- **Vercel**:
  - Config: vercel.json present
  - Framework: Auto-detected (Vite)

### CI/CD
- **Workflows**: .github/workflows/
  - release.yml: Production releases
  - update-license.yml: License maintenance
- **No PR Checks**: Tests/linting not enforced in CI

## Performance

### Optimizations
- **Million.js**: Auto mode for React optimization
- **SWC**: Faster than Babel (plugin-react-swc)
- **Code Splitting**: Via Vite dynamic imports
- **Tree Shaking**: Enabled by default in Vite

### Monitoring
- **Current**: None configured
- **Future**: Consider Sentry or similar for error tracking

## Accessibility
- **ARIA Labels**: Required for IconButtons
- **Semantic HTML**: Use appropriate tags
- **Color Contrast**: Chakra UI defaults (WCAG AA)
- **Keyboard Nav**: Chakra UI handles most cases

## Security
- **Dependencies**: Renovate for updates
- **API Proxy**: Prevents CORS issues, hides backend URL
- **Input Sanitization**: Handle in backend
- **XSS**: React escapes by default
- **Secrets**: Never commit .env (in .gitignore)

## Documentation
- **README**: Basic setup (minimal)
- **Code Comments**: Use sparingly, prefer self-documenting code
- **Type Definitions**: Serve as inline documentation
- **Context Files**: This directory (.context/) for agent memory

## Code Review Checklist
- [ ] Follows KISS/DRY principles
- [ ] TypeScript types are explicit (no any)
- [ ] No unused variables/imports (ESLint)
- [ ] Formatted with Prettier
- [ ] Conventional commit message
- [ ] No console.logs (except intentional debug)
- [ ] Accessibility labels on interactive elements
- [ ] Mobile-responsive (Chakra UI handles most)
