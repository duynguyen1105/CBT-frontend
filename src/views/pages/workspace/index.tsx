import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { useEffect, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import { WorkspaceType } from 'types/workspace';
import Shell from 'views/layout/Shell';
import {
  Box,
  Title,
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
  rem,
  Flex,
  ThemeIcon,
  TextInput,
} from '@mantine/core';
import {
  IconArrowUpRight,
  IconArrowDownRight,
  IconUser,
  IconFileDescription,
  IconStack2,
} from '@tabler/icons-react';
import { LIMIT } from 'apps/constants';
import { useForm } from '@mantine/form';
const { padding } = defaultTheme.layout;

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const isCreatedThisMonth = (date: Date) => {
  const now = new Date();
  return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

const Workspace: LayoutComponent = () => {
  const { workspace } = useGetUserInfo();

  const [workspaceInfo, setWorkspaceInfo] = useState<WorkspaceType>();

  const fetchWorkspaceDetail = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.WORKSPACES.GET_DETAIL, { workspaceName: workspace }),
      'GET'
    );

    if (res?.ok) {
      setWorkspaceInfo(res.data);
    }
  };

  useEffect(() => {
    fetchWorkspaceDetail();
  }, []);

  const form = useForm<WorkspaceType>();

  useEffect(() => {
    if (workspaceInfo) {
      form.setValues(workspaceInfo);
    }
  }, [workspaceInfo]);

  if (!workspaceInfo) return null;

  const data = [
    {
      label: 'Total users',
      stats: workspaceInfo.totalUsers,
      progress: (workspaceInfo.totalUsers / LIMIT.USERS) * 100,
      color: 'teal',
      icon: IconUser,
    },
    {
      label: 'Total tests',
      stats: workspaceInfo.totalTests,
      progress: (workspaceInfo.totalTests / LIMIT.TESTS) * 100,
      color: 'blue',
      icon: IconFileDescription,
    },
    {
      label: 'Total questions',
      stats: workspaceInfo.totalQuestions,
      progress: (workspaceInfo.totalQuestions / LIMIT.QUESTIONS) * 100,
      color: 'red',
      icon: IconStack2,
    },
  ] as const;

  const thisMonthData = [
    { title: 'Users', value: 2, diff: 100 },
    { title: 'Tests', value: 5, diff: 50 },
    { title: 'Questions', value: 2, diff: -20 },
  ];

  const stats = data.map((stat) => {
    const Icon = stat.icon;
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  const thisMonthStats = thisMonthData.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group>
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
            {stat.diff}%
          </Text>{' '}
          {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <Box pb={padding}>
      <Box>
        <Title order={3}>Information</Title>
        <Box px={padding}>
          <form onSubmit={form.onSubmit(() => null)}>
            <Flex gap="md">
              <Box w="50%">
                <TextInput
                  label="Workspace name"
                  placeholder="Workspace name"
                  {...form.getInputProps('name')}
                />
                <TextInput
                  label="Workspace domain"
                  placeholder="Workspace domain"
                  {...form.getInputProps('domain')}
                />
                <TextInput
                  label="Created Date"
                  value={new Date(workspaceInfo.createdAt).toLocaleDateString()}
                  readOnly
                  disabled
                />
                <TextInput
                  label="Workspace owner"
                  value={workspaceInfo.ownerWorkspace.email}
                  readOnly
                  disabled
                />
              </Box>
            </Flex>

            {/* <Select
              data={[
                { value: 'MALE', label: 'Male' },
                { value: 'FEMALE', label: 'Female' },
              ]}
              label="Gender"
              placeholder="Gender"
              {...form.getInputProps('gender')}
            />
            <MultiSelect
              data={[
                { value: 'MALE', label: 'Male' },
                { value: 'FEMALE', label: 'Female' },
              ]}
              label="Role"
              placeholder="Role"
              {...form.getInputProps('role')}
            />
            <Group position="right" mt="md">
              <Button type="submit">{isCreateUserModal ? 'Create' : 'Update'}</Button>
            </Group> */}
          </form>
        </Box>
      </Box>
      <Box my="sm">
        <Title order={3}>Overview</Title>
        <Box px={padding}>
          <Text fz="lg" mt="md">
            Total
          </Text>
          <SimpleGrid cols={3} spacing="xl" mt="sm">
            {stats}
          </SimpleGrid>
          <Text fz="lg" mt="md">
            This month
          </Text>
          <SimpleGrid cols={3} spacing="xl" mt="sm">
            {thisMonthStats}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

Workspace.layout = Shell;
Workspace.displayName = 'Page.Workspace';

export default Workspace;
