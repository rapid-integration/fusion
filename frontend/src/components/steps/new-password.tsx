import { createForm, minLength, required } from "@modular-forms/solid";
import { useAction } from "@solidjs/router";
import { toast } from "solid-sonner";
import { Button, FormControl, Heading, Stepper, Sticker } from "~/components";
import { Verifier } from "~/components/steps/verification";
import { resetUserPassword } from "~/lib/auth";
import { useI18n } from "~/lib/i18n";

export type NewPasswordForm = {
  password: string;
  confirm: string;
};

export function NewPasswordStep() {
  const i18n = useI18n();

  const stepper = Stepper.useContext();
  const context = Verifier.useContext();

  const [form, NewPassword] = createForm<NewPasswordForm>();
  const reset = useAction(resetUserPassword);

  const onSubmit = async (form: NewPasswordForm) => {
    if (form.password !== form.confirm) {
      toast.error(i18n.t.steps.resetPassword.password.form.errors.mismatch());
      return;
    }

    const changed = await reset({ email: context.store.email, code: context.store.otp, password: form.password });

    if (changed) {
      toast.success(i18n.t.steps.resetPassword.password.form.success());
    } else {
      toast.error(i18n.t.steps.resetPassword.password.form.errors.unknown());
    }
  };

  return (
    <div class="flex w-full flex-col items-center justify-center gap-6 text-center">
      <Sticker path="tgs/key.json" class="size-24" />

      <hgroup class="space-y-4">
        <Heading>{i18n.t.steps.resetPassword.password.heading()}</Heading>
        <p class="text-sm text-neutral-500">
          {i18n.t.steps.resetPassword.password.paragraph()}
          <Button variant="hyperlink" onClick={() => stepper.setCurrentIndex((_) => 0)}>
            {context.store.email}
          </Button>
        </p>
      </hgroup>

      <NewPassword.Form onSubmit={onSubmit} class="w-full text-left">
        <fieldset disabled={form.submitting} class="space-y-4">
          <NewPassword.Field
            name="password"
            validate={[
              required(i18n.t.steps.resetPassword.password.form.fields.password.required()),
              minLength(8, i18n.t.steps.resetPassword.password.form.fields.password.minLength({ length: 8 })),
            ]}
          >
            {(field, props) => (
              <FormControl
                {...props}
                type="password"
                label={i18n.t.steps.resetPassword.password.form.fields.password.label()}
                placeholder={i18n.t.steps.resetPassword.password.form.fields.password.placeholder()}
                description={i18n.t.steps.resetPassword.password.form.fields.password.description()}
                value={field.value}
                error={field.error}
                required
              />
            )}
          </NewPassword.Field>

          <NewPassword.Field
            name="confirm"
            validate={[
              required(i18n.t.steps.resetPassword.password.form.fields.confirm.required()),
              minLength(8, i18n.t.steps.resetPassword.password.form.fields.confirm.minLength({ length: 8 })),
            ]}
          >
            {(field, props) => (
              <FormControl
                {...props}
                type="password"
                label={i18n.t.steps.resetPassword.password.form.fields.confirm.label()}
                placeholder={i18n.t.steps.resetPassword.password.form.fields.confirm.placeholder()}
                description={i18n.t.steps.resetPassword.password.form.fields.confirm.description()}
                value={field.value}
                error={field.error}
                required
              />
            )}
          </NewPassword.Field>

          <Button type="submit" color="primary" class="w-full" aria-busy={form.submitting} disabled={form.invalid}>
            {i18n.t.steps.resetPassword.password.form.submit()}
          </Button>
        </fieldset>
      </NewPassword.Form>
    </div>
  );
}
