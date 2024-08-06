import { useSubmission } from "@solidjs/router";

import { Button, Heading, JsonDisplay, LocaleSwitcher, Title } from "~/components";
import { signout, useCurrentUser } from "~/lib/auth";

export default function Settings() {
  const currentUser = useCurrentUser();
  const loggingOut = useSubmission(signout);

  return (
    <>
      <Title>Settings</Title>

      <div class="space-y-4">
        <Heading>Settings</Heading>

        <JsonDisplay data={currentUser()} />

        <div class="flex gap-2">
          <LocaleSwitcher />

          <form action={signout} method="post">
            <Button color="dark" type="submit" disabled={loggingOut.pending} aria-busy={loggingOut.pending}>
              Logout
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
