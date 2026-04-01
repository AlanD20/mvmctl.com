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
- `/docs/` → documentation page

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

See [CONTRIBUTING.md](https://github.com/AanD20/mvmctl/blob/main/.github/CONTRIBUTING.md) in the main mvmctl repository.

## License

MIT — see [LICENSE](LICENSE).
