import { createAsync, Navigate, useSearchParams, type RouteDefinition, type RouteSectionProps } from "@solidjs/router";
import { Match, Show, Switch } from "solid-js";
import { $getIsAuthenticated } from "~/lib/auth";

export const route = {
  preload: () => {
    $getIsAuthenticated();
  },
} satisfies RouteDefinition;

export default function Unauthenticated(props: RouteSectionProps) {
  const [searchParams] = useSearchParams();

  const isAuthenticated = createAsync(() => $getIsAuthenticated(), { deferStream: true });

  return (
    <Switch>
      <Match when={isAuthenticated() === false}>{props.children}</Match>
      <Match when={isAuthenticated() === true}>
        <Show when={searchParams.redirect} fallback={<Navigate href="/" />}>
          {(pathname) => <Navigate href={pathname()} />}
        </Show>
      </Match>
    </Switch>
  );
}
