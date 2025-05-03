// src/lib/http.ts
// ───────────────────────────────────────────────────────────────────────────
// JSON helper with automatic CORS headers + OPTIONS stub.
import { NextResponse } from "next/server";
import { ApiError } from "@/lib/errors";

/* ------------------------------------------------------------------ *
 *  CORS CONFIG
 * ------------------------------------------------------------------ */
const ALLOW_ORIGIN = process.env.CORS_ORIGIN ?? "*";
const ALLOW_HEADERS =
  "Origin, X-Requested-With, Content-Type, Accept, Authorization";
const ALLOW_METHODS = "GET,POST,PUT,PATCH,DELETE,OPTIONS";

function applyCors(res: NextResponse) {
  res.headers.set("access-control-allow-origin", ALLOW_ORIGIN);
  res.headers.set("access-control-allow-headers", ALLOW_HEADERS);
  res.headers.set("access-control-allow-methods", ALLOW_METHODS);
  return res;
}

/**
 * Shorthand to send CORS-ready JSON.
 */
export const json = (data: unknown, init: ResponseInit = {}) =>
  applyCors(NextResponse.json(data, init));

/**
 * Universal try/catch wrapper, preserving CORS headers
 */
export const handle = <
  T extends (req: Request) => Promise<NextResponse> | NextResponse
>(
  fn: T
) =>
  (async (req: Request) => {
    try {
      return await fn(req);
    } catch (err: any) {
      console.error(err);

      const status =
        err instanceof ApiError && typeof err.status === "number"
          ? err.status
          : 500;

      return json(
        { error: err?.message ?? "Internal Server Error" },
        { status }
      );
    }
  }) as T;

/**
 * Ready-made OPTIONS handler.
 * Use:  export const OPTIONS = optionsHandler;
 */
export const optionsHandler = () =>
  applyCors(new NextResponse(null, { status: 204 }));
