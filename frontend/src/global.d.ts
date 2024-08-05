/// <reference types="@solidjs/start/env" />

interface ImportMetaEnv {
  /**
   * URL of the API server that the web app will interact with.
   */
  readonly VITE_API_URL: string;

  /**
   * Private key used to encrypt sessions.
   */
  readonly VITE_SESSION_SECRET: string;

  /**
   * Determines whether the cookies sent to browser should be marked as [secure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#block_access_to_your_cookies).
   */
  readonly VITE_SECURE_COOKIES: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
