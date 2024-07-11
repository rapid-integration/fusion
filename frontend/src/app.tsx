import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { I18nProvider } from "~/i18n";
import "./app.css";

export default function App() {
  return (
    <MetaProvider>
      <Title>Fusion</Title>
      <Router
        root={(props) => (
          <Suspense>
            <I18nProvider>{props.children}</I18nProvider>
          </Suspense>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}
