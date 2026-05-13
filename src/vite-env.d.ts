/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TONI_WHATSAPP_E164?: string;
  readonly VITE_AGR_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
