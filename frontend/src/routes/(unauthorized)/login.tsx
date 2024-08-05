import { A, useAction, useSearchParams, useSubmission } from "@solidjs/router";
import { createEffect, on, Show } from "solid-js";

import { createForm, email, minLength, required } from "@modular-forms/solid";
import { toast } from "solid-sonner";

import { Button, FormControl, Link, Separator, Slogan, Title } from "~/components";
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
        toast.error(i18n.t.routes.login.form.errors[code]());
      }
    }),
  );

  return (
    <>
      <Title>{i18n.t.routes.login.title()}</Title>

      <div class="m-auto flex w-full max-w-xs flex-col items-center justify-center gap-6 py-6">
        <header class="flex w-full flex-col items-center justify-center space-y-12">
          <A href="/" class="select-none">
            <img src="/logo.svg" alt="Logo" class="pointer-events-none drop-shadow-md" />
          </A>

          <hgroup class="w-full text-left font-semibold">
            <Slogan />
            <p class="text-2xl text-neutral-500">{i18n.t.routes.login.heading()}</p>
          </hgroup>
        </header>

        <Separator orientation="horizontal" />

        <main class="space-y-2">
          <Login.Form onSubmit={action} method="post">
            <fieldset disabled={submission.pending} class="space-y-4">
              <Login.Field
                name="email"
                validate={[
                  required(i18n.t.routes.login.form.fields.email.required()),
                  email(i18n.t.routes.login.form.fields.email.error()),
                ]}
              >
                {(field, props) => (
                  <FormControl
                    {...props}
                    type="email"
                    label={i18n.t.routes.login.form.fields.email.label()}
                    placeholder={i18n.t.routes.login.form.fields.email.placeholder()}
                    description={i18n.t.routes.login.form.fields.email.description()}
                    value={field.value}
                    error={field.error}
                    required
                  />
                )}
              </Login.Field>

              <Login.Field
                name="password"
                validate={[
                  required(i18n.t.routes.login.form.fields.password.required()),
                  minLength(8, i18n.t.routes.login.form.fields.password.minLength({ length: 8 })),
                ]}
              >
                {(field, props) => (
                  <FormControl
                    {...props}
                    type="password"
                    label={i18n.t.routes.login.form.fields.password.label()}
                    placeholder={i18n.t.routes.login.form.fields.password.placeholder()}
                    description={() => (
                      <>
                        <span>{i18n.t.routes.login.form.fields.password.description()}</span>
                        <Link as={A} href="/reset-password">
                          {i18n.t.routes.login.form.fields.password.forgot()}
                        </Link>
                      </>
                    )}
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
                {i18n.t.routes.login.form.submit()}
              </Button>
            </fieldset>
          </Login.Form>
        </main>

        <footer class="mt-8 text-center text-xs text-neutral-500">
          <p>{i18n.t.routes.login.footer()}</p>
        </footer>
      </div>
    </>
  );
}
