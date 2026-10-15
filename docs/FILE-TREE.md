# File and folder tree

Only maintained source, documentation and static assets belong in Git. Installed dependencies, build output, local environment files, editor state and operating-system metadata are ignored.

```text
portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml              # Manual production build and Pages deployment
│       └── preview.yml             # Branch/PR checks and downloadable artifact
├── docs/
│   ├── ARCHITECTURE.md             # Boundaries, decisions and data flow
│   ├── DEPLOYMENT.md               # Publish, verify and roll back
│   ├── FILE-TREE.md                # This maintained source inventory
│   └── VERIFICATION.md             # Production and contact evidence
├── public/
│   ├── assets/
│   │   ├── portrait.jpg            # Supplied source portrait
│   │   └── portrait.webp           # Optimized website portrait
│   ├── .nojekyll                   # Preserve GitHub Pages asset paths
│   ├── apple-touch-icon.png
│   ├── favicon.png
│   ├── resume.pdf                  # Authoritative downloadable résumé
│   ├── robots.txt
│   ├── sitemap.xml
│   └── social-preview.jpg
├── src/
│   ├── test/
│   │   ├── contact.test.ts         # Validation and provider response states
│   │   ├── localization.test.ts    # Bengali script and terminology contracts
│   │   ├── setup.ts                # Browser API test shims
│   │   └── ui.test.tsx             # Navigation, dialog, timeline and form behavior
│   ├── App.tsx                     # Sections and interaction components
│   ├── contact.ts                  # Contact delivery service
│   ├── content.ts                  # Career, project and technology data
│   ├── i18n.tsx                    # Locale provider and persistence
│   ├── index.css                   # Tokens, layout, effects and responsive rules
│   ├── main.tsx                    # Application bootstrap
│   ├── translations.bn.ts          # Bengali localization dictionary
│   └── vite-env.d.ts
├── .env.example                    # Optional public Formspree endpoint
├── .gitignore                      # Generated and local file exclusions
├── .nvmrc                          # Node.js release used by the project
├── .prettierignore                 # Generated and lockfile formatting exclusions
├── README.md                       # Product, setup and maintenance guide
├── eslint.config.js
├── index.html                      # HTML shell, SEO and structured data
├── package.json                    # Scripts, dependencies and tool versions
├── pnpm-lock.yaml                  # Reproducible dependency graph
├── pnpm-workspace.yaml             # pnpm dependency build policy
├── tsconfig.json
├── vite.config.js                  # React/Tailwind integration and Pages base
└── vitest.config.ts
```

## Generated locally

- `node_modules/` — recreated with `pnpm install --frozen-lockfile`.
- `dist/` — recreated with `pnpm build`.
- `coverage/` — generated only when coverage is requested.
- `.env*` except `.env.example` — local configuration that may contain sensitive values.

## Maintenance ownership

- Career facts and links: `src/content.ts`.
- English UI copy: component source strings.
- Bengali UI copy: `src/translations.bn.ts`.
- Visual behavior: `src/App.tsx` and `src/index.css`.
- Contact policy: `src/contact.ts`.
- Static résumé and identity assets: `public/`.
- Delivery behavior: `.github/workflows/`.
