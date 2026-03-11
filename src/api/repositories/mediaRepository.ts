import type {Genre, Media, PaginatedResponse} from "@/types/api.ts";
import {apiClient} from "@/api/client.ts";

const mapToMedia = (item: Media): Media => ({
  id: item.id,
  title: item.title,
  overview: item.overview,
  release_date: new Date(item.release_date).toLocaleDateString(),
  genres: item.genres?.map((g: Genre): Genre => ({
    id: g.id,
    name: g.name
  })) || []
});

async function fetchPaginatedMedia(endpoint: string, page: number, per_page: number): Promise<PaginatedResponse<Media>> {
  const { data } = await apiClient.get<PaginatedResponse<Media>>(endpoint, {
    params: {
      page,
      per_page,
    }
  });
  return {
    ...data,
    data: data.data.map(mapToMedia)
  };
}

export const mediaRepository = {
  async getMovies(page: number, per_page: number) {
    return fetchPaginatedMedia('/movies', page, per_page);
  },

  async getSeries(page: number, per_page: number) {
    return fetchPaginatedMedia('/series', page, per_page);
  },
};
