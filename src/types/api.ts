export interface Genre {
  id: number;
  name: string;
}

export interface Media {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genres: Genre[];
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}

export type AppLanguage = 'en' | 'pl' | 'de';
