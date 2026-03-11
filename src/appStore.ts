import {defineStore} from "pinia";
import type {AppLanguage} from "@/types/api.ts";
import {setApiLanguage} from "@/api/client.ts";
import {ref, watch} from "vue";

export const useAppStore = defineStore('app', () => {
  // state
  const language = ref<AppLanguage>(import.meta.env.VITE_DEFAULT_LANGUAGE);
  changeLanguage(import.meta.env.VITE_DEFAULT_LANGUAGE)

  // actions
  function changeLanguage(newLang: AppLanguage) {
    language.value = newLang;
  }

  // effects
  watch(language, (newLang) => {
    setApiLanguage(newLang);
  }, { immediate: true });

  return {
    language,
    changeLanguage
  }
})
