# Portfolio QA — 15 October 2026

## Result

Preview implementation checks passed. Production deployment, recipient activation and live inbox delivery were verified on 15 October 2026. This is not a claim of 100% reference equivalence.

## Evidence and checks

- Reference/implementation hero comparison captured at 1440×900 and reviewed side by side. The black/cobalt palette, Space Grotesk display hierarchy, navigation pill, diagonal card collage and rounded controls are preserved. Personal name length changes text width; the independent cards intentionally replace proprietary imagery.
- Bengali uses locally hosted Noto Sans Bengali, adjusted line height, professional wording and consistent transliteration for technical terms. All translated dictionary values are tested for accidental Latin text. A browser audit of the complete rendered page found only the English language option and functional email address remaining in Latin script.
- Terminology research: Microsoft Bengali usage supports familiar loanwords such as সফটওয়্যার, অ্যাপ্লিকেশন and ডেভেলপার: https://www.microsoft.com/bn-bd/servicesagreement and https://developer.microsoft.com/bn-in/microsoft-edge/ . These sources inform terminology; they are not a certification of translation quality.
- Desktop 1440, tablet 768, mobile 390 and narrow mobile 320 checked. Document width equals viewport width at 768/390/320. Bengali hero remains readable without clipping. Intentional horizontal project carousel is contained.
- Card opening observed in an intermediate transformed state in browser; animated rotation/scale/translation resolves to upright disclosure. Escape completes the closing animation and restores focus to its trigger. All six disclosures and keyboard behavior covered by tests.
- System reduced-motion preference disables optional animation. Dialog labels, focus restoration, skip link, form labels, navigation anchors and résumé download are covered.
- Full 10 Minute School tenure is August 2021–June 2025. Both roles and May 2023 promotion are visible without disclosure.
- Medium now uses the three-oval mark, the same inherited color, size, container and hover treatment as neighboring social controls. Destination is https://medium.com/@rktuhinbd .
- Magnetic email/social controls independently match sampled reference movement factors (0.30/0.35) and easing; exact timing across all devices is unverified.
- Contact submit button is enabled. Tests cover validation, endpoint restriction, honeypot, success, pending activation, failure and preserving text. FormSubmit activation, the website success state and Gmail inbox delivery were verified from the published site.
- Final automated validation: lint/typecheck passed; 26 tests across 3 files passed; production build passed; git diff whitespace check passed.

## Remaining limitations

- Original project metric panels and skill cards replace reference artwork. No proprietary code or images were copied. Exact particle physics and every timing state are not verified.
- Repocket Play link is from the supplied résumé; live retrieval could not be verified. Other selected public app links were verified during source research.
- The production GitHub Actions build and Pages deployment completed successfully. The separate preview workflow supplies a downloadable build artifact, not an independently hosted preview URL.
- Contact delivery is provider-dependent. Recheck activation and inbox delivery after changing the public domain, endpoint or recipient.
