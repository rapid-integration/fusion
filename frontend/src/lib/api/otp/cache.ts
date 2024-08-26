import { cache } from "@solidjs/router";

import { components } from "../schema";
import { $verifyOtp } from "./service";

export const $isCorrectOtp = cache(async (body: components["schemas"]["CodeVerify"]) => {
  "use server";

  const { response } = await $verifyOtp(body);
  
  return response.status === 202;
}, "$isCorrectOtp");
