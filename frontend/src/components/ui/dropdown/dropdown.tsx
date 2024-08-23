import { splitProps, type ValidComponent } from "solid-js";

import { PolymorphicProps } from "@kobalte/core/polymorphic";
import * as DropdownPrimitive from "@kobalte/core/dropdown-menu";

import { merge } from "~/lib/utils/css/merge";
import { DropdownMenuContentProps, DropdownMenuItemProps } from "./dropdown.props";
import { styles } from "./dropdown.styles";

// TODO: Re-map more dropdown primitives.
const SelectRoot = DropdownPrimitive.Root;
const DropdownTrigger = DropdownPrimitive.Trigger;
const DropdownArrow = DropdownPrimitive.Arrow;
const DropdownItemLabel = DropdownPrimitive.ItemLabel;
const DropdownItemIndicator = DropdownPrimitive.ItemIndicator;
const DropdownIcon = DropdownPrimitive.Icon;

const DropdownContent = <T extends ValidComponent = "div">(props: PolymorphicProps<T, DropdownMenuContentProps<T>>) => {
  const [, rest] = splitProps(props as DropdownMenuContentProps, ["class"]);
  return (
    <DropdownPrimitive.Portal>
      <DropdownPrimitive.Content class={merge(styles().content(), props.class)} {...rest}>
        <DropdownPrimitive.Arrow />
        {props.children}
      </DropdownPrimitive.Content>
    </DropdownPrimitive.Portal>
  );
};

const DropdownItem = <T extends ValidComponent = "div">(props: PolymorphicProps<T, DropdownMenuItemProps<T>>) => {
  const [, rest] = splitProps(props as DropdownMenuItemProps, ["class"]);
  return <DropdownPrimitive.Item class={merge(styles().item(), props.class)} {...rest} />;
};

export const Dropdown = Object.assign(SelectRoot, {
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Arrow: DropdownArrow,
  ItemLabel: DropdownItemLabel,
  ItemIndicator: DropdownItemIndicator,
  Icon: DropdownIcon,
});
