import createClient from "openapi-fetch";
import { AUTH_MIDDLEWARE, DEBUG_MIDDLEWARE } from "~/lib/api/middleware";
import type { paths } from "~/lib/api/schema";

export const getClient = async () => {
  "use server";

  const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

  client.use(AUTH_MIDDLEWARE);

  if (import.meta.env.DEV) {
    client.use(DEBUG_MIDDLEWARE);
  }

  return client;
};
