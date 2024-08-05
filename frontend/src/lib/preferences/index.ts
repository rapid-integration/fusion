import * as storage from "@solid-primitives/storage";

export const PREFERENCES_COOKIE_NAME = "settings" as const;

export const PREFERENCES_COOKIE_OPTIONS: storage.PersistenceOptions<any, storage.CookieOptions> = {
  name: PREFERENCES_COOKIE_NAME,
  storage: storage.cookieStorage,
  storageOptions: {
    sameSite: "Lax",
    secure: (/true/i).test(import.meta.env.VITE_SECURE_COOKIES),
  },
};

export * from "./provider";
export * from "./types";
export * from "./utils";
