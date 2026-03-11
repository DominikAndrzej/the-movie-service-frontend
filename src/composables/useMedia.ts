import {
  computed,
  type Ref} from 'vue';
import { mediaRepository } from '@/api/repositories/mediaRepository';
import type {
  Media,
  PaginatedResponse
} from '@/types/api';
import {useAppStore} from "@/appStore.ts";
import {useQuery} from "@tanstack/vue-query";

function usePaginatedQuery<T>(
  key: string,
  page: Ref<number>,
  per_page: Ref<number>,
  fetcher: (page: number, per_page: number) => Promise<PaginatedResponse<T>>
) {
  const store = useAppStore();

  return useQuery({
    queryKey: computed(() => [key, page.value, store.language, per_page.value]),
    queryFn: () => fetcher(page.value, per_page.value),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 30,
  });
}

export const useMoviesQuery = (page: Ref<number>, per_page: Ref<number>,) =>
  usePaginatedQuery<Media>('movies', page, per_page, mediaRepository.getMovies);

export const useSeriesQuery = (page: Ref<number>, per_page: Ref<number>,) =>
  usePaginatedQuery<Media>('series', page, per_page, mediaRepository.getSeries);
