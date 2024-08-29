import client from "~/lib/api/client";
import { components } from "~/lib/api/schema";
import { formDataSerializer } from "~/lib/api/serializers";

export const $authenticate = async (username: string, password: string) => {
  "use server";

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

  return await client.PATCH("/api/v1/auth/reset-password", {
    body: body,
  });
};
