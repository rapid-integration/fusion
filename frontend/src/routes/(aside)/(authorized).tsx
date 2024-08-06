import { RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";
import { createRedirectUnauthorized } from "~/lib/auth";

export default function Authorized(props: RouteSectionProps) {
  const isRedirected = createRedirectUnauthorized(`/login?redirect=${encodeURIComponent(props.location.pathname)}`);

  return <Show when={!isRedirected()}>{props.children}</Show>;
}
