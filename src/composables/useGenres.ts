import {genreRepository} from "@/api/repositories/genreRepository.ts";
import {useAppStore} from "@/appStore.ts";
import {useQuery} from "@tanstack/vue-query";
import {computed} from "vue";

export function useGenresQuery() {
  const store = useAppStore();

  return useQuery({
    queryKey: computed(() => ['genres', 'all', store.language]),
    queryFn: () => genreRepository.getAll(),
    staleTime: 1000 * 60 * 60,
  });
}
