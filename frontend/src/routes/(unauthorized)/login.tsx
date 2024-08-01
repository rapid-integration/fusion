import { A, useAction, useSearchParams, useSubmission } from "@solidjs/router";
import { createEffect, on, Show } from "solid-js";

import { createForm, email, minLength, required } from "@modular-forms/solid";
import { toast } from "solid-sonner";

import { Button, FormControl, Separator, Slogan, Title } from "~/components";
import { LoginForm, signin } from "~/lib/auth";
import { useI18n } from "~/lib/i18n";

export default function Login() {
  const [searchParams] = useSearchParams();

  const i18n = useI18n();

  const action = useAction(signin);
  const submission = useSubmission(signin);

  const [form, Login] = createForm<LoginForm>();

  const response = () => submission.result;

  createEffect(
    on(response, () => {
      const code = response()?.code;

      if (code === 401 || code === 404) {
        toast.error(i18n.t.pages.login.errors[code]());
      }
    }),
  );

  return (
    <>
      <Title>{i18n.t.pages.login.title()}</Title>

      <div class="mx-auto flex min-h-dvh max-w-xs flex-col items-center justify-center gap-6 py-6">
        <header class="flex w-full flex-col items-center justify-center space-y-12">
          <A href="/" class="select-none">
            <img src="/logo.svg" alt="Logo" class="pointer-events-none drop-shadow-md" />
          </A>

          <hgroup class="w-full text-left font-semibold">
            <Slogan />
            <p class="text-2xl text-neutral-500">{i18n.t.pages.login.header()}</p>
          </hgroup>
        </header>

        <Separator orientation="horizontal" />

        <main>
          <Login.Form onSubmit={action} method="post">
            <fieldset disabled={submission.pending} class="space-y-3">
              <Login.Field
                name="email"
                validate={[
                  required(i18n.t.pages.login.form.email.required()),
                  email(i18n.t.pages.login.form.email.error()),
                ]}
              >
                {(field, props) => (
                  <FormControl
                    {...props}
                    type="email"
                    label={i18n.t.pages.login.form.email.label()}
                    placeholder={i18n.t.pages.login.form.email.placeholder()}
                    description={i18n.t.pages.login.form.email.description()}
                    value={field.value}
                    error={field.error}
                    required
                  />
                )}
              </Login.Field>

              <Login.Field
                name="password"
                validate={[
                  required(i18n.t.pages.login.form.password.required()),
                  minLength(8, i18n.t.pages.login.form.password.minLength()),
                ]}
              >
                {(field, props) => (
                  <FormControl
                    {...props}
                    type="password"
                    label={i18n.t.pages.login.form.password.label()}
                    placeholder={i18n.t.pages.login.form.password.placeholder()}
                    description={i18n.t.pages.login.form.password.description()}
                    value={field.value}
                    error={field.error}
                    required
                  />
                )}
              </Login.Field>

              <Show when={searchParams.redirect}>
                <Login.Field name="redirect">
                  {(_field, props) => <input type="hidden" value={searchParams.redirect} {...props} />}
                </Login.Field>
              </Show>

              <Button
                color="primary"
                type="submit"
                class="w-full"
                aria-busy={submission.pending}
                disabled={form.invalid}
              >
                {i18n.t.continue()}
              </Button>
            </fieldset>
          </Login.Form>
        </main>

        <footer class="mt-8 text-center text-xs text-neutral-500">
          <p>{i18n.t.pages.login.footer()}</p>
        </footer>
      </div>
    </>
  );
}
