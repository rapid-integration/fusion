// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";
import { getRequestLocale } from "~/lib/i18n";
import { PREFERENCES_COOKIE_NAME, Settings } from "~/lib/preferences";

export default createHandler((event) => {
  const cookie = getCookie(event.nativeEvent, PREFERENCES_COOKIE_NAME);
  const settings = JSON.parse(cookie ?? "{}") as Settings;

  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang={settings.locale ?? getRequestLocale()} data-theme={settings.theme ?? "system"}>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, user-scalable=no" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://rsms.me/" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons/css/flag-icons.min.css" />
            {assets}
          </head>
          <body class="overflow-x-hidden">
            <div id="app" class="bg-bg-body text-fg-body flex min-h-dvh text-sm transition-colors">
              {children}
            </div>
            {scripts}
          </body>
        </html>
      )}
    />
  );
});
