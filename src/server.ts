import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { renderNotFoundMarkdown } from "./lib/not-found-markdown";
import { renderMarkdownForPath } from "./lib/page-markdown";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function wantsMarkdown(request: Request): boolean {
  return (request.headers.get("accept") ?? "").includes("text/markdown");
}

// TanStack Start's own content negotiation 406s any request whose Accept header
// doesn't include text/html, before our code ever sees it — so for a client asking
// for text/markdown we swap the Accept header to text/html for the inner handler,
// let it resolve the route normally (200 or a real 404), and only then decide what
// to actually send back.
function withHtmlAccept(request: Request): Request {
  // Rebuilt from plain fields instead of `new Request(request, init)` — some runtimes
  // (Node's undici vs. the framework's own Request-like object in dev) reject cloning
  // a foreign Request instance that way with a cross-realm private-field error.
  const headers = new Headers(request.headers);
  headers.set("accept", "text/html");
  return new Request(request.url, { method: request.method, headers });
}

// Agents/crawlers probing for resources (e.g. `curl -H 'Accept: text/markdown'`) get a
// plain-text 404 body instead of the HTML error page — same real 404 status either way.
function maybeServeMarkdownNotFound(request: Request, response: Response): Response {
  if (response.status !== 404 || !wantsMarkdown(request)) return response;

  const pathname = new URL(request.url).pathname;
  return new Response(renderNotFoundMarkdown(pathname), {
    status: 404,
    headers: { "content-type": "text/markdown; charset=utf-8" },
  });
}

// Content genuinely differs by Accept now, so every response (HTML or Markdown) needs
// Vary: Accept — otherwise a cache could serve one client's Markdown response to the
// next client that only accepts HTML, or vice versa.
function withVaryAccept(response: Response): Response {
  const headers = new Headers(response.headers);
  const existing = headers.get("vary");
  if (!existing) {
    headers.set("vary", "Accept");
  } else if (
    !existing
      .toLowerCase()
      .split(",")
      .map((v) => v.trim())
      .includes("accept")
  ) {
    headers.set("vary", `${existing}, Accept`);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      if (wantsMarkdown(request)) {
        const pathname = new URL(request.url).pathname;
        const direct = renderMarkdownForPath(pathname);
        if (direct) {
          return withVaryAccept(
            new Response(direct.body, {
              status: direct.status,
              headers: { "content-type": "text/markdown; charset=utf-8" },
            }),
          );
        }
      }

      const handler = await getServerEntry();
      const upstreamRequest = wantsMarkdown(request) ? withHtmlAccept(request) : request;
      const response = await handler.fetch(upstreamRequest, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return withVaryAccept(maybeServeMarkdownNotFound(request, normalized));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
