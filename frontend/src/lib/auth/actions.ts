import { action, redirect } from "@solidjs/router";
import { login } from "~/lib/auth";
import { changeSession, resetSession } from "~/lib/auth/session";

export const signin = action(async (form: FormData) => {
  "use server";

  const username = String(form.get("email"));
  const password = String(form.get("password"));

  const { data, error } = await login(username, password);

  if (data) {
    await changeSession({ token: data.access_token, expires_at: data.expires_at });
  }
  if (error) {
    // TODO: Localize based on `response` status code.
    return error;
  }

  throw redirect(String(form.get("redirect") || "/"));
});

export const signout = action(async () => {
  "use server";

  await resetSession();
  throw redirect("/");
});
