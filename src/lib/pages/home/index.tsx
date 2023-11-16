import { Grid } from '@chakra-ui/react';
import { F } from '@mobily/ts-belt';
import { useEffect, useState } from 'react';

import { Filter } from './Filter';
import { List } from './List';
import { Search } from './Search';
import type { AsyncData, SearchResponse, Data } from './types';

const toData = <T,>(data: T): Data<T> => ({
  kind: 'ok',
  data,
});

const getDataWithDefault = <T, E>(a: AsyncData<T, E>, v: T) =>
  a.kind === 'ok' ? a.data : v;

type State = {
  query: string;
  data: AsyncData<SearchResponse[], unknown>;
};
const searchProduct = (query: string) =>
  fetch('/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }).then((r) => r.json());

const Home = () => {
  const [state, setState] = useState<State>({
    query: 'mie',
    data: { kind: 'idle' },
  });

  const setQuery = F.debounce(
    (query) =>
      setState((old) => ({
        ...old,
        query,
      })),
    1000
  );

  useEffect(() => {
    searchProduct(state.query)
      .then((json) =>
        setState((old) => ({
          ...old,
          data: toData(json),
        }))
      )
      .catch(() => {
        // TODO
      });
  }, [state.query]);

  return (
    <Grid gap="16">
      <Search
        onChange={(e) => {
          setQuery(e.target.value || '');
        }}
      />
      <Filter />
      <List data={getDataWithDefault(state.data, [])} />
    </Grid>
  );
};

export default Home;
