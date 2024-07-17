import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { CurrentUserProvider } from "~/lib/auth";
import { I18nProvider } from "~/lib/i18n";
import { PreferencesProvider } from "~/lib/preferences";
import "./app.css";

export default function App() {
  return (
    <MetaProvider>
      <Router
        root={(props) => (
          <CurrentUserProvider>
            <PreferencesProvider>
              <I18nProvider>
                <Suspense>{props.children}</Suspense>
              </I18nProvider>
            </PreferencesProvider>
          </CurrentUserProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
