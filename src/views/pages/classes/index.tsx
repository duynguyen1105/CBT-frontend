import {ActionIcon, Grid, Group} from '@mantine/core';
import {IconEdit, IconHome2, IconTrash} from '@tabler/icons-react';
import {PATHS} from 'api/paths';
import {callApiWithAuth, getApiPath} from 'api/utils';
import PageURL from 'apps/PageURL';
import {DataTableSortStatus} from 'mantine-datatable';
import {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {Class} from 'types/class';
import Breadcrumb, {DataBreadcrumb} from 'views/components/base/Breadcrumb';
import Text from 'views/components/base/Text';
import {DataTable} from 'views/components/base/dataTable';
import {CreateClassModal} from 'views/components/modal/createClassModal';

const Classes: FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [createModalOpened, setCreateModalOpened] = useState(false);

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'name',
    direction: 'asc',
  });

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    console.log(status);
    setPage(1);
    setSortStatus(status);
  };

  const breadcrumb: DataBreadcrumb[] = [
    {
      title: <IconHome2 color="#E1000A" size={24} />,
      href: '/',
    },
    {
      title: 'List',
      href: PageURL.CLASSES,
    },
  ];

  const handleChangePageCreateClasses = () => {
    setCreateModalOpened(true);
  };

  const fetchListClasses = async () => {
    const res = await callApiWithAuth(getApiPath(PATHS.WORKSPACES.GET_LIST_CLASSES), 'GET');

    if (res) {
      setClasses(res.data);
    }
  };

  useEffect(() => {
    fetchListClasses();
  }, []);

  return (
    <Grid>
      <Grid.Col
        h="64px"
        w="100%"
        bg="#fff"
        span={12}
        sx={{display: 'flex', alignItems: 'center', borderRadius: 5}}
      >
        <Text pr={13} fz={20} fw={700} sx={{borderRight: '1px solid #CECECE'}}>
          My Classes
        </Text>

        <Breadcrumb data={breadcrumb} />
      </Grid.Col>

      <Grid.Col h="100%" span={12} bg="#fff">
        <CreateClassModal opened={createModalOpened} onClose={() => setCreateModalOpened(false)} />
        <DataTable
          records={classes}
          columns={[
            {accessor: 'id', width: '15%', sortable: true},
            {accessor: 'title', width: '25%', sortable: true},
            {accessor: 'description', width: '30%', sortable: true},
            {accessor: 'date_start', width: '12%', sortable: true},
            {accessor: 'date_end', width: '12%', sortable: true},
            {
              accessor: 'actions',
              title: <Text mr="xs">Actions</Text>,
              textAlignment: 'right',
              render: (item) => (
                <Group spacing={4} position="center" noWrap>
                  <ActionIcon color="blue" onClick={() => console.log(item)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => console.log(item)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              ),
            },
          ]}
          page={page}
          setPage={setPage}
          query={query}
          setQuery={setQuery}
          handleCreateNewRecord={handleChangePageCreateClasses}
          handleDeleteSelectedRecords={() => null}
          handleSortStatusChange={() => null}
        />
      </Grid.Col>
    </Grid>
  );
};

export default Classes;
