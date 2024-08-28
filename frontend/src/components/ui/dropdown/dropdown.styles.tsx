import { tv } from "tailwind-variants";

export const styles = tv({
  slots: {
    content: [
      "z-50 min-w-32",
      "origin-[var(--kb-select-content-transform-origin)] animate-content-hide data-[expanded]:animate-content-show",
      "rounded-lg border border-bg-tertiary bg-bg-default backdrop-blur-xl p-0.5 shadow-md",
    ],
    item: [
      "flex cursor-default select-none items-center justify-between rounded-md px-2 py-1.5 text-sm outline-none",
      "transition-colors duration-0 active:hover:bg-bg-tertiary",
      "data-[disabled]:pointer-events-none data-[highlighted]:bg-bg-secondary data-[disabled]:opacity-50",
    ],
  },
});
