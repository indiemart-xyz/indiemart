export type Source = 'klikindomaret' | 'alfacart';
export type SearchResponse = {
  name?: string;
  link?: string;
  source?: Source;
  image?: string;
  prices?: number;
};
export type Idle = { kind: 'idle' };
export type Loading = { kind: 'loading' };
export type Error<E> = { kind: 'error'; error: E };
export type Data<T> = { kind: 'ok'; data: T };
export type AsyncData<T, E> = Idle | Loading | Data<T> | Error<E>;
