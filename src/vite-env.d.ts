/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENWEATHER_API_KEY: string;
  readonly VITE_OPENWEATHER_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
