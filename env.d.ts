/// <reference types="vite/client" />
import type {AppLanguage} from "@/types/api.ts";

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string,
  readonly VITE_DEFAULT_LANGUAGE: AppLanguage
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

