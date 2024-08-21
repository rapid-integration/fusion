import colors from "picocolors";

import { type Middleware } from "openapi-fetch";

import { getSession } from "~/lib/auth/session";
import logger from "~/lib/logging/console";

export const AUTH_MIDDLEWARE: Middleware = {
  onRequest: async ({ request }) => {
    const session = await getSession();
    const auth = session.data.auth;

    if (auth && Date.parse(auth.expires_at) > Date.now()) {
      request.headers.set("Authorization", `${auth.token_type} ${auth.access_token}`);
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
