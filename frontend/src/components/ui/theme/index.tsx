import { RadioGroup } from "@kobalte/core/radio-group";
import { Repeat } from "@solid-primitives/range";
import { Icon } from "solid-heroicons";
import { check } from "solid-heroicons/solid-mini";
import { For } from "solid-js";
import { SUPPORTED_THEMES, Theme, useColorScheme } from "~/lib/color-scheme";
import { useI18n } from "~/lib/i18n";
import { merge } from "~/lib/utils/css/merge";

export type ThemeCardProps = {
  name: string;
  key: Theme;
};

export const ThemeSwitcherOptionPreview = (props: { key: Theme }) => {
  return (
    <div
      data-theme={props.key}
      class={merge(
        "flex aspect-[4/3] h-24 w-full flex-col gap-2 overflow-hidden rounded-lg bg-bg-body p-3 ring-1 ring-inset",
        "ring-bg-secondary transition-all group-active:scale-95 group-active:duration-0",
        "hover:ring-bg-tertiary",
        "peer-checked:group-[]:ring-2 peer-checked:group-[]:ring-ring-accent",
      )}
    >
      <div class="mb-1 flex h-3.5 w-full rounded bg-bg-secondary p-1">
        <div class="h-1 w-10 rounded-sm bg-bg-tertiary" />
      </div>
      <div class="flex-grow space-y-1">
        <Repeat times={3}>
          <div class="flex h-3.5 w-full gap-1 rounded bg-bg-default p-1">
            <div class="size-1.5 rounded-sm bg-bg-secondary" />
            <div class="h-1.5 w-10 rounded-sm bg-bg-secondary" />
          </div>
        </Repeat>
      </div>
    </div>
  );
};

export const ThemeSwitcher = () => {
  const i18n = useI18n();
  const colorScheme = useColorScheme();

  return (
    <RadioGroup value={colorScheme.theme()} onChange={(value) => colorScheme.setTheme(value as Theme)}>
      <RadioGroup.Label as={"h3"} class="mb-1 font-semibold">
        {i18n.t.routes.settings.sections.appearance.fields.theme.heading()}
      </RadioGroup.Label>
      <ul class="flex gap-4 overflow-x-auto">
        <For each={SUPPORTED_THEMES}>
          {(theme) => (
            <RadioGroup.Item as={"li"} value={theme} class="w-full">
              <RadioGroup.ItemInput class="peer" />
              <RadioGroup.ItemLabel class="group cursor-pointer space-y-1 peer-checked:cursor-default">
                <ThemeSwitcherOptionPreview key={theme} />
                <p class="flex items-center text-xs font-semibold peer-checked:group-[]:text-fg-accent">
                  <Icon
                    path={check}
                    class={merge(
                      "me-1 size-3.5 select-none transition-[transform,opacity]",
                      "-translate-x-3.5 scale-0 opacity-0",
                      "group-data-[checked]:translate-x-0 group-data-[checked]:scale-100 group-data-[checked]:opacity-100",
                    )}
                  />
                  <span class="-translate-x-3.5 select-none transition-[transform,opacity] group-data-[checked]:translate-x-0">
                    {i18n.t.routes.settings.sections.appearance.fields.theme.options[theme]()}
                  </span>
                </p>
              </RadioGroup.ItemLabel>
            </RadioGroup.Item>
          )}
        </For>
      </ul>
    </RadioGroup>
  );
};
