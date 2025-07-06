import { COOKIE_NAME, setSessionToCookies } from "$lib/cookies";
import { getDB } from "$lib/server/db/client";
import { users } from "$lib/server/db/schema";
import { validateTurnstileToken } from "$lib/turnstile";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ulid } from "ulid";

export const POST: RequestHandler = async ({ request, cookies, platform }) => {
  try {
    await validateTurnstileToken(request);
  } catch (e) {
    console.error("Turnstile validation failed:", e);
    return json({ error: "Turnstile validation failed" }, { status: 400 });
  }

  const exists = cookies.get(COOKIE_NAME.SESSION);
  if (exists) {
    return json({ error: "Session already exists" }, { status: 400 });
  }

  const db = getDB(platform);

  const userUlid = ulid();
  await db.insert(users).values({ ulid: userUlid });

  setSessionToCookies(cookies, userUlid);

  return json({ userUlid }, { status: 200 });
};
