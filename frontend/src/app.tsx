import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { Portal } from "solid-js/web";
import { Toaster } from "solid-sonner";
import { CurrentUserProvider } from "~/lib/auth";
import { I18nProvider } from "~/lib/i18n";
import { PreferencesProvider } from "~/lib/preferences";
import "./app.css";

export default function App() {
  return (
    <MetaProvider>
      <Router
        root={(props) => (
          <Suspense>
            <CurrentUserProvider>
              <PreferencesProvider>
                <I18nProvider>
                  {props.children}

                  <Portal>
                    <Toaster />
                  </Portal>
                </I18nProvider>
              </PreferencesProvider>
            </CurrentUserProvider>
          </Suspense>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
