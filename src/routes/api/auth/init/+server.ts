import { COOKIE_NAME, setSessionToCookies } from "$lib/cookies";
import { getDB } from "$lib/server/db/client";
import { users } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ulid } from "ulid";

export const POST: RequestHandler = async ({ cookies, platform }) => {
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
