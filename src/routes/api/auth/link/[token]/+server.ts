import { setSessionToCookies } from "$lib/cookies";
import { getDB } from "$lib/server/db/client";
import { loginTokens } from "$lib/server/db/schema";
import { type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ params, cookies, platform }) => {
  const token = params.token;
  if (!token) {
    return new Response("Token is required", { status: 400 });
  }

  const db = getDB(platform);
  const results = await db
    .delete(loginTokens)
    .where(eq(loginTokens.token, token))
    .returning();

  if (results.length === 0) {
    return new Response("Token not found or already used", { status: 404 });
  }
  const deleted = results[0];
  if (deleted.expiredAt < Date.now()) {
    return new Response("Token has expired", { status: 410 });
  }

  setSessionToCookies(cookies, deleted.userUlid);

  return new Response("ok", { status: 200 });
};
