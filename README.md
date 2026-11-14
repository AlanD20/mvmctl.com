# mvmctl.com

This is the main website for the [mvmctl](https://github.com/AlanD20/mvmctl) project.

**Live site**: https://mvmctl.aland20.com

Landing + docs site for `mvmctl`, built with Astro and TypeScript.

## Tech stack

- Astro
- TypeScript
- GSAP (`ScrollTrigger`)
- Font Awesome icons

## Prerequisites

- Node.js >= 24.0.0
- pnpm

## Commands

```bash
pnpm install
pnpm dev
pnpm astro check
pnpm build
pnpm preview
```

## Route map

- `/` → main landing
- `/feature` → landing, auto-scroll to features
- `/features` → redirects to `/feature`
- `/install` → landing, auto-scroll to install section
- `/docs/` → documentation (quickstart)
- `/docs/env-spec/` → environment specification reference
- `/install.sh` → checksum-verified 0.3.x binary installer
- `/uninstall.sh` → confirmed administrator uninstall launcher
- `/scripts/0.3.0/` → pinned uninstall Python sources and provenance

## Project structure

```
src/
├── components/     # UI components (ui/, landing/, docs/)
├── content/site/   # Typed content and config objects
├── layouts/        # Page layouts (BaseLayout)
├── lib/            # Utility helpers (icons.ts)
├── pages/          # Route entry files
└── scripts/        # Animation and interaction logic
```

## Notes

- The navbar and docs anchor scrolling are offset-aware to account for the sticky header height.
- Page-level animations and interactions are initialized through `src/scripts/animations/router.ts`.

## Contributing

See [CONTRIBUTING.md](https://github.com/AlanD20/mvmctl/blob/main/.github/CONTRIBUTING.md) in the main mvmctl repository.

## License

MIT — see [LICENSE](LICENSE).

## Distribution scripts

The public scripts are copied unchanged into the static build. The installer downloads the selected GitHub
release and verifies its checksum before calling `host install-system`. It does not initialize host state.
The uninstall launcher verifies pinned hashes of the Python files under `public/scripts/0.3.0/` before running
with administrator access. Keep those files, the launcher hashes and `source.json` in sync with the reviewed
mvmctl source revision. Do not replace versioned payloads without updating their launcher pins.

Run `python3 scripts/test-distribution.py` in the disposable QA runner for launcher behavior. The tests use
local fixture downloads and a temporary installation marker; they never invoke a real administrator install.
A missing upstream 0.3.0 release must remain a download error, not an automatic downgrade.
