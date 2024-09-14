import { cache } from "@solidjs/router";

import type { components } from "~/lib/api/schema";
import { $verifyOtp, $sendOtp } from "./service";

export const isCorrectOtp = cache(async (body: components["schemas"]["CodeVerify"]) => {
  "use server";

  const { error } = await $verifyOtp(body);
  return { error };
}, "isCorrectOtp");

export const sendOtp = cache(async (email: string) => {
  "use server";

  return await $sendOtp(email);
}, "otp");
