import { Flex, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Loading = () => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex={9999}
      flexDirection="row"
      alignItems="center"
      gap={4}
      padding={6}
    >
      <Image
        src="/assets/poring.gif"
        alt="Loading..."
        boxSize="60px"
        objectFit="contain"
      />
      <Text fontSize="3xl" fontWeight="bold" color="blue.500" lineHeight="60px">
        Loading{'.'.repeat(dots)}
      </Text>
    </Flex>
  );
};
