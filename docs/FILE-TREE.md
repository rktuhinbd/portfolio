# File and folder tree

Only maintained source, documentation and static assets belong in Git. Generated output, installed dependencies, local environment files and editor state are ignored.

```text
portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml              # Manual production build and GitHub Pages deployment
│       └── preview.yml             # Pull-request/branch validation and build artifact
├── docs/
│   ├── ARCHITECTURE.md             # Runtime boundaries, interactions and data flow
│   ├── DEPLOYMENT.md               # Publish, validate, troubleshoot and roll back
│   ├── FILE-TREE.md                # This maintained source-tree reference
│   ├── PROJECT-PLAN.md             # Original implementation scope and sources of truth
│   ├── REFERENCE-INVENTORY.md      # Observed reference behavior and adaptations
│   ├── VERIFICATION.md             # Production and contact-delivery evidence
│   └── design-qa.md                # Responsive, interaction and fidelity QA record
├── public/
│   ├── assets/
│   │   ├── portrait.jpg            # Supplied source portrait
│   │   └── portrait.webp           # Optimized website portrait
│   ├── .nojekyll                   # Preserve asset paths on GitHub Pages
│   ├── apple-touch-icon.png
│   ├── favicon.png
│   ├── resume.pdf                  # Authoritative downloadable résumé
│   ├── robots.txt
│   ├── sitemap.xml
│   └── social-preview.jpg
├── src/
│   ├── test/
│   │   ├── contact.test.ts         # Delivery validation and provider-response states
│   │   ├── localization.test.ts    # Bengali script and terminology consistency
│   │   ├── setup.ts                # Browser API test shims
│   │   └── ui.test.tsx             # Navigation, dialog, timeline and form behavior
│   ├── App.tsx                     # Portfolio sections and interaction components
│   ├── contact.ts                  # Form validation, endpoint policy and delivery client
│   ├── content.ts                  # Résumé-backed career, project and technology data
│   ├── i18n.tsx                    # Locale provider, persistence and document metadata
│   ├── index.css                   # Tokens, layouts, effects and responsive rules
│   ├── main.tsx                    # Application bootstrap and bundled fonts
│   ├── translations.bn.ts          # Professional Bengali copy and transliterations
│   └── vite-env.d.ts
├── .env.example                    # Optional public Formspree endpoint override
├── .gitignore                      # Generated, local and sensitive-file exclusions
├── README.md                       # Product purpose, stack, usage and maintenance
├── eslint.config.js
├── index.html                      # HTML shell, SEO and structured data
├── package.json                    # Scripts and pinned package-manager version
├── pnpm-lock.yaml                  # Reproducible dependency graph
├── pnpm-workspace.yaml             # pnpm build-policy configuration
├── tsconfig.json
├── vite.config.js                  # React/Tailwind integration and `/portfolio/` base
└── vitest.config.ts
```

## Generated locally

- `node_modules/` — dependency installation; recreate with `pnpm install --frozen-lockfile`.
- `dist/` — production site; recreate with `pnpm build`.
- `coverage/` — optional test coverage output.
- `.env*` except `.env.example` — local configuration and potential secrets.

## Ownership rules

- Career facts and outbound project links: `src/content.ts`.
- UI copy: English source strings in components; Bengali equivalents in `src/translations.bn.ts`.
- Visual behavior: `src/App.tsx` and `src/index.css`.
- Contact policy: `src/contact.ts`; keep provider secrets out of frontend code.
- Deployment behavior: `.github/workflows/`; keep production deployment explicit and reviewable.
