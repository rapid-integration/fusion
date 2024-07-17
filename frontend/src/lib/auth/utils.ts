import { cache, createAsync, redirect } from "@solidjs/router";
import { getSession } from "./session";

/**
 * A primitive which redirects authorized users to the specified URL.
 * @param url The URL to redirect authorized users to.
 * @returns Accessor function to determine if the user has been redirected.
 */
export const createRedirectAuthorized = (url: string) => {
  return createAsync(() => redirectAuthorized(url));
};

/**
 * A primitive which redirects unauthorized users to the specified URL.
 * @param url The URL to redirect unauthorized users to.
 * @returns Accessor function to determine if the user has been redirected.
 */
export const createRedirectUnauthorized = (url: string) => {
  return createAsync(() => redirectUnauthorized(url));
};

const redirectAuthorized = cache(async (url: string) => {
  "use server";

  if (await isAuthorized()) {
    throw redirect(url);
  }

  return false;
}, "redirectAuthorized");

const redirectUnauthorized = cache(async (url: string) => {
  "use server";

  if (!(await isAuthorized())) {
    throw redirect(url);
  }

  return false;
}, "redirectUnauthorized");

/**
 * Determines whether the user has a valid authentication session.
 * @returns A promise that resolves to true if the user is authorized, or false otherwise.
 */
export const isAuthorized = async () => {
  "use server";

  return (await getSession()).data.auth !== undefined;
};
