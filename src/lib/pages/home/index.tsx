import { Alert, AlertIcon, Grid, Stack } from '@chakra-ui/react';
import { F } from '@mobily/ts-belt';
import { useDebugValue, useEffect, useState } from 'react';

import { searchProduct } from './api';
import { Filter } from './Filter';
import { List } from './List';
import { Search } from './Search';
import type { AsyncData, SearchResponse, Data, Error, Source } from './types';

const toData = <T,>(data: T): Data<T> => ({
  kind: 'ok',
  data,
});

const toError = <E = unknown,>(error: E): Error<E> => ({
  kind: 'error',
  error,
});

const getDataWithDefault = <T, E>(a: AsyncData<T, E>, v: T) =>
  a.kind === 'ok' ? a.data : v;

type FilterState = {
  source?: Source;
};

type State = {
  query: string;
  filter: FilterState;
  data: AsyncData<SearchResponse[], unknown>;
};

const Home = () => {
  const [state, setState] = useState<State>({
    query: 'mie',
    data: { kind: 'idle' },
    filter: {
      source: undefined,
    },
  });

  const setQuery = F.debounce(
    (query: string) =>
      setState((old) => ({
        ...old,
        query,
      })),
    1000
  );

  const setError = <E = unknown,>(e: E) =>
    setState((old) => ({
      ...old,
      data: toError(e),
    }));

  useEffect(() => {
    searchProduct({
      query: state.query,
      source: state.filter.source,
    })
      .then((json) =>
        setState((old) => ({
          ...old,
          data: toData(json),
        }))
      )
      .catch(setError);
  }, [state.query, state.filter]);

  useDebugValue(state);

  const setFilter = (source?: Source) =>
    setState((old) => ({
      ...old,
      filter: {
        source,
      },
    }));

  return (
    <Grid gap="16">
      <Stack>
        <Search
          defaultValue={state.query}
          onChange={(e) => {
            setQuery(e.target.value || '');
          }}
        />
        <Filter
          selected={state.filter.source}
          onClick={setFilter}
          onClear={() => setFilter()}
        />
      </Stack>
      {state.data.kind === 'error' ? (
        <Alert status="error">
          <AlertIcon />
          Kesalahan terjadi, tapi bukan dari kamu kok! :(
        </Alert>
      ) : null}
      <List data={getDataWithDefault(state.data, [])} />
    </Grid>
  );
};

export default Home;
