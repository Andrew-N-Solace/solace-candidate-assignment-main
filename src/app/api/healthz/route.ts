// src/app/api/healthz/route.ts
import { json } from "@/lib/http";
export const GET = () => json({ ok: true, time: Date.now() });
