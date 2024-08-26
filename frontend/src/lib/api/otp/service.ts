import { getClient } from "../client";
import { components } from "../schema";

export const $sendOtp = async (email: string) => {
  "use server";

  const client = await getClient();

  return await client.POST("/api/v1/verification/request", {
    body: {
      email: email,
    },
  });
};

export const $verifyOtp = async (body: components["schemas"]["CodeVerify"]) => {
  "use server";

  const client = await getClient();

  return await client.POST("/api/v1/verification/verify", {
    body: body,
  });
};
