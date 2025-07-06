import type { Cookies } from "@sveltejs/kit";

export const COOKIE_NAME = {
  SESSION: "session",
} as const;

export const setSessionToCookies = (cookies: Cookies, value: string) => {
  cookies.set(COOKIE_NAME.SESSION, value, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
};
