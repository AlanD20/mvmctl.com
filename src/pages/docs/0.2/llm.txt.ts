import type { APIRoute } from "astro";
import quickstart from "../../../content/reference/0.2/quickstart.md?raw";
import commands from "../../../content/reference/0.2/commands.md?raw";
import environment from "../../../content/reference/0.2/environment.md?raw";

const reference = [quickstart, commands, environment]
  .map((part) => part.trimEnd().replaceAll("](/docs/0.2/", "](https://mvmctl.aland20.com/docs/0.2/"))
  .join("\n\n---\n\n");

export const GET: APIRoute = () => new Response(`${reference}\n`, {
  headers: { "Content-Type": "text/plain; charset=utf-8" },
});
