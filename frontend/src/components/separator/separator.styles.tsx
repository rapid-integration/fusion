import { tv } from "tailwind-variants";

export const styles = tv({
  base: "shrink-0 bg-neutral-600",
  variants: {
    orientation: {
      vertical: "h-full w-px",
      horizontal: "h-px w-full",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});
