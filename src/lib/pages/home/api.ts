import type { DateFilter, Source } from './types';

type FilterParams = {
  query: string;
  source?: Source;
  date?: DateFilter;
};

const baseURL = import.meta.env.VITE_APP_API_BASE_URL || '/api';

export const searchProduct = (params: FilterParams) => {
  const url = new URL(`${baseURL}/search`, window.location.origin);
  url.searchParams.set('query', params.query);
  if (params.source) url.searchParams.set('source', params.source);
  if (params.date) url.searchParams.set('date', params.date);
  return fetch(url.toString()).then((r) => r.json());
};
