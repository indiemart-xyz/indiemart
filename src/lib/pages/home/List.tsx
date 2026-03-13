import {
  Badge,
  Box,
  Card,
  Grid,
  GridItem,
  Image,
  List,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useBreakpointValue,
} from '@chakra-ui/react';
import type { ComponentProps, ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';
import TinderCard from 'react-tinder-card';

import type { SearchResponse } from './types';
import { format, sourceToColor, sourceToLabel } from './utils';

type TProduct = SearchResponse;

const Product = (product: TProduct) => (
  <Card p={{ base: '3', md: '4' }} h="full">
    <Tooltip label={product?.name || ''}>
      <Stack spacing={{ base: '2', md: '2.5' }} h="full">
        <Image
          src={product?.image || 'https://placehold.co/300x200?text=No+Image'}
          objectFit="cover"
          borderRadius="md"
          w="full"
          h={{ base: '130px', md: '200px' }}
        />
        <Text
          noOfLines={2}
          fontWeight="bold"
          fontSize={{ base: 'sm', md: 'md' }}
        >
          {product?.name || ''}
        </Text>
        <Text fontWeight="black" fontSize={{ base: 'sm', md: 'lg' }}>
          {format(product?.prices || 0)}
        </Text>
        <Badge
          fontWeight="bold"
          textTransform="capitalize"
          letterSpacing="wide"
          p="1.5"
          borderRadius="md"
          colorScheme={sourceToColor(product?.source || 'alfacart')}
          fontSize={{ base: 'xs', md: 'sm' }}
          textAlign="center"
        >
          {sourceToLabel(product?.source || 'alfacart')}
        </Badge>
      </Stack>
    </Tooltip>
  </Card>
);

const LONG_PRESS_DELAY = 1000;
const MOBILE_INITIAL_COUNT = 4;
const MOBILE_LOAD_MORE = 2;

type DraggableCardProps = {
  cardKey: string;
  isMobile: boolean;
  onSwipe: (dir: string) => void;
  preventSwipe: string[];
  children: ReactNode;
};

const DraggableCard = ({
  cardKey,
  isMobile,
  onSwipe,
  preventSwipe,
  children,
}: DraggableCardProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dragEnabledRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || !isMobile) return undefined;

    const onTouchStart = () => {
      dragEnabledRef.current = false;
      el.style.touchAction = 'pan-y';
      timerRef.current = setTimeout(() => {
        dragEnabledRef.current = true;
        el.style.touchAction = 'none';
      }, LONG_PRESS_DELAY);
    };

    const onTouchEnd = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      dragEnabledRef.current = false;
      el.style.touchAction = 'pan-y';
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragEnabledRef.current) {
        e.stopPropagation();
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    el.addEventListener('touchcancel', onTouchEnd, { passive: true });
    el.addEventListener('touchmove', onTouchMove, {
      capture: true,
      passive: true,
    });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('touchcancel', onTouchEnd);
      el.removeEventListener('touchmove', onTouchMove, { capture: true });
    };
  }, [isMobile]);

  return (
    <div ref={wrapperRef} style={{ touchAction: 'pan-y' }}>
      <TinderCard
        key={cardKey}
        onSwipe={onSwipe}
        preventSwipe={isMobile ? ['up', 'down', 'left', 'right'] : preventSwipe}
      >
        {children}
      </TinderCard>
    </div>
  );
};

type ListProductProps = {
  id?: string;
  data: SearchResponse[];
  onSwipe?: (direction: string, product: SearchResponse) => void;
} & Pick<ComponentProps<typeof TinderCard>, 'preventSwipe'>;

const ListProduct = ({ id, data, onSwipe, preventSwipe }: ListProductProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? true;
  const [visibleCount, setVisibleCount] = useState(MOBILE_INITIAL_COUNT);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const displayedData = isMobile ? data.slice(0, visibleCount) : data;
  const hasMore = isMobile && visibleCount < data.length;

  useEffect(() => {
    setVisibleCount(MOBILE_INITIAL_COUNT);
  }, [data.length]);

  useEffect(() => {
    if (!isMobile) return undefined;

    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + MOBILE_LOAD_MORE, data.length)
          );
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [isMobile, data.length, hasMore]);

  return (
    <Box>
      <List
        as={Grid}
        gap={{ base: 3, md: 4 }}
        gridTemplateColumns={
          isMobile
            ? 'repeat(2, 1fr)'
            : ['repeat(1, 1fr)', 'repeat(3, 1fr)', 'repeat(5, 1fr)']
        }
      >
        {displayedData.map((product) => (
          <DraggableCard
            key={`${id || ''}${product.id}`}
            cardKey={`${id || ''}${product.id}`}
            isMobile={isMobile}
            onSwipe={(dir) => (onSwipe ? onSwipe(dir, product) : undefined)}
            preventSwipe={preventSwipe ?? []}
          >
            <GridItem>
              <Product {...product} />
            </GridItem>
          </DraggableCard>
        ))}
      </List>

      {isMobile && (
        <Box ref={sentinelRef} mt={4} textAlign="center">
          {hasMore && <Spinner size="sm" color="blue.400" />}
        </Box>
      )}
    </Box>
  );
};

export { ListProduct as List };
