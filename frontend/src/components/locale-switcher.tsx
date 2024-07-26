import { Icon } from "solid-heroicons";
import { check, chevronUpDown, language } from "solid-heroicons/solid-mini";
import { type Component } from "solid-js";

import { Button, Select } from "~/components";
import { Locale, SUPPORTED_CULTURES, useI18n } from "~/lib/i18n";

export const LocaleSwitcher: Component = () => {
  const i18n = useI18n();

  const languageNames = () => new Intl.DisplayNames([i18n.locale()], { type: "language" });
  const getNativeLanguageName = (locale: Locale) => new Intl.DisplayNames([locale], { type: "language" }).of(locale);
  const getFlagClass = (locale: Locale) => `fi fi-${SUPPORTED_CULTURES[locale].toLowerCase()}`;

  return (
    <Select
      gutter={2}
      options={[...Object.keys(SUPPORTED_CULTURES)]}
      allowDuplicateSelectionEvents={false}
      disallowEmptySelection={true}
      defaultValue={i18n.locale()}
      onChange={i18n.setLocale}
      itemComponent={(props) => (
        <Select.Item item={props.item}>
          <Select.ItemLabel class="flex items-center gap-1.5 capitalize">
            <span class={`${getFlagClass(props.item.rawValue)} rounded-sm ring-1 ring-neutral-400`} />
            <span>{getNativeLanguageName(props.item.rawValue)}</span>
            <span>—</span>
            <span class="text-neutral-500">{languageNames().of(props.item.rawValue)}</span>
          </Select.ItemLabel>
          <Select.ItemIndicator>
            <Icon path={check} width={14} />
          </Select.ItemIndicator>
        </Select.Item>
      )}
    >
      <Select.Trigger as={Button<"button">} aria-busy={i18n.isSettingLocale()} disabled={i18n.isSettingLocale()}>
        <Icon path={language} width={14} />
        <Select.Value<Locale> class="capitalize">
          {(state) => getNativeLanguageName(state.selectedOption())}
        </Select.Value>
        <Select.Icon>
          <Icon path={chevronUpDown} width={14} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Content class="w-72" inert={i18n.isSettingLocale()}>
        <Select.ListBox class="outline-none" />
      </Select.Content>
    </Select>
  );
};
