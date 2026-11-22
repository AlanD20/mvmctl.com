import type { APIRoute } from "astro";
import reference from "../../../content/reference/0.3/llm.txt?raw";

export const GET: APIRoute = () => new Response(reference, {
  headers: { "Content-Type": "text/plain; charset=utf-8" },
});
