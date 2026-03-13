import {
  Badge,
  Box,
  Code,
  Divider,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

const About = () => {
  return (
    <Stack spacing={8}>
      <Flex align="center" gap={4}>
        <Image
          src="/assets/poring.gif"
          alt="Poring"
          boxSize="60px"
          objectFit="contain"
        />
        <Box>
          <Heading size="lg">IndieMart</Heading>
          <Text fontSize="sm" color="gray.500">
            Cari harga termurah di Indomaret &amp; Alfamart
          </Text>
        </Box>
      </Flex>

      <Box>
        <Heading size="md" mb={3}>
          Tentang
        </Heading>
        <Text>
          IndieMart adalah agregator pencarian produk dari Indomaret dan
          Alfamart. Website ini dibuat untuk membantu kamu yang sering bingung
          sebelum belanja ke minimarket — kira-kira produk apa yang paling murah
          ya? Daripada harus cek satu-satu, cukup cari di sini.
        </Text>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={3}>
          Tim
        </Heading>
        <Stack spacing={2}>
          <Text>
            <Badge colorScheme="blue" mr={2}>
              Maintainer
            </Badge>
            <Link href="https://x.com/BukanYahya" isExternal color="blue.400">
              k1m0ch1
            </Link>{' '}
            — yang ngurusin project ini
          </Text>
          <Text>
            <Badge colorScheme="green" mr={2}>
              Frontend
            </Badge>
            rin — yang bikin frontend pertama kali
          </Text>
        </Stack>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={3}>
          Data &amp; Scraping
        </Heading>
        <Text>
          Data produk di-scraping langsung dari situs Indomaret dan Alfamart
          sebanyak <Badge colorScheme="orange">2 kali sehari</Badge> secara
          otomatis, jadi harga yang ditampilkan selalu up-to-date.
        </Text>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={3}>
          Cara Pakai API
        </Heading>
        <Text mb={3}>API terbuka untuk umum. Endpoint pencarian produk:</Text>
        <Box bg="gray.100" _dark={{ bg: 'gray.700' }} borderRadius="md" p={4}>
          <Code display="block" whiteSpace="pre" fontSize="sm">
            {`POST https://indiemart.yggdrasil.id/search
Content-Type: application/json

{
  "query": "mie instan",
  "source": "klikindomaret" // opsional
}
`}
          </Code>
        </Box>
        <Text mt={3} fontSize="sm" color="gray.500">
          Nilai <Code>source</Code> yang tersedia: <Code>klikindomaret</Code>,{' '}
          <Code>alfacart</Code>, <Code>alfagift</Code>, <Code>yogyaonline</Code>
          . Kosongkan untuk mencari di semua sumber.
        </Text>
      </Box>

      <Divider />

      <Box>
        <Heading size="md" mb={3}>
          Source Code
        </Heading>
        <Stack spacing={2}>
          <Text>
            🛒{' '}
            <Link
              href="https://github.com/indiemart-xyz/indiemart"
              isExternal
              color="blue.400"
            >
              github.com/indiemart-xyz/indiemart
            </Link>{' '}
            — frontend &amp; website
          </Text>
          <Text>
            🤖{' '}
            <Link
              href="https://github.com/k1m0ch1/BiBiT"
              isExternal
              color="blue.400"
            >
              github.com/k1m0ch1/BiBiT
            </Link>{' '}
            — scraper backend
          </Text>
        </Stack>
      </Box>
    </Stack>
  );
};

export default About;
