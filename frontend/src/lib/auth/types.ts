export type Auth =
  | {
      token: string;
      expires_at: string;
    }
  | undefined;

export type SessionData = {
  auth: Auth;
};
