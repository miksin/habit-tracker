import { TURNSTILE_SECRET } from "$env/static/private";

const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function validateTurnstileToken(request: Request): Promise<void> {
  const { turnstileToken } = await request.json();
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      secret: TURNSTILE_SECRET,
      response: turnstileToken,
    }),
  });
  const data = await result.json();
  if (!data.success) {
    throw new Error(
      "Turnstile validation failed: " + data["error-codes"].join(", "),
    );
  }
  console.log("Turnstile validation succeeded:", data);
  return;
}
