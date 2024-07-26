import { tv } from "tailwind-variants";

export const styles = tv({
  slots: {
    root: "h-full w-0.5 rounded-full bg-neutral-900",
    blink: "animate-blink",
  },
});
