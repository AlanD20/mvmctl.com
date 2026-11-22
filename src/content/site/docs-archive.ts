import type { MarkdownHeading } from "astro";
import type { DocsNavItem, TocItem } from "./docs";

export const archivePath = "/docs/0.2";

export const archiveNav: readonly DocsNavItem[] = [
  { href: `${archivePath}/`, label: "Install and first VM", icon: "book" },
  { href: `${archivePath}/reference/`, label: "Command reference", icon: "terminal" },
  { href: `${archivePath}/env-spec/`, label: "Environment spec", icon: "terminal" },
];

export const makeArchiveToc = (headings: MarkdownHeading[]): TocItem[] =>
  headings.flatMap(({ slug, text, depth }) =>
    (depth === 2 || depth === 3) && slug !== "table-of-contents"
      ? [{ id: slug, label: text, level: depth }]
      : [],
  );

export const makeArchiveNav = (toc: readonly TocItem[]): DocsNavItem[] =>
  toc.filter(({ level }) => level === 2).map(({ id, label }) => ({ id, label, icon: "book" }));
