import { MetaProvider } from "@solidjs/meta";
import { RouteSectionProps } from "@solidjs/router";
import { Suspense } from "solid-js";
import { Toaster } from "solid-sonner";
import { SessionExpirationMonitor } from "~/components";
import { I18nProvider } from "~/lib/i18n";
import { PreferencesProvider } from "~/lib/preferences";
import { ThemeProvider } from "~/lib/theme";

export const AppRoot = (props: RouteSectionProps) => {
  return (
    <MetaProvider>
      <PreferencesProvider>
        <I18nProvider>
          <ThemeProvider>
            <Suspense>{props.children}</Suspense>

            <Toaster />
            <SessionExpirationMonitor />
          </ThemeProvider>
        </I18nProvider>
      </PreferencesProvider>
    </MetaProvider>
  );
};
