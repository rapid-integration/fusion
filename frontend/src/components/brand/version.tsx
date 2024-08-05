import { Show, type Component } from "solid-js";

import { Icon } from "solid-heroicons";
import { checkBadge } from "solid-heroicons/solid-mini";

import { Link } from "~/components";

export const Version: Component = () => {
  return (
    <section aria-labelledby="app-name">
      <h6 id="app-name" class="font-semibold">
        {import.meta.env.VITE_APP_NAME}
      </h6>
      <p class="flex items-center gap-0.5">
        <Show when={!import.meta.env.PROD}>
          <Icon path={checkBadge} class="size-3.5 text-green-700" />
        </Show>
        <span class="select-all">Version {import.meta.env.VITE_APP_VERSION}</span>
        <span class="select-none">·</span>
        <Link href="/">Source code</Link>
      </p>
    </section>
  );
};
