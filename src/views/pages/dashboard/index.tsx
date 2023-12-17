import React from 'react';
import { ActionIcon, Box, Card, Grid, Group, Select, Text, useMantineTheme } from '@mantine/core';

import {
  IconUsers,
  IconMapPinFilled,
  IconMicrophone,
  IconGiftCard,
  IconDots,
  IconColorPicker,
  IconPaperclip,
  IconMessage2,
  IconEyeFilled,
} from '@tabler/icons-react';

import { LayoutComponent } from 'types/layout';
import defaultTheme from 'apps/theme';

import Shell from 'views/layout/Shell';
import Title from 'views/components/base/Title';
import BarChart from 'views/components/charts/BarChart';
import StatisticItem from 'views/components/layout/StatisticItem';
import GaugeChart from 'views/components/charts/GaugeChart';

const { padding } = defaultTheme.layout;

const Dashboard: LayoutComponent = () => {
  const theme = useMantineTheme();

  return (
    <Box pb={padding}>
      <Group style={{ justifyContent: 'space-between' }} mb={20}>
        <Title order={3}>Orverview</Title>
        <Select
          data={[
            { label: 'This month', value: 'This month' },
            { label: 'Last month', value: 'Last month' },
            { label: 'Six month', value: 'Six month' },
            { label: 'Last year', value: 'Last year' },
          ]}
        />
      </Group>
      <Grid gutter={padding}>
        <Grid.Col md={3}>
          <StatisticItem icon={<IconUsers size={36} />} value="10,495" title="New members" />
        </Grid.Col>
        <Grid.Col md={3}>
          <StatisticItem
            icon={<IconMapPinFilled size={36} />}
            value="30,942"
            title="Places added"
          />
        </Grid.Col>
        <Grid.Col md={3}>
          <StatisticItem
            icon={<IconMicrophone size={36} />}
            value="45,269"
            title="Support members"
          />
        </Grid.Col>
        <Grid.Col md={3}>
          <StatisticItem icon={<IconGiftCard size={36} />} value="20,965" title="Tags used" />
        </Grid.Col>
      </Grid>
      <Card mt={padding}>
        <Card.Section px={20} py={padding / 2} bg={theme.colors.gray[8]}>
          <Group style={{ justifyContent: 'space-between' }}>
            <Text>Statistics</Text>
            <ActionIcon radius="xl" p={10} size="xl">
              <IconDots size={padding} />
            </ActionIcon>
          </Group>
        </Card.Section>
        <Box h={400} w="100%" py={padding / 2}>
          <BarChart
            categories={['2021', '2022', '2023']}
            collection={['Matcha Latte', 'Milk Tea', 'Cheese Cocoa', 'Walnut Brownie']}
            grid={false}
            data={[
              [43.3, 85.8, 93.7],
              [83.1, 73.4, 55.1],
              [86.4, 65.2, 82.5],
              [72.4, 53.9, 39.1],
            ]}
          />
        </Box>
      </Card>
      <Grid gutter={padding} mt={padding}>
        <Grid.Col md={4}>
          <Grid gutter={padding}>
            <Grid.Col span={6}>
              <StatisticItem
                direction="col"
                icon={<IconColorPicker size={28} />}
                value={48}
                title="New Posts"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatisticItem
                direction="col"
                icon={<IconPaperclip size={28} />}
                value={291}
                title="Attached Files"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatisticItem
                direction="col"
                icon={<IconMessage2 size={28} />}
                value={291}
                title="Comments"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <StatisticItem
                direction="col"
                icon={<IconEyeFilled size={28} />}
                value={110}
                title="Total Views"
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col md={4}>
          <Card radius="md">
            <Card.Section px={20} py={10} bg={theme.colors.gray[8]}>
              <Group style={{ justifyContent: 'space-between' }}>
                <Text>Statistics</Text>
                <ActionIcon radius="xl" p={10} size="xl">
                  <IconDots size={padding} />
                </ActionIcon>
              </Group>
            </Card.Section>
            <Box h={300} w="100%" py={padding / 2}>
              <GaugeChart data={[]} collection={[]} categories={[]} />
            </Box>
          </Card>
        </Grid.Col>
        <Grid.Col md={4}>
          <Card radius="md">
            <Card.Section>
              <Title order={5}>Followers</Title>
            </Card.Section>
            <Box h={100} w="100%" p={padding}></Box>
          </Card>
          <Card radius="md" mt={padding}>
            <Card.Section>
              <Title order={5}>Followers</Title>
            </Card.Section>
            <Box h={100} w="100%" p={padding}></Box>
          </Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

Dashboard.layout = Shell;
Dashboard.displayName = 'Page.Home';

export default Dashboard;
