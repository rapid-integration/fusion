import { A, useSubmission } from "@solidjs/router";

import { Button, JsonDisplay, LocaleSwitcher, Title } from "~/components";
import { signout, useCurrentUser } from "~/lib/auth";

export default function Settings() {
  const loggingOut = useSubmission(signout);
  const currentUser = useCurrentUser();

  return (
    <>
      <Title>Settings</Title>

      <main class="m-auto w-full max-w-xl space-y-4 py-6">
        <Button as={A} href="/">
          Home
        </Button>
        <JsonDisplay data={currentUser()} />
        <LocaleSwitcher />
        <form action={signout} method="post">
          <Button color="dark" type="submit" disabled={loggingOut.pending} aria-busy={loggingOut.pending}>
            Logout
          </Button>
        </form>
      </main>
    </>
  );
}
