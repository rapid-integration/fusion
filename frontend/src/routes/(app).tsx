import { makeEventListener } from "@solid-primitives/event-listener";
import { createAsync, revalidate, RouteDefinition, RouteSectionProps } from "@solidjs/router";
import { createEffect, createSignal, on, onCleanup, onMount } from "solid-js";
import { toast } from "solid-sonner";
import { $getCurrentUser, $getIsAuthenticated, $getSessionExpirationDate } from "~/lib/auth";
import { useI18n } from "~/lib/i18n";

export const route = {
  preload: () => {
    $getIsAuthenticated();
    $getSessionExpirationDate();
  },
} satisfies RouteDefinition;

export default function Auth(props: RouteSectionProps) {
  const syncBroadcastChannel = new BroadcastChannel("auth_sync");

  const i18n = useI18n();

  const isAuthenticated = createAsync(() => $getIsAuthenticated(), { deferStream: true });
  const sessionExpirationDate = createAsync(() => $getSessionExpirationDate(), { deferStream: true });

  const [revalidateTimeout, setRevalidateTimeout] = createSignal<NodeJS.Timeout | undefined>();

  const rewriteRevalidateTimeout = (timeout: NodeJS.Timeout): void => {
    clearRevalidateTimeout();
    setRevalidateTimeout(timeout);
  };

  const clearRevalidateTimeout = (): void => {
    const timeout = revalidateTimeout();
    if (timeout) {
      clearTimeout(timeout);
      setRevalidateTimeout(undefined);
    }
  };

  const invalidateSession = (): void => {
    revalidateSession();
    toastSessionExpired();
  };

  const revalidateSession = (): void => {
    revalidate([$getIsAuthenticated.key, $getSessionExpirationDate.key, $getCurrentUser.key]);
  };

  const toastSessionExpired = (): void => {
    if (isAuthenticated() === false) {
      toast.info(i18n.t.sessionExpired());
    }
  };

  onMount(() => {
    syncBroadcastChannel.onmessage = () => {
      revalidateSession();
    };
  });

  createEffect(
    on(sessionExpirationDate, () => {
      const expirationDate = sessionExpirationDate();
      if (!expirationDate) return;

      const expiresAfterMs = expirationDate - Date.now();
      if (expiresAfterMs <= 0) return;

      const timeout = setTimeout(invalidateSession, expiresAfterMs);
      rewriteRevalidateTimeout(timeout);
    }),
  );

  createEffect(
    on(
      isAuthenticated,
      () => {
        syncBroadcastChannel.postMessage(true);

        if (isAuthenticated() === false) {
          clearRevalidateTimeout();
          if (document.hidden) {
            makeEventListener(document, "visibilitychange", toastSessionExpired, { once: true });
          }
        }
      },
      { defer: true },
    ),
  );

  onCleanup(() => {
    syncBroadcastChannel.close();
  });

  return props.children;
}
