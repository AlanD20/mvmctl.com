# mvmctl page

Landing + docs site for `mvmctl`, built with Astro and TypeScript.

## Tech stack

- Astro
- TypeScript
- GSAP (`ScrollTrigger`)
- Font Awesome icons

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

## Notes

- Navbar and docs anchor scrolling are offset-aware for sticky header spacing.
- Page-level interactions are initialized through `src/scripts/animations/router.ts`.
