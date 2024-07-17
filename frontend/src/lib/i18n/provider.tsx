import {
  type Accessor,
  type ParentComponent,
  createContext,
  createEffect,
  startTransition,
  useContext
} from "solid-js";
import { type Locale, type LocalizedTranslator, makeTranslator } from "~/lib/i18n";
import { usePreferences } from "~/lib/preferences";

export type I18nContextValue = {
  /**
   * The [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the user.
   */
  locale: Accessor<Locale>;

  /**
   * Sets the locale for the client.
   *
   * @param locale The locale to set.
   */
  setLocale: (locale: Locale) => void;

  /**
   * Provides access to a dictionary translated to the specified locale.
   */
  t: LocalizedTranslator;
};

export const I18nContext = createContext<I18nContextValue>({} as I18nContextValue);

export const I18nProvider: ParentComponent = (props) => {
  const preferences = usePreferences();

  const locale = () => preferences.settings.locale;
  const setLocale = (locale: Locale) => startTransition(() => preferences.set("locale", locale));

  const t = makeTranslator(locale);

  createEffect(() => {
    document.documentElement.lang = locale();
  });

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{props.children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
