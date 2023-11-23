import { Cart3, ListUl } from '@chakra-icons/bootstrap';
import { Share3 } from '@chakra-icons/tabler-icons';
import {
  Alert,
  AlertIcon,
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
import { Search } from './Search';
import type { AsyncData, SearchResponse, Data, Error, Source } from './types';
import { format } from './utils';

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

  const setError = <E = unknown,>(e: E) =>
    setState((old) => ({
      ...old,
      data: toError(e),
    }));

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
    <Grid gap="16">
      <Stack>
        <Search
          defaultValue={state.query}
          onChange={(e) => {
            setQuery(e.target.value || '');
          }}
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Filter
            selected={state.filter.source}
            onClick={setFilter}
            onClear={() => setFilter()}
          />
          <ButtonGroup size="sm">
            <IconButton
              onClick={() => setView('list')}
              aria-label="open list"
              colorScheme="blue"
              icon={<ListUl />}
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
            />
          </ButtonGroup>
        </Stack>
      </Stack>

      {state.data.kind === 'error' ? (
        <Alert status="error">
          <AlertIcon />
          Kesalahan terjadi, tapi bukan dari kamu kok! :(
        </Alert>
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
