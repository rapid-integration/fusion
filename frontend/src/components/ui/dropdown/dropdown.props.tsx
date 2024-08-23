import { ParentProps, type ValidComponent } from "solid-js";

import * as DropdownPrimitive from "@kobalte/core/dropdown-menu";

export type DropdownMenuContentProps<T extends ValidComponent = "div"> = DropdownPrimitive.DropdownMenuContentProps<T> &
  ParentProps & {
    class?: string | undefined;
  };

export type DropdownMenuItemProps<T extends ValidComponent = "div"> = DropdownPrimitive.DropdownMenuItemProps<T> & {
  class?: string | undefined;
};
