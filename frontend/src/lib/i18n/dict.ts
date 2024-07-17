import * as i18n from "@solid-primitives/i18n";
import { type Locale, type LocalizedDictionary, type DictionaryMap } from "~/lib/i18n";

/**
 * Asynchronously retrieves the localized dictionary for a specific locale.
 * @param locale The locale for which the dictionary is to be fetched.
 * @returns A promise that resolves with the localized dictionary.
 * @throws {ReferenceError} If the dictionary for the specified locale cannot be fetched.
 */
export async function getLocalizedDictionary(locale: Locale): Promise<LocalizedDictionary> | never {
  try {
    // TODO: Replace empty strings with values from English dict.
    return i18n.flatten((await import(`~/lib/i18n/locales/${locale}.ts`)).dict as DictionaryMap);
  } catch (error) {
    throw new ReferenceError(`Cannot fetch dictionary for locale: '${locale}'.`);
  }
}
