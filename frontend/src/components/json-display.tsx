import { For } from "solid-js";

export const JsonDisplay = (props: { data: Record<string, any> | undefined }) => {
  return (
    <div class="rounded-xl border bg-neutral-100 text-sm text-neutral-800">
      <ul class="divide-y">
        <For each={Object.entries(props.data || {})}>
          {(item) => (
            <li class="flex py-2 px-3 flex-wrap">
              <div class="w-1/2 font-medium">{item[0]}</div>
              <div class="w-1/2">{JSON.stringify(item[1])}</div>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};
