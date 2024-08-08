import { type Middleware } from "openapi-fetch";
import colors from "picocolors";
import { getSession, resetSession } from "~/lib/auth/session";

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
    const timestamp = colors.dim(new Date().toLocaleTimeString());
    const prefix = colors.cyan(colors.bold("[api]"));
    const method = colors.green(options.request.method);
    const route = colors.dim(options.request.url);
    const status = colors.yellow(`${options.response.status} ${options.response.statusText}`);

    console.debug(`${timestamp} ${prefix} ${method} ${route} ${status}`);
  },
};
