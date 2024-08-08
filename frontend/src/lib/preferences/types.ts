import { type Theme } from "~/lib/color-scheme";
import { type Locale } from "~/lib/i18n";

export type Settings = {
  locale?: Locale;
  theme?: Theme;
};
