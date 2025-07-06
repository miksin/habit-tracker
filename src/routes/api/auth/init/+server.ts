import { getDB } from "$lib/server/db/client";
import { loginTokens, users } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { randomUUID } from "crypto";
import { ulid } from "ulid";

export const POST: RequestHandler = async ({ cookies, platform }) => {
  const exists = cookies.get("session");
  if (exists) {
    return json({ error: "Session already exists" }, { status: 400 });
  }

  const db = getDB(platform);

  const userUlid = ulid();
  await db.insert(users).values({ ulid: userUlid });

  const token = randomUUID();
  const expiredAt = Date.now() + 1000 * 60 * 60 * 24 * 365;
  await db.insert(loginTokens).values({
    userUlid,
    token,
    expiredAt,
  });

  cookies.set("session", token, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return json({ token });
};
