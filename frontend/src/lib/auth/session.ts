import { getRequestEvent } from "solid-js/web";
import { updateSession, useSession } from "vinxi/http";
import { type SessionData, Auth, SESSION_COOKIE_OPTIONS } from "~/lib/auth";

export const getSession = async () => {
  return await useSession<SessionData>(SESSION_COOKIE_OPTIONS);
};

export const changeSession = async (data: SessionData) => {
  "use server";

  const event = getRequestEvent();

  if (event) {
    await updateSession(event.nativeEvent, SESSION_COOKIE_OPTIONS, () => data);
  }
};

export const updateAuth = async (auth: Auth) => {
  "use server";

  await changeSession({
    auth: auth,
  });
};

export const resetSession = async () => {
  "use server";

  await updateAuth(undefined);
};
