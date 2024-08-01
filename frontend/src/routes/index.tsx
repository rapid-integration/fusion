import { A } from "@solidjs/router";
import { Button, Title } from "~/components";

export default function Index() {
  return (
    <>
      <Title>Home</Title>

      <main class="mx-auto my-4 max-w-96 space-x-4 text-center">
        <Button as={A} href="/login" color="primary">
          Sign in
        </Button>
        <Button as={A} href="/settings">
          Settings
        </Button>
        <Button as={A} href="/404">
          404
        </Button>
      </main>
    </>
  );
}
