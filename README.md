# Rejaul Karim · Senior Mobile Engineer Portfolio

A production portfolio for Md. Rejaul Karim, presenting more than eight years of Android and cross-platform engineering experience through verified career history, selected products and measurable outcomes.

The project turns a conventional résumé into an interactive product story. Its design combines a dark editorial layout with floating technology cards, glass surfaces, responsive motion and direct project evidence while keeping the experience accessible, bilingual and fast on mobile devices.

**Target website:** https://rktuhinbd.github.io/portfolio/
**Target repository:** https://github.com/rktuhinbd/portfolio

## Features

- English and Bengali with persistent language selection.
- Floating technology cards with animated, keyboard-accessible detail dialogs.
- Career timeline with visible promotions and project outcomes.
- Responsive project carousel, magnetic contact links and reduced-motion support.
- Downloadable résumé, local fonts, favicon, canonical metadata and sitemap.
- Validated contact form with honest success, error and activation states.

## Project goals

- Present senior-level engineering impact rather than a generic list of tools.
- Keep career claims, dates and metrics aligned with the supplied résumé.
- Give English and Bengali readers a complete, professionally localized experience.
- Recreate the reference site's interaction language independently, without copying its source code or proprietary imagery.
- Ship as a maintainable static application with repeatable checks and automated GitHub Pages delivery.

## Technology stack

| Layer        | Technology                                       | Purpose                                                                             |
| ------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| UI           | React 19                                         | Component composition, state and accessible interaction flows                       |
| Language     | TypeScript 5                                     | Typed content models, form contracts and safer refactoring                          |
| Build        | Vite 7                                           | Fast development server and optimized `/portfolio/` production bundle               |
| Motion       | Framer Motion 12, CSS and Web Animations API     | Section reveals, floating cards, glass hover effects and card-to-dialog transitions |
| Styling      | Tailwind CSS 4 tooling and hand-authored CSS     | Responsive layout, visual tokens, Bengali typography and interaction states         |
| Icons        | React Icons                                      | Consistent technology, navigation and social marks                                  |
| Fonts        | Space Grotesk, JetBrains Mono, Noto Sans Bengali | Display, technical and Bengali text, bundled locally for privacy and consistency    |
| Localization | React context and a typed translation dictionary | Persistent English/Bengali selection and document-language metadata                 |
| Contact      | FormSubmit AJAX endpoint                         | Serverless email delivery with validation, honeypot and explicit status handling    |
| Tests        | Vitest, Testing Library and jsdom                | UI behavior, contact states, localization consistency and accessibility contracts   |
| Quality      | TypeScript, ESLint and Prettier                  | Static analysis and repeatable formatting                                           |
| Delivery     | GitHub Actions and GitHub Pages                  | Locked installation, lint, tests, production build and HTTPS deployment             |

## Implementation highlights

- Six floating technology cards expose résumé-backed details through native dialogs. Dialogs lock background scrolling, support Escape and outside-click dismissal, contain keyboard focus, and restore focus to their trigger.
- The opening transition is calculated from the selected card's screen position, then animates translation, rotation and scale into an upright glass panel. Reduced-motion preferences bypass optional animation.
- Pointer-responsive dotted fields and magnetic contact links run only when useful and degrade safely on touch devices.
- Career and project data live in `src/content.ts`, separating verified content from presentation code.
- Bengali copy is maintained in one dictionary with consistent Bengali-script transliterations for technical terms. Tests prevent accidental English fragments in translated UI copy.
- Contact requests use an allowlisted HTTPS endpoint, client-side validation, a hidden honeypot, a 15-second timeout, duplicate-submit protection and distinct activation, success and failure states.
- SEO assets include canonical metadata, structured `Person` data, Open Graph imagery, a sitemap, robots instructions and portrait-based icons.

## Architecture at a glance

```text
Résumé + verified links ──> src/content.ts ──┐
                                             ├──> React UI ──> Vite static bundle ──> GitHub Pages
English/Bengali copy ──> localization layer ─┘          │
                                                        └──> FormSubmit ──> Gmail inbox
```

The application has no runtime server or database. GitHub Pages serves the immutable frontend, while FormSubmit handles the only external write path. See [Architecture](docs/ARCHITECTURE.md) for system boundaries and data flow.

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
│   ├── FILE-TREE.md         # Complete maintained source-tree guide
│   ├── VERIFICATION.md      # Production and contact-delivery evidence
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

Read [Architecture](docs/ARCHITECTURE.md), [File tree](docs/FILE-TREE.md), [Deployment](docs/DEPLOYMENT.md), [Verification](docs/VERIFICATION.md) and [QA findings](docs/design-qa.md).

## Content maintenance

Edit career and project information in `src/content.ts`, Bengali copy in `src/translations.bn.ts`, and replace `public/resume.pdf` when updating the résumé. Keep dates and metrics consistent. Preserve actual link destinations when translating labels. Run the checks above and inspect both languages on mobile and desktop.

## Contact configuration

Default delivery uses FormSubmit for `rejaul.karim.pro@gmail.com`, the portfolio contact address. The GitHub account email is separate and does not change this recipient. FormSubmit activation and live inbox delivery were verified from the published site on 15 October 2026. See [Verification](docs/VERIFICATION.md) and the [FormSubmit documentation](https://formsubmit.co/documentation). An optional public Formspree endpoint can be configured through `.env.example`; never commit secrets.

## Design and assets

The visual direction is inspired by Francisco Pacheco's portfolio and implemented independently. The portrait and résumé were supplied by the owner. Project visuals use original metric panels; proprietary reference imagery and code are not included. Third-party dependencies retain their respective licenses. No blanket reuse license is granted for personal photographs or résumé content.
