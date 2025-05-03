// src/middleware/auth.ts
import { UnauthorizedError } from "@/lib/errors";

export const authMiddleware = async (req: Request, next: Function) => {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token || token !== process.env.API_TOKEN) {
    // Could also perform JWT verify, DB lookup, etc.
    throw new UnauthorizedError("Valid Bearer token required");
  }

  return next(req);
};
