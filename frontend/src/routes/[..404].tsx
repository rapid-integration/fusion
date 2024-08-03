import { A } from "@solidjs/router";

import { Icon } from "solid-heroicons";
import { homeModern } from "solid-heroicons/solid-mini";

import { Button, Heading, LocaleSwitcher, Sticker, Title } from "~/components";
import { useI18n } from "~/lib/i18n";

export default function Page() {
  const i18n = useI18n();

  return (
    <>
      <Title>{i18n.t.pages[404].title()}</Title>

      <main class="flex min-h-dvh flex-col items-center justify-center gap-6 text-center text-neutral-900">
        <Sticker path="tgs/eyes.json" class="size-24" />

        <hgroup class="space-y-4">
          <Heading>{i18n.t.pages[404].header()}</Heading>
          <p class="text-sm text-neutral-500">{i18n.t.pages[404].paragraph()}</p>
        </hgroup>

        <section class="flex gap-2">
          <Button as={A} href="/">
            <Icon path={homeModern} width={16} />
            {i18n.t.pages[404].back()}
          </Button>
          <LocaleSwitcher />
        </section>
      </main>
    </>
  );
}
