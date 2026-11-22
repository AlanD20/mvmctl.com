import type { APIRoute } from "astro";
import index from "../../public/llms.txt?raw";

export const GET: APIRoute = () => new Response(index, {
  headers: { "Content-Type": "text/plain; charset=utf-8" },
});
