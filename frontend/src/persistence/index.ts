import * as storage from "@solid-primitives/storage";

export const COOKIE_STORAGE_NAME = "settings" as const;

export const COOKIE_STORAGE_OPTIONS: storage.PersistenceOptions<any, Record<string, any>> = {
  name: COOKIE_STORAGE_NAME,
  storage: storage.cookieStorage,
  storageOptions: {
    sameSite: "None",
    secure: true,
  },
};
