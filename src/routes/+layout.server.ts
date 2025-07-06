import { COOKIE_NAME } from "$lib/cookies";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies }) => {
  const session = cookies.get(COOKIE_NAME.SESSION);
  if (!session) {
    return { session: null };
  }

  // sliding expiration
  cookies.set(COOKIE_NAME.SESSION, session, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return { session };
};
