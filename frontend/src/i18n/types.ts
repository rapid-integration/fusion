import * as i18n from "@solid-primitives/i18n";
import { SUPPORTED_LOCALES } from "~/i18n";

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export type DictionaryMap = {
  hi: string;
  locales: { [K in Locale]: string };
};

export type LocalizedDictionary = i18n.Flatten<DictionaryMap>;
export type LocalizedTranslator = i18n.ChainedTranslator<LocalizedDictionary, string>;
