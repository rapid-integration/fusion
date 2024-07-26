import { RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";
import { createRedirectAuthorized } from "~/lib/auth";

export default function Unauthorized(props: RouteSectionProps) {
  const isRedirected = createRedirectAuthorized("/settings");

  return <Show when={!isRedirected()}>{props.children}</Show>;
}
