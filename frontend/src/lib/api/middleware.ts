import colors from "picocolors";

import { type Middleware } from "openapi-fetch";

import { getSession, resetSession } from "~/lib/auth/session";
import logger from "~/lib/logging/console";

export const AUTH_MIDDLEWARE: Middleware = {
  onRequest: async ({ request }) => {
    const session = await getSession();

    if (session.data.auth) {
      if (Date.parse(session.data.auth.expires_at) <= Date.now()) {
        await resetSession();
      } else {
        request.headers.set("Authorization", `Bearer ${session.data.auth.token}`);
      }
    }

    return request;
  },
};

export const DEBUG_MIDDLEWARE: Middleware = {
  onResponse: (options) => {
    const method = colors.white(options.request.method);
    const route = colors.cyan(colors.underline(options.request.url));

    const colorizeStatus = options.response.status >= 400 && options.response.status < 600 ? colors.red : colors.green;
    const status = colorizeStatus(`${options.response.status} ${options.response.statusText}`);

    const icon = options.request.headers.has("Authorization") ? "🔓" : "🔒";

    logger.debug(`${method} ${route} ${status} ${icon}`);
  },
};
