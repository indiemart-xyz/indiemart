import type { Source } from './types';

type FilterParams = {
  query: string;
  source?: Source;
};

const baseURL = import.meta.env.VITE_APP_API_BASE_URL || '/api';

export const searchProduct = (params: FilterParams) =>
  fetch(`${baseURL}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  }).then((r) => r.json());
