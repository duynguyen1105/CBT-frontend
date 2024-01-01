import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight, TablerIconsProps } from '@tabler/icons-react';
import { FC } from 'react';
import classes from './StatsGrid.module.css';

interface Stat {
  title: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  value: string;
  diff: number;
}

interface StatsGridProps {
  data: Stat[];
}

const StatsGrid: FC<StatsGridProps> = (props) => {
  const { data } = props;
  const stats = data.map((stat) => {
    const Icon = stat.icon;
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group>
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={1}
        breakpoints={[
          { maxWidth: 'sm', cols: 1, spacing: 'sm' },
          { maxWidth: 'md', cols: 2, spacing: 'md' },
          { cols: 4, spacing: 'lg' },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
};

export default StatsGrid;
