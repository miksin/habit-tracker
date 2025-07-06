import { COOKIE_NAME } from "$lib/cookies";
import { getDB } from "$lib/server/db/client";
import { loginTokens } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { randomUUID } from "crypto";

export const POST: RequestHandler = async ({ cookies, platform }) => {
  const session = cookies.get(COOKIE_NAME.SESSION);
  if (!session) {
    return json({ error: "Session does not exist" }, { status: 400 });
  }

  const db = getDB(platform);
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.ulid, session),
  });

  if (!user) {
    return json({ error: "User not found" }, { status: 404 });
  }

  const token = randomUUID();
  await db.insert(loginTokens).values({
    userUlid: user.ulid,
    token,
    expiredAt: Date.now() + 60 * 60 * 24 * 1000, // 1 day in milliseconds
  });

  return json({ token }, { status: 200 });
};
