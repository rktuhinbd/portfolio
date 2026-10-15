# Deployment

## Production

- Repository: https://github.com/rktuhinbd/portfolio
- Website: https://rktuhinbd.github.io/portfolio/
- Branch: `main`
- Runtime: static GitHub Pages project site

## Publish

1. Push the verified source to `main`.
2. In repository Settings → Pages, select GitHub Actions as the build source.
3. Run the **Approved production deployment** workflow on `main`.
4. Wait for both build and deploy jobs to succeed.
5. Open the deployment URL and verify CSS/images, both languages, navigation, skill dialogs and résumé download.
6. Recheck the contact flow after endpoint, domain or recipient changes. The current FormSubmit recipient was activated and live inbox delivery was verified on 15 October 2026.

The production workflow is manual to avoid accidental publishing. Preview checks run on pull requests and non-main branches and upload a downloadable build artifact; they do not create an independently hosted preview URL.

## Rollback

Revert the problematic source commit with a normal Git revert, run the checks, and rerun the production workflow on main. Do not force-push or delete the repository to roll back.

## Troubleshooting

- Blank page/missing assets: ensure Vite base is `/portfolio/` and upload `dist` via the Pages workflow.
- Pages deployment denied: verify repository Pages source and workflow permissions.
- Build mismatch: use Node 24 and the pnpm version specified in package.json with the committed lockfile.
- Contact accepted but no email: check recipient activation and spam folder, then inspect the provider's response. Never place mail-service secrets in Vite environment variables.
