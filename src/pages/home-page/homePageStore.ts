import {defineStore} from "pinia";
import {
  ref,
  watch
} from "vue";

export const useHomePageStore = defineStore('homePage', () => {
  // state
  const moviesPage = ref(1);
  const moviesPerPage = ref(15);

  const seriesPage = ref(1);
  const seriesPerPage = ref(15);

  // effects on state change
  watch(moviesPerPage, () => {
    moviesPage.value = 1;
  });

  watch(seriesPerPage, () => {
    seriesPage.value = 1;
  });

  return {
    moviesPage,
    moviesPerPage,
    seriesPage,
    seriesPerPage
  };
});
