import { Search2Icon } from '@chakra-ui/icons';
import type { InputProps } from '@chakra-ui/react';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';

export const Search = (props: InputProps) => {
  return (
    <InputGroup size={{ base: 'md', md: 'lg' }}>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.400" />
      </InputLeftElement>
      <Input
        placeholder="Cari barang..."
        fontSize={{ base: 'sm', md: 'md' }}
        {...props}
      />
    </InputGroup>
  );
};
