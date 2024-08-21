import { cache, revalidate } from "@solidjs/router";
import { formDataSerializer, getClient } from "~/lib/api";
import { components } from "~/lib/api/schema";
import { getSession, resetSession } from "./session";

export const $authenticate = async (username: string, password: string) => {
  "use server";

  const client = await getClient();

  return await client.POST("/api/v1/auth/login", {
    body: {
      scope: "auth",
      username: username,
      password: password,
    },
    bodySerializer: formDataSerializer,
  });
};

export const $unauthenticate = async () => {
  "use server";

  await resetSession();
};

export const $requestVerification = async (email: string) => {
  "use server";

  const client = await getClient();

  const { data } = await client.POST("/api/v1/verification/request", {
    body: {
      email: email,
    },
  });

  return data;
};

export const $verifyCode = async (body: components["schemas"]["CodeVerify"]) => {
  "use server";

  const client = await getClient();

  const { response } = await client.POST("/api/v1/verification/verify", {
    body: body,
  });

  return response.status === 202;
};

export const $resetPassword = async (body: components["schemas"]["UserPasswordReset"]) => {
  "use server";

  const client = await getClient();

  return (
    await client.PATCH("/api/v1/auth/reset-password", {
      body: body,
    })
  ).data;
};

export const $userExists = cache(async (email: string) => {
  "use server";

  const client = await getClient();

  const { data } = await client.POST("/api/v1/users/exists", {
    body: {
      email: email,
    },
  });

  return data;
}, "$userExists");

export const $getCurrentUser = cache(async () => {
  "use server";

  const client = await getClient();

  const { data } = await client.GET("/api/v1/users/me");

  return data;
}, "$getCurrentUser");

export const $getIsAuthenticated = cache(async () => {
  "use server";

  const session = await getSession();
  const auth = session.data.auth;

  return auth !== undefined && Date.parse(auth.expires_at) > Date.now();
}, "$getIsAuthenticated");

export const $getSessionExpirationDate = cache(async () => {
  "use server";

  const session = await getSession();
  const auth = session.data.auth;

  return auth ? Date.parse(auth.expires_at) : Date.now();
}, "$getSessionExpiresAt");
