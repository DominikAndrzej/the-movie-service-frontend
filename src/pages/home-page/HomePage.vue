<script setup lang="ts">
import TableHeader from "@/pages/home-page/TableHeader.vue";
import TableView from "@/pages/home-page/TableView.vue";
import {useMoviesQuery, useSeriesQuery} from "@/composables/useMedia.ts";
import {computed, ref} from "vue";
import type {Media} from "@/types/api.ts";
import {useHomePageStore} from "@/pages/home-page/homePageStore.ts";
import {storeToRefs} from "pinia";

const activeMediaType = ref<'movies' | 'series'>('movies');

const homePageStore = useHomePageStore();

const {
  moviesPage,
  moviesPerPage,
  seriesPage,
  seriesPerPage
} = storeToRefs(homePageStore);

const {
  data: moviesQuery,
  isLoading: loadingMovies,
  // isError,
  // error,
  // isPlaceholderData
} = useMoviesQuery(moviesPage, moviesPerPage);

const {
  data: seriesQuery,
  isLoading: loadingSeries,
  // isError,
  // error,
  // isPlaceholderData
} = useSeriesQuery(seriesPage, seriesPerPage);

const movies = computed<Media[]>(() => moviesQuery.value?.data ?? []);
const series = computed<Media[]>(() => seriesQuery.value?.data ?? []);

const currentItems = computed(() => {
  return activeMediaType.value === 'movies' ? movies.value : series.value;
});

const isLoading = computed(() => {
  return activeMediaType.value === 'movies' ? loadingMovies.value : loadingSeries.value;
});

const currentPage = computed({
  get: () => activeMediaType.value === 'movies' ? moviesPage.value : seriesPage.value,
  set: (val) => {
    if (activeMediaType.value === 'movies') moviesPage.value = val;
    else seriesPage.value = val;
  }
});

const currentPageSize = computed({
  get: () => activeMediaType.value === 'movies' ? moviesPerPage.value : seriesPerPage.value,
  set: (val) => {
    if (activeMediaType.value === 'movies') moviesPerPage.value = val;
    else seriesPerPage.value = val;
  }
});

const nextPage = () => {
  currentPage.value++;
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Better mobile UX
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

</script>

<template>
  <TableHeader/>

  <div class="flex justify-center p-1 w-full md:w-auto">
    <div class="bg-gray-100 p-1 rounded-xl flex items-center">
      <button
        @click="activeMediaType = 'movies'"
        :class="[
        'px-8 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200',
        activeMediaType === 'movies' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
      ]">
        Movies
      </button>
      <button
        @click="activeMediaType = 'series'"
        :class="[
        'px-8 py-1.5 text-sm font-semibold rounded-lg transition-all duration-200',
        activeMediaType === 'series' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'
      ]">
        Series
      </button>
    </div>
  </div>

  <TableView :items="currentItems" :loading="isLoading">
    <template #header>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
    </template>

    <template #row="{ item }">
      <td class="px-6 py-2 md:py-4 whitespace-nowrap text-sm">
        <div class="flex flex-col md:flex-row">
          <span class="md:hidden text-[10px] font-bold uppercase text-gray-400 mb-1">Title</span>
          <span class="font-bold text-gray-900 md:font-normal">{{ item.title }}</span>
        </div>
      </td>

      <td class="px-6 py-2 md:py-4 whitespace-nowrap text-sm text-gray-600">
        <div class="flex flex-col md:flex-row">
          <span class="md:hidden text-[10px] font-bold uppercase text-gray-400 mb-1">Release Date</span>
          <span>{{ item.release_date }}</span>
        </div>
      </td>
    </template>
  </TableView>

  <div class="mt-6 flex flex-col space-y-4 px-4 pb-10">

    <div class="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
      <span class="text-sm font-medium text-gray-600">Items per page</span>
      <select
        v-model="currentPageSize"
        class="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option :value="10">10</option>
        <option :value="15">15</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
      </select>
    </div>

    <div class="flex items-center gap-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="flex-1 bg-white border border-gray-200 py-3 rounded-xl font-semibold shadow-sm active:scale-95 transition-transform disabled:opacity-50 disabled:active:scale-100"
      >
        Previous
      </button>

      <div class="px-4 text-sm font-bold text-gray-700">
        Page {{ currentPage }}
      </div>

      <button
        @click="nextPage"
        :disabled="currentItems.length < currentPageSize"
        class="flex-1 bg-white border border-gray-200 py-3 rounded-xl font-semibold shadow-sm active:scale-95 transition-transform disabled:opacity-50"
      >
        Next
      </button>
    </div>
  </div>

</template>

<style scoped>

</style>
