import type { InputProps } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

export const Search = (props: InputProps) => {
  return (
    <Input
      size="lg"
      placeholder="Cari barang yang ingin Kamu mau beli..."
      {...props}
    />
  );
};
