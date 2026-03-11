<script setup lang="ts">

import {useAppStore} from "@/appStore.ts";
import type {AppLanguage} from "@/types/api.ts";
import {ref} from "vue";

const appStore = useAppStore();

const languages: { code: AppLanguage; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'pl', label: 'PL' },
  { code: 'de', label: 'DE' }
];

const updateLanguage = (newLang: AppLanguage) => {
  appStore.changeLanguage(newLang);
}

</script>

<template>
  <div class="flex items-center justify-center p-2">
    <nav class="inline-flex p-1 bg-gray-100 rounded-xl shadow-sm border border-gray-200" aria-label="Language selector">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="updateLanguage(lang.code)"
        :class="[
          'px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg',
          appStore.language === lang.code
            ? 'bg-white text-blue-600 shadow-sm ring-1 ring-black/5'
            : 'text-gray-500 hover:text-gray-700'
        ]"
      >
        {{ lang.label }}
      </button>
    </nav>
  </div>
</template>

<style scoped>

</style>
