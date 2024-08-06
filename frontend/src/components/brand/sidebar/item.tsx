import { Polymorphic, PolymorphicProps } from "@kobalte/core";
import { A, AnchorProps } from "@solidjs/router";
import { Icon } from "solid-heroicons";
import { JSX, ParentComponent, splitProps, ValidComponent } from "solid-js";
import { merge } from "~/lib/utils/css/merge";

export const BottonRoot: ParentComponent<AnchorProps> = (props) => {
  const [local, others] = splitProps(props, ["class", "activeClass"]);
  return (
    <A
      class={merge(
        "flex w-full items-center justify-center gap-1",
        "transition-[color,opacity] active:duration-0",
        "max-md:hover:opacity-75 max-md:active:opacity-50",
        "max-sm:flex-col",
        "md:flex-row md:justify-start md:gap-2 md:rounded-lg md:p-2 md:hover:bg-neutral-200",
        local.class,
      )}
      activeClass={merge("max-md:text-blue-500 md:bg-neutral-300 md:hover:bg-neutral-300", local.activeClass)}
      end
      {...others}
    />
  );
};

export const SidebarItemLabel: ParentComponent = (props) => {
  return <span class="text-xs font-semibold leading-none md:text-sm md:font-medium md:leading-none" {...props} />;
};

export type IconProps = {
  path?: {
    path?: JSX.Element;
    outline?: boolean;
    mini?: boolean;
  };
};

export type SidebarIconProps = IconProps & JSX.StylableSVGAttributes;

export const SidebarItemIcon = <T extends ValidComponent>(props: PolymorphicProps<T, SidebarIconProps>) => {
  const [local, others] = splitProps(props, ["class"]);
  return <Polymorphic as={Icon} class={merge("size-6 md:size-4", local.class)} {...others} />;
};

export const SidebarItem = Object.assign(BottonRoot, {
  Icon: SidebarItemIcon,
  Label: SidebarItemLabel,
});
