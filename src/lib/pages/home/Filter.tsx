import { SmallCloseIcon } from '@chakra-ui/icons';
import { Badge, Divider, Stack, Wrap, WrapItem } from '@chakra-ui/react';

import type { DateFilter, Source } from './types';
import { sourceToColor, sourceToLabel } from './utils';

const sources: Source[] = ['klikindomaret', 'alfagift', 'yogyaonline'];

const dateOptions: { value: DateFilter; label: string }[] = [
  { value: 'today', label: 'Hari ini' },
  { value: 'yesterday', label: 'Kemaren' },
];

type FilterProps = {
  onClick: (source: Source) => void;
  selected?: Source;
  onClear?: () => void;
  selectedDate: DateFilter;
  onDateClick: (date: DateFilter) => void;
};

export const Filter = ({
  onClick,
  selected,
  onClear,
  selectedDate,
  onDateClick,
}: FilterProps) => (
  <Stack spacing={2}>
    <Wrap cursor="pointer" spacing={{ base: 2, md: 4 }} align="center">
      {sources.map((source) => (
        <WrapItem key={source}>
          <Badge
            size={{ base: 'sm', md: 'md' }}
            variant={selected === source ? 'solid' : 'outline'}
            onClick={() => onClick(source)}
            colorScheme={sourceToColor(source)}
            fontSize={{ base: '10px', md: '12px' }}
            px={{ base: 2, md: 3 }}
            py={1}
          >
            {sourceToLabel(source)}
          </Badge>
        </WrapItem>
      ))}
      {selected ? (
        <WrapItem>
          <SmallCloseIcon onClick={onClear} boxSize={{ base: 3, md: 4 }} />
        </WrapItem>
      ) : null}

      <WrapItem>
        <Divider orientation="vertical" h="18px" />
      </WrapItem>

      {dateOptions.map(({ value, label }) => (
        <WrapItem key={value}>
          <Badge
            variant={selectedDate === value ? 'solid' : 'outline'}
            onClick={() => onDateClick(value)}
            colorScheme="purple"
            fontSize={{ base: '10px', md: '12px' }}
            px={{ base: 2, md: 3 }}
            py={1}
            cursor="pointer"
          >
            {label}
          </Badge>
        </WrapItem>
      ))}
    </Wrap>
  </Stack>
);
