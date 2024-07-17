import * as storage from "@solid-primitives/storage";

export const PREFERENCES_COOKIE_NAME = "settings" as const;

export const PREFERENCES_COOKIE_OPTIONS: storage.PersistenceOptions<any, storage.CookieOptions> = {
  name: PREFERENCES_COOKIE_NAME,
  storage: storage.cookieStorage,
  storageOptions: {
    sameSite: "Lax",
    secure: import.meta.env.PROD,
  },
};

export * from "./provider";
export * from "./types";
export * from "./utils";
