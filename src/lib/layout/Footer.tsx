import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
    >
      <Text fontSize="xs">{new Date().getFullYear()} - IndieMarT</Text>
    </Flex>
  );
};

export default Footer;
