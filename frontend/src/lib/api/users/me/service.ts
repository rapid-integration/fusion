// import { formDataSerializer, getClient } from "~/lib/api";

import { getClient } from "../../client";
import { formDataSerializer } from "../../serializers";

export const getCurrentUser = async () => {
  "use server";

  const client = await getClient();
  
  return await client.GET("/api/v1/users/me");
};

export const $removeCurrentUserAvatar = async () => {
  "use server";

  const client = await getClient();

  return await client.DELETE("/api/v1/users/me/avatar");
};

export const $updateCurrentUserAvatar = async (file: File) => {
  "use server";

  const client = await getClient();
  
  return await client.PATCH("/api/v1/users/me/avatar", {
    body: {
      file: file,
    },
    bodySerializer: formDataSerializer,
  });
};
