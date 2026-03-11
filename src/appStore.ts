import {defineStore} from "pinia";
import type {AppLanguage} from "@/types/api.ts";
import {setApiLanguage} from "@/api/client.ts";
import {ref} from "vue";

export const useAppStore = defineStore('app', () => {
  // state
  const language = ref<AppLanguage>('pl');

  // actions
  function changeLanguage(newLang: AppLanguage) {
    language.value = newLang;
    setApiLanguage(newLang);
  }

  return {
    language,
    changeLanguage
  }
})
