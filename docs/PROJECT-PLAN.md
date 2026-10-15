# Portfolio implementation plan

Status: completed and published on 15 October 2026 at https://rktuhinbd.github.io/portfolio/ . FormSubmit activation and live Gmail inbox delivery are verified.

1. Capture reference at desktop and mobile; record observable states and limitations (completed before implementation).
2. Isolate work in local clone on feature/portfolio-v2. Never push main or deploy production during this task.
3. Use React 19, Vite 7, TypeScript, Framer Motion, locally bundled Space Grotesk and accessible native controls. Preserve /portfolio/ base path.
4. Centralize résumé-derived data, update dates/email, embed supplied portrait and PDF, retain only verified project links. Independently build the reference composition, glass cards, floating skill disclosures, dotted field, timeline, swipe projects and contact surfaces.
5. Implement FormSubmit JSON submission with honest pending/success/failure states, validation, honeypot, timeout and duplicate-submit protection. Recipient activation and live inbox delivery were verified after publication. An optional Formspree endpoint can override the default service.
6. Add UI/contact tests and responsive browser checks, focus and reduced-motion checks, metadata/favicon, production build and asset validation.
7. Add branch/PR build-and-test workflow and downloadable preview artifact. GitHub Pages has one production site; do not overwrite it to create a branch preview. Optional separate hosting deployment can be configured after preview approval.
8. Present local preview at http://localhost:4173/portfolio/ with QA and remaining setup. Production URL remains https://rktuhinbd.github.io/portfolio/ after approved merge/deployment. No domain purchase required.

## Source of truth

The supplied MD_REJAUL_KARIM_Senior_Mobile_Engineer_Resume.pdf overrides old src/data.js, including VALT Feb–Aug 2026, Repocket Nov 2025–Jan 2026, the two 10 Minute School roles, CodeNext through Sep 2020 and certification dates. Portrait is supplied 2-2.jpg. Resume has four embedded Play Store links; 10 Minute School, TARA and AIB listings were confirmed via web retrieval. Repocket retrieval failed; retain résumé link and flag verification limitation. SIBL/Ichiiba links are legacy repository links and need fresh verification before publishing.
