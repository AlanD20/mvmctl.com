# AGENTS.md

Guide for coding agents working in this repository.

## 1) Instruction precedence

When instructions conflict, follow this order:

1. System / developer / user instructions in the active session
2. Repository rule files (Cursor/Copilot)
3. This `AGENTS.md`
4. Local conventions in files you edit

## 2) Repository snapshot

- Project: `mvmctl-page`
- Stack: Astro + TypeScript + GSAP + Font Awesome
- Package manager: `pnpm`
- ESM: `"type": "module"`
- Node: `>=22.12.0`
- TS strictness: `astro/tsconfigs/strict`
- Site configured in `astro.config.mjs`

## 3) Cursor / Copilot rules status

Checked paths:

- `.cursor/rules/` → not present
- `.cursorrules` → not present
- `.github/copilot-instructions.md` → not present

If these files appear later, treat them as higher-priority than this file.

## 4) Commands (build/lint/test)

Source of truth: `package.json`.

### Install

```bash
pnpm install
```

### Development

```bash
pnpm dev
pnpm preview
```

### Validation

```bash
pnpm astro check
pnpm build
pnpm audit --prod
```

### Linting reality

- No `lint` script
- No ESLint config at root
- No Prettier config at root

### Testing reality

- No test runner configured
- No `test` script
- No `*.test.*` / `*.spec.*` files under `src/`

### Single-test command

There is currently **no single-test command** because no test framework is configured.

If tests are added later, introduce scripts such as:

```bash
pnpm test
pnpm test:watch
pnpm test:single -- <file-or-pattern>
```

## 5) Route and folder map

### Routes

- `/` landing
- `/feature` feature-focused landing
- `/features` redirects to `/feature`
- `/install` install-focused landing
- `/docs/` docs page

### Key folders

- `src/layouts/` app shell, metadata, global tokens
- `src/pages/` route entry files
- `src/components/ui/` shared primitives
- `src/components/landing/` landing sections
- `src/components/docs/` docs nav/content blocks
- `src/content/site/` typed content/config objects
- `src/scripts/animations/` router + motion logic
- `src/lib/` utility map helpers (`icons.ts`)
- `public/` static files (`robots.txt`, `sitemap.xml`, `_headers`)

## 6) Code style conventions (from codebase)

### Imports

- Group imports cleanly (external first, then internal)
- Use `import type` for type-only imports
- Use relative paths (no alias convention detected)

### Formatting

- 2-space indentation
- Semicolons in TypeScript files
- Break long Astro tags/props across lines

### Typing

- Keep strict TS behavior intact
- Define explicit `Props` interfaces in Astro components
- Use unions for constrained props/options
- Use `as const` for static maps and key-derived types
- Do not use `any`, `@ts-ignore`, `@ts-expect-error`

### Naming

- Components/layout files: PascalCase
- TS/content utility files: camelCase
- Interfaces/types: PascalCase
- Variables/functions: camelCase
- CSS classes and `data-*` hooks: kebab-case

### Astro file structure

Preferred order:

1. Frontmatter imports
2. Interfaces/types
3. `Astro.props` destructuring/defaults
4. Derived constants/helpers
5. Markup
6. `<script>` (if needed)
7. `<style>`

### CSS/theming

- Reuse existing `:root` tokens before adding new values
- Keep semantic token naming (`--color-*`, `--gradient-*`)
- Reuse existing breakpoints where possible
- Keep explicit state classes (`.active`, `.mobile-open`, `.copied`, `.failed`)

### DOM/event patterns

- Use guard clauses for missing elements
- Prevent duplicate listeners via dataset flags (`data-*-bound`)
- Keep lifecycle logic compatible with `astro:page-load`
- Use `requestAnimationFrame` where layout stabilization is required

### Error handling

- Fail safely for optional browser APIs (`matchMedia`, clipboard, fonts API)
- Check secure context before clipboard writes
- Prefer graceful fallbacks for non-critical UI flows

## 7) Security and SEO conventions

- External `_blank` links must include `rel="noopener noreferrer"`
- Canonical + OG + Twitter metadata are centralized in `BaseLayout.astro`
- Keep per-page `title` and `description` unique and meaningful
- Keep `robots.txt` and `sitemap.xml` aligned with live routes/domain
- Keep `_headers` updated for hosts that support static header rules

## 8) Required validation after edits

Run:

```bash
pnpm astro check
pnpm build
```

For dependency/security-sensitive changes:

```bash
pnpm audit --prod
```

Manual smoke checks when relevant:

- nav active states + hash-offset scrolling
- docs left-nav mobile toggle behavior
- install/docs tab switching
- copy-button behavior and clipboard fallback

## 9) Agent safety rules

- Do not commit unless explicitly asked
- Do not remove files/routes without proof they are unused
- Keep changes scoped; avoid broad refactors unless requested
- Do not add dependencies unless clearly necessary
- Preserve existing UX patterns and design token usage

## 10) If tests are added later

Update this file with exact commands for:

- full test run
- watch mode
- **single-test execution** (file and pattern examples)
- CI-mode test command
