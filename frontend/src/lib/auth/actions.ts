import { action, redirect } from "@solidjs/router";
import { login } from "~/lib/auth";
import { changeSession, resetSession } from "~/lib/auth/session";

export type LoginForm = {
  email: string;
  password: string;
  redirect: string | undefined;
};

export const signin = action(async (form: LoginForm) => {
  "use server";

  const { data, error, response } = await login(form.email, form.password);

  if (data) {
    await changeSession({ token: data.access_token, expires_at: data.expires_at });
  }
  if (error) {
    return { error, code: response.status };
  }

  throw redirect(String(form.redirect || "/"));
});

export const signout = action(async () => {
  "use server";

  await resetSession();
  throw redirect("/");
});
