import { action, redirect } from "@solidjs/router";
import { components } from "~/lib/api/schema";
import { $authenticate, $resetPassword, $unauthenticate } from "~/lib/auth";
import { updateAuth } from "~/lib/auth/session";

export type LoginForm = {
  email: string;
  password: string;
  redirect: string | undefined;
};

export const authenticate = action(async (form: LoginForm) => {
  "use server";

  const { data, error, response } = await $authenticate(form.email, form.password);

  if (data) {
    await updateAuth(data);
  }
  if (error) {
    return { error, code: response.status };
  }

  throw redirect(form.redirect || "/");
});

export const unauthenticate = action(async () => {
  "use server";

  await $unauthenticate();

  throw redirect("/");
});

export const resetPassword = action(async (body: components["schemas"]["UserPasswordReset"]) => {
  "use server";

  const data = await $resetPassword(body);

  if (data) {
    await updateAuth(data);
    return true;
  }
  return false;
});
