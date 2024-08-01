import { tv } from "tailwind-variants";

export const styles = tv({
  base: "font-semibold",
  variants: {
    size: {
      default: "text-2xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});
