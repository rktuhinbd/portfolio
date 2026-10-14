# Rejaul Karim · Portfolio

A responsive, bilingual portfolio for Md. Rejaul Karim, Senior Mobile Engineer. Built with React, TypeScript and Vite, with accessible technology disclosures, animated glass surfaces and résumé-backed project stories.

**Target website:** https://rktuhinbd.github.io/portfolio/
**Target repository:** https://github.com/rktuhinbd/portfolio

## Features

- English and Bengali with persistent language selection.
- Floating technology cards with animated, keyboard-accessible detail dialogs.
- Career timeline with visible promotions and project outcomes.
- Responsive project carousel, magnetic contact links and reduced-motion support.
- Downloadable résumé, local fonts, favicon, canonical metadata and sitemap.
- Validated contact form with honest success, error and activation states.

## Quick start

Use Node.js 24 and pnpm 11.25.0.

```sh
git clone https://github.com/rktuhinbd/portfolio.git
cd portfolio
pnpm install --frozen-lockfile
pnpm dev --host 127.0.0.1 --port 4173
```

Open http://127.0.0.1:4173/portfolio/ .

```sh
pnpm lint     # TypeScript and ESLint
pnpm test     # Interaction, contact and translation tests
pnpm build    # Production output in dist/
pnpm preview  # Serve the production build locally
```

## Project structure

```text
portfolio/
├── .github/workflows/
│   ├── preview.yml          # Checks and downloadable preview artifact
│   └── deploy.yml           # Manual production Pages deployment
├── docs/
│   ├── ARCHITECTURE.md      # System boundaries and data flow
│   ├── DEPLOYMENT.md        # Publish, verify and rollback
│   ├── REFERENCE-INVENTORY.md
│   ├── PROJECT-PLAN.md
│   └── design-qa.md
├── public/
│   ├── assets/             # Supplied portrait and optimized image
│   ├── resume.pdf
│   ├── favicon.png
│   ├── apple-touch-icon.png
│   ├── social-preview.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── App.tsx
│   ├── content.ts
│   ├── contact.ts
│   ├── i18n.tsx
│   ├── translations.bn.ts
│   ├── index.css
│   ├── main.tsx
│   └── test/               # UI, contact and localization coverage
├── .env.example
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── eslint.config.js
├── vite.config.js
└── vitest.config.ts
```

Read [Architecture](docs/ARCHITECTURE.md), [Deployment](docs/DEPLOYMENT.md) and [QA findings](docs/design-qa.md).

## Content maintenance

Edit career and project information in `src/content.ts`, Bengali copy in `src/translations.bn.ts`, and replace `public/resume.pdf` when updating the résumé. Keep dates and metrics consistent. Preserve actual link destinations when translating labels. Run the checks above and inspect both languages on mobile and desktop.

## Contact configuration

Default delivery uses FormSubmit for `rejaul.karim.pro@gmail.com`, the portfolio contact address. The GitHub account email is separate and does not change this recipient. Recipient activation is required; live inbox delivery remains unverified. See [FormSubmit documentation](https://formsubmit.co/documentation). An optional public Formspree endpoint can be configured through `.env.example`; never commit secrets.

## Design and assets

The visual direction is inspired by Francisco Pacheco's portfolio and implemented independently. The portrait and résumé were supplied by the owner. Project visuals use original metric panels; proprietary reference imagery and code are not included. Third-party dependencies retain their respective licenses. No blanket reuse license is granted for personal photographs or résumé content.
