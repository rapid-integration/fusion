// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { getCookie } from "vinxi/http";
import { getRequestLocale } from "~/i18n";
import { COOKIE_STORAGE_NAME } from "~/persistence";

export default createHandler((event) => {
  const cookie = getCookie(event.nativeEvent, COOKIE_STORAGE_NAME);
  const locale = JSON.parse(cookie ?? "{}").locale || getRequestLocale();

  return (
    <StartServer
      document={({ assets, children, scripts }) => (
        <html lang={locale}>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://rsms.me/" />
            <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            {assets}
          </head>
          <body>
            <div id="app">{children}</div>
            {scripts}
          </body>
        </html>
      )}
    />
  );
});
