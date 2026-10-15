# Production verification

Verified on 15 October 2026.

## Release

- Repository: https://github.com/rktuhinbd/portfolio
- Production: https://rktuhinbd.github.io/portfolio/
- Initial production commit: `d0dd0e53b1daa65209b9ddd1f005ac3c81b31caf`
- GitHub Actions run: https://github.com/rktuhinbd/portfolio/actions/runs/38627680868
- Build and deploy jobs completed successfully.
- Production page, JavaScript, CSS, résumé PDF, sitemap, portrait and social image returned HTTP 200.
- Live browser checks covered the technology dialog, English/Bengali switch, résumé link, Medium link, 10 Minute School tenure and promotion, and enabled contact submission.

## Contact delivery

FormSubmit recipient activation and inbox delivery are verified.

1. A live submission from `https://rktuhinbd.github.io/portfolio/` produced the expected activation-pending state.
2. FormSubmit sent its activation email to `rejaul.karim.pro@gmail.com` with SPF, DKIM and DMARC passing in Gmail.
3. The activation confirmation returned `Form Activated`.
4. A second live submission produced the website success state: `Thanks! Your message was submitted. I’ll reply by email.`
5. Gmail received the message from `FormSubmit <submissions@formsubmit.co>` with subject `New portfolio enquiry — Rejaul Karim` and the exact submitted name, reply email and message.

The verification message identified itself as a live portfolio contact-form test. No credential or private token is stored in the repository.

## Automated checks

- TypeScript and ESLint: passed.
- Vitest: 26 tests across three files passed.
- Vite production build: passed.
- Git diff whitespace validation: passed before the release.
