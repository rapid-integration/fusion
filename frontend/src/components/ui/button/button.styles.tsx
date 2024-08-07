import { tv } from "tailwind-variants";

export const styles = tv({
  base: [
    "text-sm leading-none outline-none text-nowrap",
    "transition-all duration-75",
    "focus-visible:ring active:hover:duration-0",
    "disabled:cursor-not-allowed disabled:opacity-75",
    "aria-busy:cursor-progress",
  ],
  variants: {
    size: {
      md: "px-3 py-2 gap-2 rounded-lg",
    },
    color: {
      default: [
        "bg-white text-neutral-900 border-neutral-200",
        "hover:border-neutral-300 hover:bg-neutral-100",
        "active:bg-neutral-200",
      ],
      dark: "bg-neutral-800 hover:bg-neutral-700 border-neutral-900 active:bg-neutral-600 text-neutral-100 ring-neutral-500",
      primary: "bg-blue-500 hover:bg-blue-600 border-blue-600 active:bg-blue-700 text-neutral-100 ring-blue-300",
      success: "bg-green-600 hover:bg-green-700 active:bg-green-800 border-green-700 text-neutral-100 ring-green-400",
      danger: "bg-red-500 hover:bg-red-600 active:bg-red-700 border-red-600 text-neutral-100 ring-red-300",
    },
    variant: {
      default: ["font-semibold inline-flex w-auto select-none items-center justify-center", "highlight-black/25 border"],
      hyperlink: ["p-0 !bg-transparent", "text-blue-600", "hover:text-blue-700 hover:underline", "active:text-blue-800"],
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
    variant: "default",
  },
});
