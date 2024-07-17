import createClient from "openapi-fetch";
import { AUTH_MIDDLEWARE } from "~/lib/api";
import type { paths } from "~/lib/api/schema";

export const getClient = async () => {
  "use server";

  const client = createClient<paths>({ baseUrl: import.meta.env.VITE_API_URL });

  client.use(AUTH_MIDDLEWARE);

  return client;
};
