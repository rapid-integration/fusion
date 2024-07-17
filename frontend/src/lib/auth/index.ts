import { type SessionConfig } from "vinxi/http";

export const SESSION_COOKIE_NAME = "session" as const;

export const SESSION_COOKIE_OPTIONS: SessionConfig = {
  password: import.meta.env.VITE_SESSION_SECRET,
  name: SESSION_COOKIE_NAME,
  cookie: {
    sameSite: "lax",
    secure: import.meta.env.PROD,
  },
};

export * from "./actions";
export * from "./current-user-provider";
export * from "./server";
export * from "./types";
export * from "./utils";
