## Betting Soft Test — game catalog

Small React app to browse a game catalog: search, type filter, infinite scroll, and clean cover cards.

### Demo

- **Production**: [Open demo](https://Matthew3dg.github.io/betting-soft-test/)

### Features

- **Search**: by game name and ID (triggered by the “SEARCH” button).
- **Filter by type**: dropdown with available game types.
- **Infinite scroll**: loads cards in batches while scrolling.
- **Game cards**: CDN cover images and game title; lazy‑loaded images.
- **Loading states**: loading indicator and empty state.

### Tech stack

- **React 19**, **TypeScript**
- **Redux Toolkit Query** for data fetching
- **Sass Modules** for styling
- **Create React App** (react-scripts 5)
- **ESLint + Prettier**, husky and lint-staged
- **GitHub Actions + Pages** for auto‑deploy

### Quick start

1. Install dependencies:
   ```bash
   yarn install
   ```
2. Start the dev server:
   ```bash
   yarn start
   ```
   The app opens at `http://localhost:3000`.

### Scripts

- **Dev server**: `yarn start`
- **Production build**: `yarn build`
- **Tests**: `yarn test`
- **Lint**: `yarn lint`
- **Format**: `yarn format`
- **Manual deploy to gh-pages**: `yarn deploy`

### API and environment

- In development, requests to `'/api'` are proxied to `https://belparyaj.com` via `src/setupProxy.js`.
- In production, the API base URL comes from `REACT_APP_API_BASE_URL` (defaults to `https://belparyaj.com`).
- The images base URL comes from `REACT_APP_IMAGE_BASE_URL` (defaults to `https://bsw-dk1.pragmaticplay.net`).

Sample `.env`:

```env
REACT_APP_API_BASE_URL=https://belparyaj.com
REACT_APP_IMAGE_BASE_URL=https://bsw-dk1.pragmaticplay.net
```

### Project structure (short)

```text
src/
  pages/home/ui/HomePage.tsx        # Catalog screen: search/filter, infinite scroll
  entities/game/api/gameApi.ts      # Fetch game list (RTK Query)
  entities/game/ui/GameCard/        # Game card
  widgets/header/                   # Header with search and types
  widgets/search-panel/             # Input field + SEARCH button
  widgets/game-type-panel/          # Game type select
  widgets/provider-row/             # Provider row
  shared/ui/                        # Basic UI components (Button, Select, TextInput, ...)
  shared/api/env.ts                 # API/image URLs config
```

### Deployment

- **Auto‑deploy**: on push to `main`, GitHub Actions builds and publishes to GitHub Pages (see `/.github/workflows/deploy.yml`).
- **SPA fallback**: during `postbuild`, `build/index.html` is copied to `build/404.html` for correct routing on Pages.
- **Manual deploy**: `yarn deploy` (uses `gh-pages`, publishes `build`).

### Requirements

- Node.js 20+ (same as CI), Yarn 1.x

If you notice an issue or want to suggest an improvement — feel free to open an issue/PR. Enjoy!
