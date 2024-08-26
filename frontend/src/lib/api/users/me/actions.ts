import { action } from "@solidjs/router";
import { $removeCurrentUserAvatar, $updateCurrentUserAvatar } from "./service";

// import { me } from ".";

export const removeCurrentUserAvatar = action(async () => {
  "use server";

  await $removeCurrentUserAvatar();
});

export const updateCurrentUserAvatar = action(async (file: File) => {
  "use server";

  await $updateCurrentUserAvatar(file);
});
