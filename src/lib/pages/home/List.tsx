import {
  Card,
  Grid,
  GridItem,
  Image,
  List,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import type { SearchResponse } from './types';
import { sourceToColor, sourceToLabel } from './utils';

type TProduct = SearchResponse;

const format = (number: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
    number
  );

const Product = (product: TProduct) => (
  <Card p="4">
    <Tooltip label={product?.name || ''}>
      <Stack spacing="2.5">
        <Image
          src={
            product?.image ||
            'https://2.bp.blogspot.com/-ttF34uoSnKI/WOTWd_AP7hI/AAAAAAAABzE/PY-iXu-nTRYwAF2vYbOmFBs4a-bHgKt0gCLcB/s1600/20170404_170812.jpg'
          }
        />
        <Text noOfLines={1} fontWeight="bold">
          {product?.name || ''}
        </Text>
        <Text fontWeight="black">{format(product?.prices || 0)}</Text>
        <Text
          fontWeight="bold"
          textTransform="capitalize"
          letterSpacing="wide"
          p="1"
          borderRadius="md"
          bgColor={`${sourceToColor(product?.source || 'alfacart')}.400`}
        >
          {sourceToLabel(product?.source || 'alfacart')}
        </Text>
      </Stack>
    </Tooltip>
  </Card>
);

type ListProductProps = {
  data: SearchResponse[];
};

const ListProduct = ({ data }: ListProductProps) => {
  return (
    <List
      as={Grid}
      gap={4}
      gridTemplateColumns={[
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(4, 1fr)',
      ]}
    >
      {data.map((product, i) => (
        <GridItem key={product.name || i}>
          <Product {...product} />
        </GridItem>
      ))}
    </List>
  );
};

export { ListProduct as List };