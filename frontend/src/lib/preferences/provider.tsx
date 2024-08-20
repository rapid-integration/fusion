import * as storage from "@solid-primitives/storage";
import { type ParentComponent, createContext, createEffect, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { type Settings, getDefaultSettings, PREFERENCES_COOKIE_OPTIONS } from "~/lib/preferences";

export type PreferencesContextValue = {
  settings: Settings;
  set: SetStoreFunction<Settings>;
};

export const PreferencesContext = createContext<PreferencesContextValue>({} as PreferencesContextValue);

export const PreferencesProvider: ParentComponent = (props) => {
  const broadcast = new BroadcastChannel("pereferences");
  const [settings, set] = storage.makePersisted(createStore(getDefaultSettings()), PREFERENCES_COOKIE_OPTIONS);

  broadcast.onmessage = (event) => set(event.data);
  createEffect(() => broadcast.postMessage({ ...settings }), { defer: true });

  return <PreferencesContext.Provider value={{ settings, set }}>{props.children}</PreferencesContext.Provider>;
};

export const usePreferences = () => useContext(PreferencesContext);
