import { createAsync } from "@solidjs/router";
import { Component, Show } from "solid-js";

import { bookmark, cog, folder, home, userCircle } from "solid-heroicons/solid-mini";

import { formatResourceURL } from "~/lib/api/uploads";
import { getCurrentUser } from "~/lib/api/users/me";
import { useI18n } from "~/lib/i18n";

import { SidebarItem } from "./item";

export const Sidebar: Component = () => {
  const i18n = useI18n();
  const currentUser = createAsync(() => getCurrentUser());

  return (
    <aside class="sticky z-10 flex w-full max-md:bottom-0 md:top-0 md:max-h-dvh md:min-h-dvh md:max-w-64">
      <nav class="flex w-full gap-1 border-bg-tertiary bg-bg-default/75 py-2 backdrop-blur-xl transition-colors max-md:justify-between max-md:border-t md:flex-col md:border-r md:px-4 md:py-6">
        <SidebarItem href="/">
          <SidebarItem.Icon path={home} />
          <SidebarItem.Label>Home</SidebarItem.Label>
        </SidebarItem>
        <SidebarItem href="/saved">
          <SidebarItem.Icon path={bookmark} />
          <SidebarItem.Label>Saved</SidebarItem.Label>
        </SidebarItem>
        <SidebarItem href="/library">
          <SidebarItem.Icon path={folder} />
          <SidebarItem.Label>Library</SidebarItem.Label>
        </SidebarItem>
        <Show
          when={currentUser()}
          fallback={
            <SidebarItem href="/login" class="flex md:mt-auto">
              <SidebarItem.Icon path={userCircle} />
              <SidebarItem.Label>{i18n.t.routes.login.title()}</SidebarItem.Label>
            </SidebarItem>
          }
        >
          {(user) => (
            <SidebarItem href="/settings" class="flex md:mt-auto" activeClass="max-md:[&>img]:ring-blue-500">
              <Show when={user().avatar_url} fallback={<SidebarItem.Icon path={cog} />}>
                {(avatar_url) => (
                  <SidebarItem.Icon
                    as={"img"}
                    src={formatResourceURL(avatar_url())}
                    class="rounded-full ring-1 max-md:ring-bg-tertiary max-md:transition-shadow"
                  />
                )}
              </Show>

              <SidebarItem.Label>{i18n.t.routes.settings.heading()}</SidebarItem.Label>
            </SidebarItem>
          )}
        </Show>
      </nav>
    </aside>
  );
};
