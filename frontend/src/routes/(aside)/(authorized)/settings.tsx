import { useSubmission } from "@solidjs/router";
import { Show } from "solid-js";

import { Icon } from "solid-heroicons";
import { pencilSquare, trash, userCircle } from "solid-heroicons/solid-mini";

import { Button, Heading, LocaleSwitcher, Separator, Title } from "~/components";
import { formatResourceURL } from "~/lib/api/uploads";
import { signout, useCurrentUser } from "~/lib/auth";
import { useI18n } from "~/lib/i18n";

export default function Settings() {
  const i18n = useI18n();
  const currentUser = useCurrentUser();
  const loggingOut = useSubmission(signout);

  return (
    <>
      <Title>{i18n.t.routes.settings.heading()}</Title>
      <Show when={currentUser()}>
        {(user) => (
          <div class="space-y-6">
            <Heading>{i18n.t.routes.settings.heading()}</Heading>

            <div class="space-y-3">
              <Heading as="h2" size="subheading">
                {i18n.t.routes.settings.sections.personal.heading()}
              </Heading>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.personal.fields.avatar.heading()}</h3>
                  <p class="text-xs text-neutral-500">
                    {i18n.t.routes.settings.sections.personal.fields.avatar.description()}
                  </p>
                </hgroup>
                <div class="size-8">
                  <Show when={user().avatar_url} fallback={<Icon path={userCircle} />}>
                    {(avatar_url) => (
                      <img src={formatResourceURL(avatar_url())} alt="Profile picture" class="rounded-full" />
                    )}
                  </Show>
                </div>
              </div>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.personal.fields.email.heading()}</h3>
                  <p class="text-xs text-neutral-500">{user().email}</p>
                </hgroup>
                <Button disabled>
                  <Icon path={pencilSquare} class="size-3.5" />
                  {i18n.t.routes.settings.sections.personal.fields.email.change()}
                </Button>
              </div>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.personal.fields.password.heading()}</h3>
                  <p class="text-xs text-neutral-500">
                    {i18n.t.routes.settings.sections.personal.fields.password.description()}
                  </p>
                </hgroup>
                <Button disabled>
                  <Icon path={pencilSquare} class="size-3.5" />
                  {i18n.t.routes.settings.sections.personal.fields.password.change()}
                </Button>
              </div>
            </div>

            <Separator orientation="horizontal" />

            <div class="space-y-3">
              <Heading as="h2" size="subheading">
                {i18n.t.routes.settings.sections.appearance.heading()}
              </Heading>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.appearance.fields.language.heading()}</h3>
                  <p class="text-xs text-neutral-500">
                    {i18n.t.routes.settings.sections.appearance.fields.language.description()}
                  </p>
                </hgroup>
                <LocaleSwitcher />
              </div>
            </div>

            <Separator orientation="horizontal" />

            <div class="space-y-3">
              <Heading as="h2" size="subheading">
                {i18n.t.routes.settings.sections.danger.heading()}
              </Heading>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.danger.fields.logout.heading()}</h3>
                  <p class="text-xs text-neutral-500">
                    {i18n.t.routes.settings.sections.danger.fields.logout.description()}
                  </p>
                </hgroup>
                <form action={signout} method="post">
                  <Button color="dark" type="submit" disabled={loggingOut.pending} aria-busy={loggingOut.pending}>
                    {i18n.t.routes.settings.sections.danger.fields.logout.action()}
                  </Button>
                </form>
              </div>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.danger.fields.deactivate.heading()}</h3>
                  <p class="text-xs text-neutral-500">
                    {i18n.t.routes.settings.sections.danger.fields.deactivate.description()}
                  </p>
                </hgroup>
                <Button disabled color="danger">
                  <Icon path={trash} class="size-3.5" />
                  {i18n.t.routes.settings.sections.danger.fields.deactivate.action()}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Show>
    </>
  );
}
