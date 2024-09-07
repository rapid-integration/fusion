import { cache } from "@solidjs/router";

import { $getUserExists } from "./service";

export const getUserExists = cache(async (email: string): Promise<boolean> => {
  "use server";

  const result = await $getUserExists(email);
  const userExists = result.data ?? false;

  return userExists;
}, "$getUserExists");
