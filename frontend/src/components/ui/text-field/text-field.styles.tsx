import { tv } from "tailwind-variants";

export const styles = tv({
  slots: {
    wrapper: [
      "flex min-h-8 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white text-sm leading-none",
      "transition-all duration-75",
      "text-neutral-600 placeholder-neutral-400 has-[:placeholder-shown]:text-neutral-400",
      "hover:border-neutral-300",
      "has-[:focus]:border-blue-300 has-[:focus]:outline-none has-[:focus]:ring has-[:focus]:ring-blue-200",
      "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-neutral-300 has-[:disabled]:bg-neutral-100",
      "has-[[data-invalid]]:border-red-600 has-[[data-invalid]]:ring-red-200",
    ],
    input: "block w-full px-1.5 leading-none outline-none disabled:cursor-not-allowed",
    textarea: "flex w-full resize-none px-1.5 py-1 text-sm outline-none disabled:cursor-not-allowed",
    label: "mb-1.5 text-xs font-semibold leading-none",
    description: "mt-1 flex justify-between text-xs text-neutral-500",
    error: "mt-1 text-xs text-red-600",
  },
});
