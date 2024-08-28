import { A, useSubmission } from "@solidjs/router";
import {
  arrowRightOnRectangle,
  chevronRight,
  globeAlt,
  informationCircle,
  paintBrush,
  userCircle,
} from "solid-heroicons/solid-mini";
import {
  Heading,
  LocaleSwitcher,
  ThemeSwitcher,
  Title,
} from "~/components";
import { SettingsCard } from "~/components/ui/settings/card";
import { SettingsExpander } from "~/components/ui/settings/expander";
import { SettingsGroup } from "~/components/ui/settings/group";
import { unauthenticate } from "~/lib/api/auth";
import { useI18n } from "~/lib/i18n";
import { useTheme } from "~/lib/theme";

export default function Settings() {
  const i18n = useI18n();
  const theme = useTheme();
  const unauthenticating = useSubmission(unauthenticate);

  return (
    <div class="space-y-6">
      <Title>{i18n.t.routes.settings.heading()}</Title>
      <Heading>{i18n.t.routes.settings.heading()}</Heading>

      <section class="space-y-3">
        <Heading as="h2" size="subheading">
          {i18n.t.routes.settings.sections.account.heading()}
        </Heading>

        <SettingsGroup>
          <SettingsCard as={A} href="/settings/account" variant="hover">
            <SettingsCard.Icon path={userCircle} class="size-4" />
            <SettingsCard.HeaderGroup>
              <SettingsCard.Header>
                {i18n.t.routes.settings.sections.account.cards.account.heading()}
              </SettingsCard.Header>
              <SettingsCard.Description>
                {i18n.t.routes.settings.sections.account.cards.account.description()}
              </SettingsCard.Description>
            </SettingsCard.HeaderGroup>
            <SettingsCard.Icon path={chevronRight} class="size-4" />
          </SettingsCard>
        </SettingsGroup>

        <SettingsGroup as="form" action={unauthenticate} method="post">
          <SettingsCard
            as={"button"}
            type="submit"
            disabled={unauthenticating.pending}
            aria-busy={unauthenticating.pending}
            variant="hover"
          >
            <SettingsCard.Icon path={arrowRightOnRectangle} class="size-4 text-red-600" />
            <SettingsCard.HeaderGroup>
              <SettingsCard.Header class="text-red-600">
                {i18n.t.routes.settings.sections.account.cards.signout.heading()}
              </SettingsCard.Header>
              <SettingsCard.Description>
                {i18n.t.routes.settings.sections.account.cards.signout.description()}
              </SettingsCard.Description>
            </SettingsCard.HeaderGroup>
            <SettingsCard.Icon path={chevronRight} class="size-4" />
          </SettingsCard>
        </SettingsGroup>
      </section>

      <section class="space-y-3">
        <Heading as="h2" size="subheading">
          {i18n.t.routes.settings.sections.appearance.heading()}
        </Heading>

        <SettingsGroup>
          <SettingsExpander>
            <SettingsExpander.Trigger>
              <SettingsCard.Icon path={paintBrush} class="size-4" />
              <SettingsCard.HeaderGroup>
                <SettingsCard.Header>
                  {i18n.t.routes.settings.sections.appearance.cards.theme.heading()}
                </SettingsCard.Header>
                <SettingsCard.Description>
                  {i18n.t.routes.settings.sections.appearance.cards.theme.description()}
                </SettingsCard.Description>
              </SettingsCard.HeaderGroup>
              <SettingsCard.Description class="transition-all group-data-[expanded]/collapsible:opacity-0">
                {i18n.t.routes.settings.sections.appearance.cards.theme.options[theme.theme()]()}
              </SettingsCard.Description>
              <SettingsExpander.Indicator />
            </SettingsExpander.Trigger>
            <SettingsExpander.Content>
              <ThemeSwitcher class="px-6 py-3" />
            </SettingsExpander.Content>
          </SettingsExpander>
          <SettingsCard>
            <SettingsCard.Icon path={globeAlt} class="size-4" />
            <SettingsCard.HeaderGroup>
              <SettingsCard.Header>
                {i18n.t.routes.settings.sections.appearance.cards.locale.heading()}
              </SettingsCard.Header>
              <SettingsCard.Description>
                {i18n.t.routes.settings.sections.appearance.cards.locale.description()}
              </SettingsCard.Description>
            </SettingsCard.HeaderGroup>
            <LocaleSwitcher />
          </SettingsCard>
        </SettingsGroup>
      </section>

      <section class="space-y-3">
        <Heading as="h2" size="subheading">
          {i18n.t.routes.settings.sections.about.heading()}
        </Heading>

        <SettingsGroup>
          <SettingsCard>
            <SettingsCard.Icon path={informationCircle} class="size-4" />
            <SettingsCard.HeaderGroup>
              <SettingsCard.Header class="capitalize">{import.meta.env.VITE_APP_NAME}</SettingsCard.Header>
              <SettingsCard.Description>
                {i18n.t.routes.settings.sections.about.cards.app.description()}
              </SettingsCard.Description>
            </SettingsCard.HeaderGroup>
            <SettingsCard.Description as="code">{import.meta.env.VITE_APP_VERSION}</SettingsCard.Description>
          </SettingsCard>
        </SettingsGroup>
      </section>
    </div>
  );
}
