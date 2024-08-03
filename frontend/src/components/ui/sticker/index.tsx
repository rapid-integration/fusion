import { makeEventListener } from "@solid-primitives/event-listener";
import { createVisibilityObserver } from "@solid-primitives/intersection-observer";
import { type ValidComponent, createEffect, createSignal, onCleanup, onMount, splitProps } from "solid-js";

import { type PolymorphicProps, Polymorphic } from "@kobalte/core";

import Lottie, { type AnimationConfigWithPath, type RendererType } from "lottie-web";

export type StickerProps<T extends RendererType = "svg"> = Omit<AnimationConfigWithPath<T>, "container">;

export const Sticker = <T extends ValidComponent = "div", R extends RendererType = "svg">(
  props: PolymorphicProps<T, StickerProps<R>>,
) => {
  const [config, others] = splitProps<PolymorphicProps<T, StickerProps<R>>, [Readonly<keyof StickerProps<R>>[]]>(
    props,
    [
      "assetsPath",
      "audioFactory",
      "autoplay",
      "initialSegment",
      "loop",
      "name",
      "path",
      "renderer",
      "rendererSettings",
    ],
  );
  const [ref, setRef] = createSignal<Element>();

  onMount(() => {
    const container = ref();
    if (!container) return;

    const animation = Lottie.loadAnimation({ ...config, container: container });

    makeEventListener(window, "blur", () => animation.pause());
    makeEventListener(window, "focus", () => animation.play());
    
    const visible = createVisibilityObserver()(() => container);

    createEffect(() => {
      visible() ? animation.play() : animation.pause();
    })

    onCleanup(() => {
      animation.destroy();
    })
  });

  return <Polymorphic as={"div"} ref={setRef} {...others} />;
};
