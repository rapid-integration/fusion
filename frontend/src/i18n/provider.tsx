import * as storage from "@solid-primitives/storage";
import { type Accessor, type ParentComponent, createContext, createEffect, useContext, useTransition } from "solid-js";
import { createStore } from "solid-js/store";
import { type Locale, type LocalizedTranslator, getDefaultLocale, makeTranslator } from "~/i18n";
import { COOKIE_STORAGE_OPTIONS } from "~/persistence";

export type Store = {
  locale: Locale;
};

export const getDefaultStore = () => ({
  locale: getDefaultLocale(),
});

export type I18nProviderContextValue = {
  /**
   * The [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the user.
   */
  locale: Accessor<Locale>;

  /**
   * Sets the locale for the client.
   *
   * @param {Locale} locale - The locale to set.
   */
  setLocale: (locale: Locale) => void;

  /**
   * Provides access to a dictionary translated to the specified locale.
   */
  t: LocalizedTranslator;
};

export const I18nProviderContext = createContext<I18nProviderContextValue>({} as I18nProviderContextValue);

export const I18nProvider: ParentComponent = (props) => {
  const [settings, set] = storage.makePersisted(createStore(getDefaultStore()), COOKIE_STORAGE_OPTIONS);

  const locale = () => settings.locale;
  const setLocale = (locale: Locale) => startSettingLocale(() => set("locale", locale));
  const [isSettingLocale, startSettingLocale] = useTransition();

  const t = makeTranslator(locale);

  createEffect(() => {
    document.documentElement.lang = locale();
  });

  createEffect(() => {
    document.body.inert = isSettingLocale();
    document.body.classList.toggle("animate-pulse", isSettingLocale());
  });

  return <I18nProviderContext.Provider value={{ locale, setLocale, t }}>{props.children}</I18nProviderContext.Provider>;
};

export const useI18n = () => useContext(I18nProviderContext);
