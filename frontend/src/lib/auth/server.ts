import { cache } from "@solidjs/router";
import { formDataSerializer, getClient } from "~/lib/api";
import { components } from "~/lib/api/schema";

export const $login = async (username: string, password: string) => {
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

export const $requestVerification = async (email: string) => {
  "use server";

  const client = await getClient();

  return (
    await client.POST("/api/v1/verification/request", {
      body: {
        email: email,
      },
    })
  ).data;
};

export const $verifyCode = async (body: components["schemas"]["CodeVerify"]) => {
  "use server";

  const client = await getClient();

  return (
    (
      await client.POST("/api/v1/verification/verify", {
        body: body,
      })
    ).response.status === 202
  );
};

export const $resetPassword = async (body: { password: string; email: string; code: number }) => {
  "use server";

  const client = await getClient();

  return (
    await client.PATCH("/api/v1/auth/reset-password", {
      body: body,
    })
  ).data;
};

export const userExists = cache(async (email: string) => {
  "use server";

  const client = await getClient();

  const { data } = await client.POST("/api/v1/users/exists", {
    body: {
      email: email,
    },
  });

  return data;
}, "userExists");

export const getCurrentUser = cache(async () => {
  "use server";

  const client = await getClient();

  const { data } = await client.GET("/api/v1/users/me");

  return data;
}, "currentUser");
