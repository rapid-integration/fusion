import { getClient } from "../client";

export const exists = async (email: string) => {
  "use server";

  const client = await getClient();

  return await client.POST("/api/v1/users/exists", {
    body: {
      email: email,
    },
  });
};
