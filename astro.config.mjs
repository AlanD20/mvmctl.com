// @ts-check
import { defineConfig } from "astro/config";
import formatDocsArchive from "./scripts/format-docs-archive.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://mvmctl.aland20.com",
  markdown: {
    shikiConfig: { theme: "vitesse-dark" },
    rehypePlugins: [formatDocsArchive],
  },
});
