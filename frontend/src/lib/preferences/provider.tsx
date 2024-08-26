import * as storage from "@solid-primitives/storage";
import { type ParentComponent, createContext, createEffect, onCleanup, onMount, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { type Settings, getDefaultSettings } from "~/lib/preferences";

export type PreferencesContextValue = {
  settings: Settings;
  set: SetStoreFunction<Settings>;
};

export const PreferencesContext = createContext<PreferencesContextValue>({} as PreferencesContextValue);

export const PreferencesProvider: ParentComponent = (props) => {
  const sync = new BroadcastChannel("preferences_sync");
  
  // TODO: Use sync API
  const [settings, set] = storage.makePersisted(createStore(getDefaultSettings()), {
    name: "preferences",
    storage: storage.cookieStorage,
    storageOptions: {
      sameSite: "Lax",
      secure: (/true/i).test(import.meta.env.VITE_SECURE_COOKIES),
    },
  });

  onMount(() => {
    sync.onmessage = (event) => {
      set(event.data);
    };
  });

  createEffect(
    () => {
      sync.postMessage({ ...settings });
    },
    { defer: true },
  );

  onCleanup(() => {
    sync.close();
  });

  return <PreferencesContext.Provider value={{ settings, set }}>{props.children}</PreferencesContext.Provider>;
};

export const usePreferences = () => useContext(PreferencesContext);
