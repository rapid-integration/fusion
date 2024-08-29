import client from "~/lib/api/client";
import { formDataSerializer } from "~/lib/api/serializers";

export const getCurrentUser = async () => {
  "use server";
  
  return await client.GET("/api/v1/users/me");
};

export const $removeCurrentUserAvatar = async () => {
  "use server";

  return await client.DELETE("/api/v1/users/me/avatar");
};

export const $updateCurrentUserAvatar = async (file: File) => {
  "use server";

  return await client.PATCH("/api/v1/users/me/avatar", {
    body: {
      file: file,
    },
    bodySerializer: formDataSerializer,
  });
};
