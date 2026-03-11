import axios from 'axios';
import type {AppLanguage} from "@/types/api.ts";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setApiLanguage = (lang: AppLanguage) => {
  apiClient.defaults.headers.common['Accept-Language'] = lang;
}
