import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { parseWaitlistInput, type WaitlistResponse } from "@/lib/waitlist";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 4096;
const UNIQUE_VIOLATION = "23505";

function reply(body: WaitlistResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return reply({ error: "invalid_request" }, 413);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return reply({ error: "invalid_request" }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply({ error: "invalid_request" }, 400);
  }

  const parsed = parseWaitlistInput(body);
  // Honeypot filled in: pretend it worked so bots don't retry, store nothing.
  if (parsed.kind === "spam") return reply({ status: "created" }, 200);
  if (parsed.kind === "invalid") return reply({ error: parsed.error }, 400);

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.error("[waitlist] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set");
    return reply({ error: "not_configured" }, 503);
  }

  const { error } = await supabase.from("waitlist").insert(parsed.entry);
  if (error) {
    if (error.code === UNIQUE_VIOLATION) return reply({ status: "exists" }, 200);
    console.error("[waitlist] insert failed:", error.code, error.message);
    return reply({ error: "server" }, 500);
  }

  return reply({ status: "created" }, 201);
}
