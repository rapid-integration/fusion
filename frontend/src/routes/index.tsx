import { AppTitle } from "~/components/app-title";
import LocaleSwitcher from "~/components/locale-switcher";
import { useI18n } from "~/i18n";

export default function Index() {
  const i18n = useI18n();

  // * Example * //
  return (
    <>
      <AppTitle>{i18n.t.hi()}</AppTitle>

      <main class="mx-auto space-y-4 p-4 text-center text-neutral-900">
        <h1 class="my-16 text-6xl uppercase text-sky-600">{i18n.t.hi()}</h1>

        <p>{Intl.DateTimeFormat(i18n.locale()).format(new Date(Date.UTC(2020, 10, 20, 8)))}</p>
        <p>{Intl.NumberFormat(i18n.locale()).format(55_555)}</p>

        <LocaleSwitcher />
      </main>
    </>
  );
}
