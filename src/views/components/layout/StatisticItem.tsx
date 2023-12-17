import { Box, createStyles, Group, Text } from '@mantine/core';
import React, { forwardRef, ReactNode } from 'react';
import MainCard from '../base/MainCard';
import Title from '../base/Title';

export interface StatisticItemProps {
  icon: ReactNode;
  value: ReactNode;
  title: ReactNode;
  color?: string;
  direction?: 'row' | 'col';
  className?: string;
}

interface StatisticItemStyle {
  direction: 'row' | 'col';
}

const useStyle = createStyles<string, StatisticItemStyle>((_, { direction }) => ({
  group: {
    alignItems: 'flex-start',
    ...(direction === 'col' && {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      '.mantine-StatisticItem-title,.mantine-StatisticItem-value': {
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
        textAlign: 'center',
      },
    }),
  },
}));

const StatisticItem = forwardRef<HTMLDivElement, StatisticItemProps>(function StatisticItem(
  props,
  ref
) {
  const { icon, value, title, color, direction = 'row', className } = props;
  const { classes } = useStyle({ direction }, { name: 'StatisticItem' });

  return (
    <MainCard ref={ref} p={20} className={className}>
      <Group className={classes.group}>
        {icon}
        <Box className="mantine-StatisticItem-data">
          <Title order={3} size={28} mt={-6} c={color} className="mantine-StatisticItem-title">
            {value}
          </Title>
          <Text className="mantine-StatisticItem-value">{title}</Text>
        </Box>
      </Group>
    </MainCard>
  );
});

StatisticItem.displayName = 'StatisticItem';
export default StatisticItem;
