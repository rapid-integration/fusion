import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Portal } from "solid-js/web";
import { Toaster } from "solid-sonner";
import { ThemeProvider } from "~/lib/theme";
import { I18nProvider } from "~/lib/i18n";
import { PreferencesProvider } from "~/lib/preferences";
import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <PreferencesProvider>
            <I18nProvider>
              <ThemeProvider>
                <Suspense>{props.children}</Suspense>

                <Portal>
                  <Toaster richColors />
                </Portal>
              </ThemeProvider>
            </I18nProvider>
          </PreferencesProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
