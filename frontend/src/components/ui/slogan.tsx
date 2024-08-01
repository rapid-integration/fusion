import { Component } from "solid-js";
import { useI18n } from "~/lib/i18n";
import { Typer } from "~/components";
import { shuffled } from "~/lib/array";

export const Slogan: Component = () => {
  const i18n = useI18n();

  return (
    <Typer
      as="h1"
      class="text-2xl text-neutral-900"
      text={shuffled([
        i18n.t.slogan.share(),
        i18n.t.slogan.analyze(),
        i18n.t.slogan.design(),
        i18n.t.slogan.explore(),
        i18n.t.slogan.enjoy(),
      ])}
    />
  );
};
