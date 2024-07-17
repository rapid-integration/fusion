import * as i18n from "@solid-primitives/i18n";
import { SUPPORTED_LOCALES } from "~/lib/i18n";

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type DictionaryMap = {
  locales: { [K in Locale]: string };
};

export type LocalizedDictionary = i18n.Flatten<DictionaryMap>;
export type LocalizedTranslator = i18n.ChainedTranslator<LocalizedDictionary, string>;
