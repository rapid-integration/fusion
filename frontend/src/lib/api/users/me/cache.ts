import { cache } from "@solidjs/router";

import { getCurrentUser } from "./service";

export const $getCurrentUser = cache(async () => {
  "use server";

  const result = await getCurrentUser();

  return result.data;
}, "$getCurrentUser");
