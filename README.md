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
- `/docs/` → default documentation and quickstart
- `/docs/0.2/` → v0.2.0 quickstart, command reference, and environment specification
- `/docs/0.3/` → versioned 0.3 quickstart, command reference, and guides
- `/docs/0.3/env-spec/` → environment specification for 0.3
- `/llm.txt` and `/llms.txt` → index of the versioned plain-text references
- `/docs/<version>/llm.txt` → complete command and environment reference for that version
- `/install.sh` → checksum-verified 0.3.x binary installer
- `/uninstall.sh` → confirmed administrator uninstall launcher
- `/scripts/0.3.0/` → pinned uninstall Python sources and provenance

## Documentation versions

Use a major/minor path such as `/docs/0.3/` for each documented release series. Register each series in
`docsVersions` in [`src/content/site/docs.ts`](src/content/site/docs.ts) to add it to the docs version selector.
Keep earlier version URLs available when the default changes. Mark prerelease series in `docsVersions` and
pin installation examples to the version they describe. After publication, update the series status and point
the default docs to the latest stable version. The environment file's `version` identifies its schema.

Regenerate the archived 0.2 manuals and the 0.3 plain-text reference with
`python3 scripts/build-llm-reference.py /path/to/mvmctl`. Add `--check` to verify the checked-in files
against their pinned mvmctl revisions.

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
- Landing page animations use `src/scripts/animations/router.ts`. Documentation uses `src/scripts/docs-navigation.ts`.

## Contributing

See [CONTRIBUTING.md](https://github.com/AlanD20/mvmctl/blob/main/.github/CONTRIBUTING.md) in the main mvmctl repository.

## License

MIT — see [LICENSE](LICENSE).

## Distribution scripts

The public scripts are copied unchanged into the static build. The installer downloads the selected GitHub
release and verifies its checksum before calling `host install-system`. It does not initialize host state.
The uninstall launcher verifies pinned hashes of the Python files under `public/scripts/0.3.0/` before running
with administrator access. Piped interactive uninstall reads confirmation from `/dev/tty`; unattended
removal requires explicit `--yes`. Keep those files, the launcher hashes and `source.json` in sync with the reviewed
mvmctl source revision. Do not replace versioned payloads without updating their launcher pins.

Run `python3 scripts/test-distribution.py` in the disposable QA runner for launcher behavior. The tests use
local fixture downloads and a temporary installation marker; they never invoke a real administrator install.
A missing upstream 0.3.0 release must remain a download error, not an automatic downgrade.
