import { Flex, Text } from '@mantine/core';
import { IconHourglassHigh } from '@tabler/icons-react';
import { useCountdown } from 'hooks/useCountdown';

export const Countdown = () => {
  const { time } = useCountdown();

  return (
    <Flex pos="fixed" right="20px" top="20px">
      <IconHourglassHigh />
      <Text>{time}</Text>
    </Flex>
  );
};
