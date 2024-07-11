import * as i18n from "@solid-primitives/i18n";
import { type Locale, type LocalizedDictionary, type DictionaryMap } from "~/i18n";

/**
 * Asynchronously retrieves the localized dictionary for a specific locale.
 *
 * @param {Locale} locale - The locale for which the dictionary is to be fetched.
 * @returns {Promise<LocalizedDictionary>} - A promise that resolves with the localized dictionary.
 * @throws {ReferenceError} - If the dictionary for the specified locale cannot be fetched.
 */
export async function getLocalizedDictionary(locale: Locale): Promise<LocalizedDictionary> {
  try {
    // TODO: Replace empty strings with values from English dict.
    const dict = (await import(`~/i18n/locales/${locale}.ts`)).dict;
    return i18n.flatten(dict as DictionaryMap);
  } catch (error) {
    throw new ReferenceError(`Cannot fetch dictionary for locale: '${locale}'.`);
  }
}
