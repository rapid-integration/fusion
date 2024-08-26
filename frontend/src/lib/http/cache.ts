import { cache } from "@solidjs/router";
import { getSession } from "./session";

/**
 * Determines whether the current user is logged in using the JWT.
 */
export const $getIsLoggedIn = cache(async () => {
  "use server";

  const session = await getSession();
  const jwt = session.data.jwt;

  return jwt !== undefined && Date.parse(jwt.expires_at) > Date.now();
}, "$getIsLoggedIn");

/**
 * Retrieves the session expiration date.
 */
export const $getSessionExpirationDate = cache(async () => {
  "use server";

  const session = await getSession();
  const jwt = session.data.jwt;

  return jwt ? Date.parse(jwt.expires_at) : Date.now();
}, "$getSessionExpiresAt");
