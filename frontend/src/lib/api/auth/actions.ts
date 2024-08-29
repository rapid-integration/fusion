import { action, redirect } from "@solidjs/router";
import { components } from "~/lib/api/schema";
import { $authenticate, $resetPassword } from "~/lib/api/auth/service";
import { resetSession, updateSession } from "~/lib/http/session";
import { LoginForm } from "./types";

export const authenticate = action(async (form: LoginForm) => {
  "use server";

  const { data, error, response } = await $authenticate(form.email, form.password);

  if (data) {
    await updateSession(data);
  }
  if (error) {
    return { error, code: response.clone().status };
  }

  throw redirect(form.redirect || "/");
});

export const unauthenticate = action(async () => {
  "use server";

  await resetSession();

  throw redirect("/");
});

export const resetPassword = action(async (body: components["schemas"]["UserPasswordReset"]) => {
  "use server";

  const { data } = await $resetPassword(body);

  if (data) {
    await updateSession(data);
    return true;
  }
  return false;
});
