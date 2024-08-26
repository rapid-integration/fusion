import { cache } from "@solidjs/router";

import { exists } from "./service";

export const $getUserExists = cache(async (email: string): Promise<boolean> => {
  "use server";

  const result = await exists(email);

  return result.data ?? false;
}, "$getUserExists");
