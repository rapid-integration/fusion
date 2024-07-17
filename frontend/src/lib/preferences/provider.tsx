import * as storage from "@solid-primitives/storage";
import { type ParentComponent, createContext, useContext } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { PREFERENCES_COOKIE_OPTIONS } from "~/lib/preferences";
import { type Settings, getDefaultSettings } from "~/lib/preferences";

export type PreferencesContextValue = {
  settings: Settings;
  set: SetStoreFunction<Settings>;
};

export const PreferencesContext = createContext<PreferencesContextValue>({} as PreferencesContextValue);

export const PreferencesProvider: ParentComponent = (props) => {
  const [settings, set] = storage.makePersisted(createStore(getDefaultSettings()), PREFERENCES_COOKIE_OPTIONS);

  return <PreferencesContext.Provider value={{ settings, set }}>{props.children}</PreferencesContext.Provider>;
};

export const usePreferences = () => useContext(PreferencesContext);
