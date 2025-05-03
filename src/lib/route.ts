// src/lib/route.ts
import { NextResponse } from "next/server";
import { ApiError } from "./errors";

export type NextHandler = (req: Request) => Promise<NextResponse> | NextResponse;
export type Middleware = (req: Request, next: NextHandler) => ReturnType<NextHandler>;

/**
 * Compose middlewares (auth, rate-limit, …) with a final route handler.
 *
 * Example:
 *   export const GET = route([authMiddleware], async (req) => {
 *     return json({ ok: true });
 *   });
 */
export function route(middlewares: Middleware[], handler: NextHandler): NextHandler {
  // Reduce middlewares right-to-left so they wrap the handler.
  const composed = middlewares.reduceRight<NextHandler>(
    (next, mw) => (req) => mw(req, next),
    handler,
  );

  // Central error catcher so routes can `throw new ApiError(...)`
  return async (req: Request) => {
    try {
      return await composed(req);
    } catch (err: any) {
      console.error(err);
      if (err instanceof ApiError) {
        return NextResponse.json({ error: err.message }, { status: err.status });
      }
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  };
}