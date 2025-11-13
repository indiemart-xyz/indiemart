import { SmallCloseIcon } from '@chakra-ui/icons';
import { Badge, Stack } from '@chakra-ui/react';

import type { Source } from './types';
import { sourceToColor, sourceToLabel } from './utils';

const sources: Source[] = ['klikindomaret', 'alfagift', 'yogyaonline'];

type FilterProps = {
  onClick: (source: Source) => void;
  selected?: Source;
  onClear?: () => void;
};

export const Filter = ({ onClick, selected, onClear }: FilterProps) => (
  <Stack cursor="pointer" direction="row" spacing={4}>
    {sources.map((source) => (
      <Badge
        size="md"
        key={source}
        variant={selected === source ? 'solid' : 'outline'}
        onClick={() => onClick(source)}
        colorScheme={sourceToColor(source)}
      >
        {sourceToLabel(source)}
      </Badge>
    ))}

    {selected ? <SmallCloseIcon onClick={onClear} /> : null}
  </Stack>
);
