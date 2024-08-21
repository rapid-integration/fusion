import { createAsync, Navigate, type RouteDefinition, type RouteSectionProps } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import { $getIsAuthenticated } from "~/lib/auth";

export const route = {
  preload: () => {
    $getIsAuthenticated();
  },
} satisfies RouteDefinition;

export default function Authenticated(props: RouteSectionProps) {
  const isAuthenticated = createAsync(() => $getIsAuthenticated(), { deferStream: true });

  return (
    <Switch>
      <Match when={isAuthenticated() === true}>{props.children}</Match>
      <Match when={isAuthenticated() === false}>
        <Navigate href={`/login?redirect=${encodeURIComponent(props.location.pathname)}`} />
      </Match>
    </Switch>
  );
}
