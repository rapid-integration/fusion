import * as i18n from "@solid-primitives/i18n";
import { SUPPORTED_CULTURES } from "~/lib/i18n";

export type Locale = keyof typeof SUPPORTED_CULTURES;

export type DictionaryMap = {
  routes: {
    404: {
      title: string;
      heading: string;
      paragraph: string;
      back: string;
    };
    login: {
      title: string;
      heading: string;
      form: {
        fields: {
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
            forgot: string;
            required: string;
            minLength: string;
          };
        };
        errors: {
          401: string;
          404: string;
        };
        submit: string;
      };
      footer: string;
    };
    resetPassword: {
      title: string;
    };
    settings: {
      heading: string;
      sections: {
        personal: {
          heading: string;
          fields: {
            avatar: {
              heading: string;
              description: string;
            };
            email: {
              heading: string;
              change: string;
            };
            password: {
              heading: string;
              description: string;
              change: string;
            };
          };
        };
        appearance: {
          heading: string;
          fields: {
            language: {
              heading: string;
              description: string;
            };
          };
        };
        danger: {
          heading: string;
          fields: {
            logout: {
              heading: string;
              description: string;
              action: string;
            };
            deactivate: {
              heading: string;
              description: string;
              action: string;
            };
          };
        };
      };
    };
  };
  steps: {
    verification: {
      email: {
        label: string;
        placeholder: string;
        description: string;
        required: string;
        error: string;
        submit: string;
        notExists: string;
      };
      otp: {
        heading: string;
        sent: string;
        resend: string;
        sending: string;
        uncomplete: string;
        incorrect: string;
      };
    };
    resetPassword: {
      email: {
        heading: string;
        back: string;
      };
      password: {
        heading: string;
        paragraph: string;
        form: {
          fields: {
            password: {
              label: string;
              placeholder: string;
              description: string;
              required: string;
              minLength: string;
            };
            confirm: {
              label: string;
              placeholder: string;
              description: string;
              required: string;
              minLength: string;
            };
          };
          errors: {
            mismatch: string;
            unknown: string;
          };
          submit: string;
          success: string;
        };
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
