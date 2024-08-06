import { Component, Show } from "solid-js";
import { bookmark, folder, home, userCircle } from "solid-heroicons/solid-mini";
import { useCurrentUser } from "~/lib/auth";
import { SidebarItem } from "./item";

export const Sidebar: Component = () => {
  const currentUser = useCurrentUser();

  return (
    <aside class="sticky flex w-full max-md:bottom-0 md:top-0 md:max-h-dvh md:min-h-dvh md:max-w-64">
      <nav class="flex w-full gap-1 bg-neutral-100/75 py-2 backdrop-blur-xl max-md:justify-between max-md:border-t md:flex-col md:border-r md:px-4 md:py-6">
        <SidebarItem href="/">
          <SidebarItem.Icon path={home} />
          <SidebarItem.Label>Home</SidebarItem.Label>
        </SidebarItem>
        <SidebarItem href="/library">
          <SidebarItem.Icon path={folder} />
          <SidebarItem.Label>Library</SidebarItem.Label>
        </SidebarItem>
        <SidebarItem href="/saved">
          <SidebarItem.Icon path={bookmark} />
          <SidebarItem.Label>Saved</SidebarItem.Label>
        </SidebarItem>
        <Show
          when={currentUser()}
          fallback={
            <SidebarItem href="/login" class="flex md:mt-auto">
              <SidebarItem.Icon path={userCircle} />
              <SidebarItem.Label>Log in</SidebarItem.Label>
            </SidebarItem>
          }
        >
          {(user) => (
            <SidebarItem href="/settings" class="flex md:mt-auto" activeClass="[&>img]:ring-blue-500">
              <SidebarItem.Icon
                as={"img"}
                src={`${import.meta.env.VITE_API_URL}uploads/${user().avatar_url}`}
                class="rounded-full ring-1 ring-neutral-200"
              />
              <SidebarItem.Label>Settings</SidebarItem.Label>
            </SidebarItem>
          )}
        </Show>
      </nav>
    </aside>
  );
};
