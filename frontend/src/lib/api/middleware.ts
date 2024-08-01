import { type Middleware } from "openapi-fetch";
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
    console.debug(`${options.request.method} ${options.schemaPath} - ${options.response.status} ${options.response.statusText}`);
  },
};
