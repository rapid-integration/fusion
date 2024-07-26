import * as i18n from "@solid-primitives/i18n";
import { SUPPORTED_CULTURES } from "~/lib/i18n";

export type Locale = keyof typeof SUPPORTED_CULTURES;

export type DictionaryMap = {
  continue: string;
  pages: {
    404: {
      title: string;
      header: string;
      paragraph: string;
      back: string;
    };
    login: {
      title: string;
      header: string;
      footer: string;
      form: {
        email: {
          label: string;
          placeholder: string;
          description: string;
          required: string;
          error: string;
        };
        password: {
          label: string;
          placeholder: string;
          description: string;
          required: string;
          minLength: string;
        };
      };
      errors: {
        401: string;
        404: string;
      };
    };
  };
  slogan: {
    share: string;
    analyze: string;
    design: string;
    enjoy: string;
    explore: string;
  };
};

export type LocalizedDictionary = i18n.Flatten<DictionaryMap>;
export type LocalizedTranslator = i18n.ChainedTranslator<LocalizedDictionary, string>;
