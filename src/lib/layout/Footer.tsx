import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
    >
      <Text fontSize="xs">
        {new Date().getFullYear()} - IndieMart created by{' '}
        <Link
          href="https://x.com/BukanYahya"
          isExternal
          color="blue.400"
          _hover={{ textDecoration: 'underline' }}
        >
          k1m0ch1
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
