import { Cart3, ListUl } from '@chakra-icons/bootstrap';
import { Share3 } from '@chakra-icons/tabler-icons';
import {
  Badge,
  ButtonGroup,
  Grid,
  IconButton,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { F } from '@mobily/ts-belt';
import { useDebugValue, useEffect, useState } from 'react';
import { match, P } from 'ts-pattern';

import { searchProduct } from './api';
import { Filter } from './Filter';
import { List } from './List';
import { Loading } from './Loading';
import { Search } from './Search';
import type {
  AsyncData,
  DateFilter,
  SearchResponse,
  Data,
  Source,
} from './types';
import { format } from './utils';

const toData = <T,>(data: T): Data<T> => ({
  kind: 'ok',
  data,
});

const getDataWithDefault = <T, E>(a: AsyncData<T, E>, v: T) =>
  a.kind === 'ok' ? a.data : v;

type FilterState = {
  source?: Source;
  date: DateFilter;
};

type State = {
  query: string;
  filter: FilterState;
  data: AsyncData<SearchResponse[], unknown>;
  cart: SearchResponse[];
  view: 'list' | 'cart';
};

const Home = () => {
  const toast = useToast();

  const [state, setState] = useState<State>({
    query: 'mie',
    data: { kind: 'idle' },
    filter: {
      source: undefined,
      date: 'today',
    },
    cart: [],
    view: 'list',
  });

  const setQuery = F.debounce(
    (query: string) =>
      setState((old) => ({
        ...old,
        query,
      })),
    1000
  );

  useEffect(() => {
    const log = <T,>(x: T) => {
      // eslint-disable-next-line no-console
      console.log(x);
      return x;
    };
    match(window.location.pathname.split('/'))
      .with(['', P.select(P.string)], (hashURL) => {
        Promise.resolve(hashURL)
          .then(decodeURIComponent)
          .then(atob)
          .then(log)
          .then(JSON.parse)
          .then(log)
          .then((cart: State['cart']) =>
            setState((old) => ({
              ...old,
              cart,
              view: 'cart',
            }))
          )
          .then(log)
          .catch(log);
      })
      .otherwise(log);
  }, []);

  useEffect(() => {
    setState((old) => ({
      ...old,
      data: { kind: 'loading' },
    }));

    searchProduct({
      query: state.query,
      source: state.filter.source,
      date: state.filter.date,
    })
      .then((json) =>
        setState((old) => ({
          ...old,
          data: toData(json),
        }))
      )
      .catch(() => {});
  }, [state.query, state.filter]);

  useDebugValue(state);

  const setFilter = (source?: Source) =>
    setState((old) => ({
      ...old,
      filter: {
        ...old.filter,
        source,
      },
    }));

  const setDateFilter = (date: DateFilter) =>
    setState((old) => ({
      ...old,
      filter: {
        ...old.filter,
        date,
      },
    }));

  const addToCart = (product: SearchResponse) =>
    setState((old) => {
      const productExist = old.cart.find((p) => p.id === product.id);

      return { ...old, cart: productExist ? old.cart : [...old.cart, product] };
    });

  const onSwipeList = (dir: string, product: SearchResponse) =>
    dir === 'right' && addToCart(product);

  const onSwipeCart = (dir: string, product: SearchResponse) =>
    dir === 'left' &&
    setState((old) => ({
      ...old,
      cart: old.cart.filter((p) => p.id !== product.id),
    }));

  const setView = (view: State['view']) =>
    setState((old) => ({
      ...old,
      view,
    }));

  const shareURL = (cart: State['cart']) => {
    Promise.resolve(cart)
      .then(JSON.stringify)
      .then(btoa)
      .then(encodeURIComponent)
      .then((urlData) =>
        document.createTextNode(`${window.location.origin}/${urlData}`)
      )
      .then(({ nodeValue }) => navigator.clipboard.writeText(nodeValue || ''))
      .then(() =>
        toast({
          title: 'Copied to clipboard',
          duration: 9000,
          status: 'success',
        })
      )
      .catch(() =>
        toast({
          title: 'Failed Copied to clipboard',
          duration: 3000,
          status: 'error',
        })
      );
  };

  return (
    <Grid gap={{ base: 3, md: 8, lg: 16 }} px={{ base: 1, md: 0 }}>
      {state.data.kind === 'loading' && <Loading />}
      <Stack spacing={{ base: 3, md: 4 }}>
        <Search
          defaultValue={state.query}
          onChange={(e) => {
            setQuery(e.target.value || '');
          }}
        />
        <Stack
          alignItems={{ base: 'flex-start', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          spacing={{ base: 3, md: 0 }}
        >
          <Filter
            selected={state.filter.source}
            onClick={setFilter}
            onClear={() => setFilter()}
            selectedDate={state.filter.date}
            onDateClick={setDateFilter}
          />
          <ButtonGroup size={{ base: 'xs', md: 'sm' }} spacing={2}>
            <IconButton
              onClick={() => setView('list')}
              aria-label="open list"
              colorScheme="blue"
              icon={<ListUl />}
              variant={state.view === 'list' ? 'solid' : 'outline'}
            />
            <IconButton
              onClick={() => setView('cart')}
              aria-label="open cart"
              colorScheme="green"
              icon={
                <>
                  <Cart3 cursor="pointer" /> {state.cart.length}
                </>
              }
              variant={state.view === 'cart' ? 'solid' : 'outline'}
            />
          </ButtonGroup>
        </Stack>
      </Stack>

      {state.data.kind === 'ok' && state.data.data.length === 0 ? (
        <Text color="gray.400" fontSize="sm" textAlign="center">
          Tidak ada data
        </Text>
      ) : null}

      {state.view === 'list' ? (
        <List
          id="list"
          preventSwipe={['left', 'up', 'bottom']}
          onSwipe={onSwipeList}
          data={getDataWithDefault(state.data, []).filter(
            (p) => !state.cart.map(({ id }) => id).includes(p.id)
          )}
        />
      ) : (
        <>
          <ButtonGroup size="xs" alignItems="center">
            <Text fontWeight="bold">
              Total{' '}
              <Badge colorScheme="red">
                {format(
                  state.cart.reduce((acc, cur) => acc + (cur.prices || 0), 0)
                )}
              </Badge>
            </Text>
            <IconButton
              onClick={() => shareURL(state.cart)}
              aria-label="share cart"
              colorScheme="blue"
              icon={<Share3 />}
            />
          </ButtonGroup>
          <List
            id="cart"
            onSwipe={onSwipeCart}
            preventSwipe={['right', 'up', 'bottom']}
            data={state.cart}
          />
        </>
      )}
    </Grid>
  );
};

export default Home;
