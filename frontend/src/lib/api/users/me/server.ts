import { formDataSerializer, getClient } from "~/lib/api";

export const $deleteCurrentUserAvatar = async () => {
  "use server";

  const client = await getClient();

  const { response } = await client.DELETE("/api/v1/users/me/avatar");

  return response.status !== 404;
};

export const $updateCurrentUserAvatar = async (file: File) => {
  "use server";

  const client = await getClient();

  const { response } = await client.PATCH("/api/v1/users/me/avatar", {
    body: {
      file: file,
    },
    bodySerializer: formDataSerializer,
  });

  return response.status;
};
