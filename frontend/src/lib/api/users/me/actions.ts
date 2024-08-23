import { action } from "@solidjs/router";
import { $deleteCurrentUserAvatar, $updateCurrentUserAvatar } from "./server";

export const deleteCurrentUserAvatar = action(async () => {
  "use server";

  await $deleteCurrentUserAvatar();
});

export const updateCurrentUserAvatar = action(async (file: File) => {
  "use server";

  await $updateCurrentUserAvatar(file);
});

