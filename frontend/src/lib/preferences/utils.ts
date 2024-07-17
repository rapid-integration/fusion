import { getDefaultLocale } from "~/lib/i18n";
import { Settings } from "~/lib/preferences";

export const getDefaultSettings = (): Settings => ({
  locale: getDefaultLocale(),
});
