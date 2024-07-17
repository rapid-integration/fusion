import { Title } from "@solidjs/meta";
import { type ParentComponent, Show } from "solid-js";

export const AppTitle: ParentComponent = (props) => {
  return (
    <Show when={props.children} fallback={<Title>Fusion</Title>}>
      <Title>{props.children}</Title>
    </Show>
  );
}

export default AppTitle;
