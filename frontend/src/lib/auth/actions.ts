import { action, redirect } from "@solidjs/router";
import { login, resetPassword } from "~/lib/auth";
import { changeSession, resetSession } from "~/lib/auth/session";
import { components } from "~/lib/api/schema";

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

  throw redirect(form.redirect || "/");
});

export const resetUserPassword = action(async (body: components["schemas"]["UserPasswordReset"]) => {
  "use server";

  const data = await resetPassword({ password: body.password, email: body.email, code: body.code});

  if (data) {
    await changeSession({ token: data.access_token, expires_at: data.expires_at });
  } else {
    return false;
  }
  return true;
});

export const signout = action(async () => {
  "use server";

  await resetSession();
  throw redirect("/");
});
