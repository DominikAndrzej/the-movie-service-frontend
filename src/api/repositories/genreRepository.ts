import { apiClient } from '@/api/client';
import type {Genre, PaginatedResponse} from '@/types/api';

export const genreRepository = {
  async getAll(): Promise<Genre[]> {
    let allGenres: Genre[] = [];
    let currentPage = 1;
    let hasNextPage = true;

    while(hasNextPage) {
      const { data } = await apiClient.get<PaginatedResponse<Genre>>('/genres', {
        params: { page: currentPage }
      });

      allGenres = [...allGenres, ...data.data];

      if (data.meta.current_page < data.meta.last_page) {
        currentPage++;
      } else {
        hasNextPage = false;
      }
    }

    return allGenres.map(item => ({
      id: item.id,
      name: item.name
    }));
  }
};
