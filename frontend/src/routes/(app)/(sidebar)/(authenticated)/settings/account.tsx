import { Breadcrumbs } from "@kobalte/core/breadcrumbs";
import { A, createAsync, useAction } from "@solidjs/router";
import { Icon } from "solid-heroicons";
import { arrowUpTray, chevronRight, envelopeOpen, key, userCircle, xMark } from "solid-heroicons/solid-mini";
import { Show } from "solid-js";
import { Heading, Title } from "~/components";
import { SettingsCard } from "~/components/ui/settings/card";
import { SettingsGroup } from "~/components/ui/settings/group";
import { formatResourceURL } from "~/lib/api/uploads";
import { getCurrentUser, removeCurrentUserAvatar, updateCurrentUserAvatar } from "~/lib/api/users/me";
import { useI18n } from "~/lib/i18n";

export default function Account() {
  const i18n = useI18n();
  const currentUser = createAsync(() => getCurrentUser());
  const updateAvatar = useAction(updateCurrentUserAvatar);

  return (
    <>
      <Title>{i18n.t.routes.settings.account.heading()}</Title>

      <Show when={currentUser()}>
        {(user) => (
          <div class="space-y-6">
            <Breadcrumbs separator={<Icon class="size-5" path={chevronRight} />}>
              <ol class="flex select-none items-center gap-1 text-fg-muted">
                <li>
                  <Breadcrumbs.Link as={A} href="/settings">
                    <Heading>{i18n.t.routes.settings.heading()}</Heading>
                  </Breadcrumbs.Link>
                </li>
                <Breadcrumbs.Separator class="breadcrumbs__separator" />
                <li class="text-fg-body">
                  <Heading>{i18n.t.routes.settings.account.heading()}</Heading>
                </li>
              </ol>
            </Breadcrumbs>

            <section class="flex flex-col items-center justify-center gap-3 px-2 py-1 text-center">
              <Show when={user().avatar_url} fallback={<Icon class="size-24" path={userCircle} />}>
                {(avatar_url) => (
                  <img
                    src={formatResourceURL(avatar_url())}
                    alt={i18n.t.routes.settings.account.sections.avatar.heading()}
                    class="size-24 rounded-full"
                  />
                )}
              </Show>
              <hgroup>
                <Heading as="h3" size="subheading">
                  {user().email}
                </Heading>
                <p class="text-base text-fg-muted">ID: {user().id}</p>
              </hgroup>
            </section>

            <section class="space-y-4">
              <Heading size="subheading">{i18n.t.routes.settings.account.sections.avatar.heading()}</Heading>

              <SettingsGroup>
                <SettingsCard as="label" for="avatar" variant="hover">
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    class="sr-only"
                    onChange={async (e) => await updateAvatar(e.currentTarget.files?.[0]!)}
                  />
                  <SettingsCard.Icon path={arrowUpTray} class="size-4" />
                  <SettingsCard.HeaderGroup>
                    <SettingsCard.Header>
                      {i18n.t.routes.settings.account.sections.avatar.cards.change.heading()}
                    </SettingsCard.Header>
                    <SettingsCard.Description>
                      {i18n.t.routes.settings.account.sections.avatar.cards.change.description()}
                    </SettingsCard.Description>
                  </SettingsCard.HeaderGroup>
                  <SettingsCard.Icon path={chevronRight} class="size-4" />
                </SettingsCard>
              </SettingsGroup>

              <SettingsGroup as={"form"} method="post" action={removeCurrentUserAvatar}>
                <SettingsCard as="button" disabled={user().avatar_url === null} variant="hover">
                  <SettingsCard.Icon path={xMark} class="size-4 text-red-600" />
                  <SettingsCard.HeaderGroup>
                    <SettingsCard.Header class="text-red-600">
                      {i18n.t.routes.settings.account.sections.avatar.cards.remove.heading()}
                    </SettingsCard.Header>
                    <SettingsCard.Description>
                      {i18n.t.routes.settings.account.sections.avatar.cards.remove.description()}
                    </SettingsCard.Description>
                  </SettingsCard.HeaderGroup>
                  <SettingsCard.Icon path={chevronRight} class="size-4" />
                </SettingsCard>
              </SettingsGroup>
            </section>

            <section class="space-y-4">
              <Heading size="subheading">{i18n.t.routes.settings.account.sections.security.heading()}</Heading>

              <SettingsGroup>
                <SettingsCard variant="hover">
                  <SettingsCard.Icon path={envelopeOpen} class="size-4" />
                  <SettingsCard.HeaderGroup>
                    <SettingsCard.Header>
                      {i18n.t.routes.settings.account.sections.security.cards.email.heading()}
                    </SettingsCard.Header>
                    <SettingsCard.Description>
                      {i18n.t.routes.settings.account.sections.security.cards.email.description()}
                    </SettingsCard.Description>
                  </SettingsCard.HeaderGroup>
                  <SettingsCard.Description>{user().email}</SettingsCard.Description>
                  <SettingsCard.Icon path={chevronRight} class="size-4" />
                </SettingsCard>
                <SettingsCard variant="hover">
                  <SettingsCard.Icon path={key} class="size-4" />
                  <SettingsCard.HeaderGroup>
                    <SettingsCard.Header>
                      {i18n.t.routes.settings.account.sections.security.cards.password.heading()}
                    </SettingsCard.Header>
                    <SettingsCard.Description>
                      {i18n.t.routes.settings.account.sections.security.cards.password.description()}
                    </SettingsCard.Description>
                  </SettingsCard.HeaderGroup>
                  <SettingsCard.Icon path={chevronRight} class="size-4" />
                </SettingsCard>
              </SettingsGroup>
            </section>
          </div>
        )}
      </Show>
    </>
  );
}
