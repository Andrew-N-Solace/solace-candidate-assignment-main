import db from "@/db";
import { advocates } from "@/db/schema";
import { json } from "@/lib/http";
import { route } from "@/lib/route";
import { MethodNotAllowedError } from "@/lib/errors";
// import { authMiddleware } from "@/middleware/auth"; -> TODO could implement something quickly but runnig out of time
import { ilike, or, sql } from "drizzle-orm";
import { BadRequestError } from "@/lib/errors";
import Joi from "joi";
import { optionsHandler } from "@/lib/http";

export const querySchema = Joi.object({
  q: Joi.string().trim().max(100).allow("").default(""),
  page: Joi.number().integer().min(1).default(1),
  pageSize: Joi.number().integer().min(1).max(100).default(20),
}).unknown(true); // ignore extra params

// ── GET /api/advocates ────────────────────────────────────────────────────
// TODO: [authMiddleware] -> Dont have enough time to setup passport
export const GET = route([], async (req) => {
  const { value: params, error } = querySchema.validate(
    Object.fromEntries(new URL(req.url).searchParams)
  );
  if (error) throw new BadRequestError(error.message);

  const { q, page, pageSize } = params;
  const offset = (page - 1) * pageSize;
  const term = `%${q}%`;

  const where =
    q === ""
      ? undefined
      : or(
          ilike(advocates.firstName, term),
          ilike(advocates.lastName, term),
          ilike(advocates.city, term),
          ilike(advocates.degree, term),
          sql`${advocates.yearsOfExperience}::text ILIKE ${term}`
        );

  const baseRowsQ = db.select().from(advocates);
  const baseCountQ = db
    .select({ count: sql<number>`count(*)` })
    .from(advocates);

  const rowsQ = where ? baseRowsQ.where(where) : baseRowsQ;
  const countQ = where ? baseCountQ.where(where) : baseCountQ;

  // Execute in parallel
  const [rows, [{ count }]] = await Promise.all([
    rowsQ.limit(pageSize).offset(offset),
    countQ,
  ]);

  // 6. Return payload
  return json({ data: rows, page, pageSize, total: count });
});

// ── Unsupported HTTP verbs return 405 ──────────────────────────────────────
const throw405 = () => {
  throw new MethodNotAllowedError();
};

export const POST = throw405;
export const PUT = throw405;
export const DELETE = throw405;
// keep OPTIONS, CORS pre-flight
export const OPTIONS = optionsHandler;
