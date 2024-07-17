import { cache } from "@solidjs/router";
import { formDataSerializer, getClient } from "~/lib/api";

export const login = async (username: string, password: string) => {
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

export const getCurrentUser = cache(async () => {
  "use server";

  const client = await getClient();

  const { data } = await client.GET("/api/v1/users/me");

  return data;
}, "currentUser");
