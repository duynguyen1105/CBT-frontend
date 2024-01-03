import { Box, Grid, SimpleGrid, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  IconBook,
  IconFileDescription,
  IconStack2,
  IconUser,
  IconWorldWww,
} from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { useEffect, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import { WorkspaceType } from 'types/workspace';
import Shell from 'views/layout/Shell';
import { DoughnutChart } from '../workspace/components/DoughnutChart';
import { MultilineChart } from '../workspace/components/MultilineChart';
import StatsGrid from '../workspace/components/StatsGrid';

const { padding } = defaultTheme.layout;

const Overview: LayoutComponent = () => {
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

  const statsGridData = [
    { title: 'Total Workspaces', icon: IconWorldWww, value: '13,456', diff: 34 },
    { title: 'Total Users', icon: IconUser, value: '188', diff: -30 },
    { title: 'Total Questions', icon: IconStack2, value: '4,145', diff: -13 },
    { title: 'Total Tests', icon: IconBook, value: '745', diff: 18 },
  ];

  return (
    <Box pb={padding}>
      <Title order={3}>Overview</Title>

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
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
    </Box>
  );
};

Overview.layout = Shell;
Overview.displayName = 'Page.Overview';

export default Overview;
