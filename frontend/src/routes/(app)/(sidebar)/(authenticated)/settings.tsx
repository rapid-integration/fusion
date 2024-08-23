import { useAction, useSubmission } from "@solidjs/router";
import { Show } from "solid-js";

import { Icon } from "solid-heroicons";
import { pencilSquare, trash, userCircle } from "solid-heroicons/solid-mini";

import { Button, Dropdown, Heading, LocaleSwitcher, Separator, ThemeSwitcher, Title } from "~/components";
import { formatResourceURL } from "~/lib/api/uploads";
import { unauthenticate, useCurrentUser } from "~/lib/auth";
import { useI18n } from "~/lib/i18n";
import { deleteCurrentUserAvatar, updateCurrentUserAvatar } from "~/lib/api/users/me/actions";

export default function Settings() {
  const i18n = useI18n();
  const currentUser = useCurrentUser();
  const loggingOut = useSubmission(unauthenticate);
  const updateAvatar = useAction(updateCurrentUserAvatar);

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
                  <p class="text-xs text-fg-muted">
                    {i18n.t.routes.settings.sections.personal.fields.avatar.description()}
                  </p>
                </hgroup>
                <div class="size-8">
                  <Dropdown gutter={2} placement="bottom">
                    <Dropdown.Trigger>
                      <Show when={user().avatar_url} fallback={<Icon class="size-8" path={userCircle} />}>
                        {(avatar_url) => (
                          <img
                            src={formatResourceURL(avatar_url())}
                            alt={i18n.t.routes.settings.sections.personal.fields.avatar.heading()}
                            class="rounded-full"
                          />
                        )}
                      </Show>
                    </Dropdown.Trigger>
                    <Dropdown.Content class="min-w-64">
                      <Dropdown.Item as={"label"} for="avatar" class="justify-start gap-2">
                        <input
                          type="file"
                          name="avatar"
                          id="avatar"
                          accept="image/*"
                          class="sr-only"
                          onChange={async (e) => await updateAvatar(e.currentTarget.files?.[0]!)}
                        />
                        <Icon class="size-3.5" path={pencilSquare} />
                        Upload new avatar
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={"form"}
                        method="post"
                        action={deleteCurrentUserAvatar}
                        disabled={user().avatar_url === null}
                      >
                        <button type="submit" class="flex size-full cursor-default items-center gap-2 text-red-600">
                          <Icon class="size-3.5" path={trash} />
                          Remove avatar
                        </button>
                      </Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </div>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.personal.fields.email.heading()}</h3>
                  <p class="text-xs text-fg-muted">{user().email}</p>
                </hgroup>
                <Button>
                  <Icon path={pencilSquare} class="size-3.5" />
                  {i18n.t.routes.settings.sections.personal.fields.email.change()}
                </Button>
              </div>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.personal.fields.password.heading()}</h3>
                  <p class="text-xs text-fg-muted">
                    {i18n.t.routes.settings.sections.personal.fields.password.description()}
                  </p>
                </hgroup>
                <Button>
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
                  <p class="text-xs text-fg-muted">
                    {i18n.t.routes.settings.sections.appearance.fields.language.description()}
                  </p>
                </hgroup>
                <LocaleSwitcher />
              </div>

              <ThemeSwitcher />
            </div>

            <Separator orientation="horizontal" />

            <div class="space-y-3">
              <Heading as="h2" size="subheading">
                {i18n.t.routes.settings.sections.danger.heading()}
              </Heading>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.danger.fields.logout.heading()}</h3>
                  <p class="text-xs text-fg-muted">
                    {i18n.t.routes.settings.sections.danger.fields.logout.description()}
                  </p>
                </hgroup>
                <form action={unauthenticate} method="post">
                  <Button type="submit" disabled={loggingOut.pending} aria-busy={loggingOut.pending}>
                    {i18n.t.routes.settings.sections.danger.fields.logout.action()}
                  </Button>
                </form>
              </div>

              <div class="flex items-center justify-between gap-2">
                <hgroup>
                  <h3 class="font-semibold">{i18n.t.routes.settings.sections.danger.fields.deactivate.heading()}</h3>
                  <p class="text-xs text-fg-muted">
                    {i18n.t.routes.settings.sections.danger.fields.deactivate.description()}
                  </p>
                </hgroup>
                <Button>{i18n.t.routes.settings.sections.danger.fields.deactivate.action()}</Button>
              </div>
            </div>
          </div>
        )}
      </Show>
    </>
  );
}
