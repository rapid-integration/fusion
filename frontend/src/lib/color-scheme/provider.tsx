import { type Accessor, createContext, createEffect, type ParentComponent, useContext } from "solid-js";
import { type Theme } from "~/lib/color-scheme";
import { usePreferences } from "~/lib/preferences";

export type ColorSchemeProviderContextValue = {
  theme: Accessor<Theme>;
  setTheme: (scheme: Theme) => void;
};

export const ColorSchemeProviderContext = createContext<ColorSchemeProviderContextValue>();

export const ColorSchemeProvider: ParentComponent = (props) => {
  const preferences = usePreferences();

  const theme = () => preferences.settings.theme ?? "system";
  const setTheme = (scheme: Theme) => preferences.set("theme", scheme);

  createEffect(() => {
    document.documentElement.dataset.theme = theme();
  });

  const context: ColorSchemeProviderContextValue = {
    theme,
    setTheme,
  };

  return <ColorSchemeProviderContext.Provider value={context}>{props.children}</ColorSchemeProviderContext.Provider>;
};

export const useColorScheme = (): ColorSchemeProviderContextValue => {
  const context = useContext(ColorSchemeProviderContext);

  if (context === undefined) {
    throw new Error(`'useColorScheme' must be used within a 'ColorSchemeProvider' component.`);
  }

  return context;
};
