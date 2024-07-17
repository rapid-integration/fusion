import { getRequestEvent } from "solid-js/web";
import { updateSession, useSession } from "vinxi/http";
import { type Auth, type SessionData, SESSION_COOKIE_OPTIONS } from "~/lib/auth";

export const getSession = async () => {
  return await useSession<SessionData>(SESSION_COOKIE_OPTIONS);
};

export const changeSession = async (auth: Auth) => {
  "use server";

  const event = getRequestEvent();

  if (event) {
    await updateSession(event.nativeEvent, SESSION_COOKIE_OPTIONS, () => ({ auth: auth }));
  }
};

export const resetSession = async () => {
  "use server";

  await changeSession(undefined);
};
