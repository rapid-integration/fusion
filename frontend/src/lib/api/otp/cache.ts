import { cache } from "@solidjs/router";

import type { components } from "~/lib/api/schema";
import { $verifyOtp, $sendOtp } from "./service";

export const isCorrectOtp = cache(async (body: components["schemas"]["CodeVerify"]) => {
  "use server";

  const { status } = await $verifyOtp(body);
  const isCorrect = status === 202;

  return isCorrect;
}, "isCorrectOtp");

export const sendOtp = cache(async (email: string) => {
  "use server";

  return await $sendOtp(email);
}, "otp");
