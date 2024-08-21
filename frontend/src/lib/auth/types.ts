export type Auth =
  | {
      access_token: string;
      token_type: string;
      expires_at: string;
    }
  | undefined;

export type SessionData = {
  auth: Auth;
};
