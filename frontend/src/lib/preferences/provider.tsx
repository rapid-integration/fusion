import * as storage from "@solid-primitives/storage";
import { type ParentComponent, createContext, createEffect, onCleanup, onMount, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { type Settings, getDefaultSettings, PREFERENCES_COOKIE_OPTIONS } from "~/lib/preferences";

export type PreferencesContextValue = {
  settings: Settings;
  set: SetStoreFunction<Settings>;
};

export const SYNC_BROADCAST_CHANNEL_NAME = "preferences_sync" as const;

export const PreferencesContext = createContext<PreferencesContextValue>({} as PreferencesContextValue);

export const PreferencesProvider: ParentComponent = (props) => {
  const syncBroadcastChannel = new BroadcastChannel(SYNC_BROADCAST_CHANNEL_NAME);
  const [settings, set] = storage.makePersisted(createStore(getDefaultSettings()), PREFERENCES_COOKIE_OPTIONS);

  onMount(() => {
    syncBroadcastChannel.onmessage = (event) => {
      set(event.data);
    };
  });

  createEffect(
    () => {
      syncBroadcastChannel.postMessage({ ...settings });
    },
    { defer: true },
  );

  onCleanup(() => {
    syncBroadcastChannel.close();
  });

  return <PreferencesContext.Provider value={{ settings, set }}>{props.children}</PreferencesContext.Provider>;
};

export const usePreferences = () => useContext(PreferencesContext);
