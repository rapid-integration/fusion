/// <reference types="@solidjs/start/env" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SESSION_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
