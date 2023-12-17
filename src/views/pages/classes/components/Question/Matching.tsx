import { Box, Group, TextInput, Text } from '@mantine/core';
import { FC } from 'react';
import BadgeQuestion from '../base/BadgeQuestion';
import Button from 'views/components/base/Button';

const Matching: FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box w="100%" sx={{ flex: 2 }}>
        <Text sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 4 }}>
          Another example o
          <Group>
            <BadgeQuestion variant="question" title="15" />
            <TextInput w={120} />
          </Group>
          in the countryside is{' '}
          <Group>
            <BadgeQuestion variant="question" title="15" />
            <TextInput w={120} />
          </Group>{' '}
          Kerosene lamps and conventional bulbs{' '}
          <Group>
            <BadgeQuestion variant="question" title="15" />
            <TextInput w={120} />
          </Group>
          It is unlikely that the Indian government will achieve its aim of connecting 112,000
          villages to electricity because many villages are GSBF lamps would be cheaper if it
          weren’t for Users need to wipe from the LED in order to keep it{' '}
          <Group>
            <BadgeQuestion variant="question" title="15" />
            <TextInput w={120} />
          </Group>{' '}
          working well.
        </Text>
      </Box>
      <Box w="100%" sx={{ flex: 1 }}>
        <Button my={4} h={25} fz={14} fw={400} variant="default" bg="rgba(189, 189, 189, 0.2)">
          affluent countries
        </Button>
        <Button my={4} h={25} fz={14} fw={400} variant="default" bg="rgba(189, 189, 189, 0.2)">
          not subject to much sunshine.
        </Button>
        <Button my={4} h={25} fz={14} fw={400} variant="default" bg="rgba(189, 189, 189, 0.2)">
          the oldest tree ever.
        </Button>
        <Button my={4} h={25} fz={14} fw={400} variant="default" bg="rgba(189, 189, 189, 0.2)">
          Ponderosa pines
        </Button>
        <Button my={4} h={25} fz={14} fw={400} variant="default" bg="rgba(189, 189, 189, 0.2)">
          visited by tourists
        </Button>
        <Button my={4} h={25} fz={14} fw={400} variant="default" bg="rgba(189, 189, 189, 0.2)">
          complicated
        </Button>
      </Box>
    </Box>
  );
};

export default Matching;
