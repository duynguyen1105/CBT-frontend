import { Box, Button, Flex, Grid, SimpleGrid, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconBook, IconFileDescription, IconStack2, IconUser } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import { WorkspaceType } from 'types/workspace';
import Shell from 'views/layout/Shell';
import { BarChart } from './components/Barchart';
import { DoughnutChart } from './components/DoughnutChart';
import { MultilineChart } from './components/MultilineChart';
import StatsGrid from './components/StatsGrid';
import fakeDataTable from './fakeDataTable.json';

const { padding } = defaultTheme.layout;

const Workspace: LayoutComponent = () => {
  const { workspace } = useGetUserInfo();
  const form = useForm<WorkspaceType>();

  const [workspaceInfo, setWorkspaceInfo] = useState<WorkspaceType>();

  const handleSubmit = async (values: WorkspaceType) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.WORKSPACES.GET_DETAIL, { workspaceName: workspace }),
      'PUT',
      {
        data: values,
      }
    );

    if (res.ok) {
      fetchWorkspaceDetail();
      notifications.show({
        message: 'Update lesson successfully',
        color: 'green',
      });
    } else {
      notifications.show({
        message: res.message,
        color: 'red',
      });
    }
  };

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
  }, [workspace]);

  useEffect(() => {
    if (workspaceInfo) {
      form.setValues(workspaceInfo);
    }
  }, [workspaceInfo]);

  if (!workspaceInfo) return null;

  const statsGridData = [
    { title: 'Total Students', icon: IconUser, value: '13,456', diff: 34 },
    { title: 'Total Courses', icon: IconFileDescription, value: '188', diff: -30 },
    { title: 'Engaged in at least one course', icon: IconStack2, value: '4,145', diff: -13 },
    { title: 'Attempted at least one exam', icon: IconBook, value: '745', diff: 18 },
  ];

  return (
    <Box pb={padding}>
      <Box mb="lg">
        <Title order={3}>Information</Title>
        <Box px={padding}>
          <form onSubmit={form.onSubmit(handleSubmit)}>
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
                  value={workspaceInfo.ownerWorkspace?.email}
                  readOnly
                  disabled
                />
              </Box>
            </Flex>
            <Button type="submit" variant="light" color="blue" mt="md">
              Update
            </Button>
          </form>
        </Box>
      </Box>

      <Title order={3}>Workspace Overview</Title>

      <Box px={padding} mt="sm">
        <StatsGrid data={statsGridData} />
        <SimpleGrid
          breakpoints={[
            { maxWidth: 'sm', cols: 1, spacing: 'sm' },
            { cols: 2, spacing: 'lg' },
          ]}
          spacing="xl"
          mt="sm"
        >
          <Box p={10} sx={{ border: '1px solid #dee2e6', borderRadius: '0.5rem' }}>
            <Title pb={10} order={6}>
              Total Users, Questions and Tests
            </Title>
            <BarChart
              info={[
                workspaceInfo.totalUsers,
                workspaceInfo.totalQuestions,
                workspaceInfo.totalTests,
              ]}
            />
          </Box>
          <Box p={10} sx={{ border: '1px solid #dee2e6', borderRadius: '0.5rem' }}>
            <Title pb={10} order={6}>
              New Users vs New Questions vs New Tests
            </Title>
            <MultilineChart />
          </Box>
        </SimpleGrid>
        <Grid gutter="xl" mt="sm">
          <Grid.Col md={3}>
            <Box
              p={10}
              sx={{ border: '1px solid #dee2e6', borderRadius: '0.5rem', height: '100%' }}
            >
              <Title pb={10} order={6}>
                Utilisation %
              </Title>
              <DoughnutChart />
            </Box>
          </Grid.Col>
          <Grid.Col md={9}>
            <Box p={10} sx={{ border: '1px solid #dee2e6', borderRadius: '0.5rem' }}>
              <Title pb={10} order={6}>
                Courses
              </Title>
              <DataTable
                columns={[
                  { accessor: 'title' },
                  { accessor: 'watched' },
                  { accessor: 'spent' },
                  { accessor: 'rating' },
                  { accessor: 'avgRating' },
                ]}
                records={fakeDataTable}
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

Workspace.layout = Shell;
Workspace.displayName = 'Page.Workspace';

export default Workspace;
