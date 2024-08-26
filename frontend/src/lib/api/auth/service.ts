import { getClient } from "../client";
import { components } from "../schema";
import { formDataSerializer } from "../serializers";

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

export const $resetPassword = async (body: components["schemas"]["UserPasswordReset"]) => {
  "use server";

  const client = await getClient();

  return await client.PATCH("/api/v1/auth/reset-password", {
    body: body,
  });
};
