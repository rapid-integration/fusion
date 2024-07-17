import { type Component, For } from "solid-js";
import { type Locale, SUPPORTED_LOCALES, useI18n } from "~/lib/i18n";

export const LocaleSwitcher: Component = () => {
  const i18n = useI18n();
  // TODO: Add option to set system default.
  const locales = () => SUPPORTED_LOCALES.map((locale) => ({ locale: locale, label: i18n.t.locales[locale] }));

  return (
    <select name="locales" onChange={(event) => i18n.setLocale(event.currentTarget.value as Locale)}>
      <For each={locales()}>
        {(item) => (
          <option selected={item.locale == i18n.locale()} value={item.locale}>
            {item.label()}
          </option>
        )}
      </For>
    </select>
  );
};

export default LocaleSwitcher;
