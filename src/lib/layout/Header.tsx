import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="space-between"
    >
      <Box>
        <Flex align="center" gap={3}>
          <Heading>IndieMart</Heading>
          <Link
            as={RouterLink}
            to="/about"
            fontSize="xs"
            color="gray.500"
            _hover={{ color: 'blue.400' }}
            textDecoration="underline"
          >
            about
          </Link>
        </Flex>
        <Text fontSize="xs" color="gray.500" mt={0.5}>
          data Indomaret &amp; Alfamart updated setiap hari
        </Text>
      </Box>
      <ThemeToggle />
    </Flex>
  );
};

export default Header;
