import client from "~/lib/api/client";

export const exists = async (email: string) => {
  "use server";

  return await client.POST("/api/v1/users/exists", {
    body: {
      email: email,
    },
  });
};
