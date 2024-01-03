import { ActionIcon, Box, Center, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import { UserType } from 'types/user';
import { WorkspaceType } from 'types/workspace';
import { DataTable, TableType } from 'views/components/base/dataTable';
import { ConfirmModal } from 'views/components/modal/confirmModal';
import { WorkspaceInfoModal } from 'views/components/modal/workspaceInfoModal';
import Shell from 'views/layout/Shell';

const { padding } = defaultTheme.layout;

const Workspaces: LayoutComponent = () => {
  const columns: DataTableColumn<TableType>[] = [
    { accessor: '_id', width: '20%', sortable: true, title: 'ID' },
    { accessor: 'name', sortable: true, title: 'Workspace name' },
    { accessor: 'domain', sortable: true, title: 'Workspace domain' },
    { accessor: 'totalUsers', sortable: true },
    { accessor: 'totalQuestions', sortable: true },
    { accessor: 'totalTests', sortable: true },
    {
      accessor: 'actions',
      title: <Center>Actions</Center>,
      width: '5%',
      textAlignment: 'right',
      render: (user) => (
        <Group spacing={4} position="center" noWrap>
          <ActionIcon
            color="blue"
            onClick={() => {
              setCreateModalOpened(true);
              setClickedWorkspace(user as WorkspaceType);
            }}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              setDeleteModalOpened(true);
              setClickedWorkspace(user as WorkspaceType);
            }}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  const { workspace } = useGetUserInfo();

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [deleteWorkspaceModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedWorkspace, setClickedWorkspace] = useState<WorkspaceType | null>(null);
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);

  const deleteSelectedRecords = (records: TableType[]) => {
    deleteUsers(records.map((user) => user._id));
  };

  const sortStatusChange = (status: DataTableSortStatus) => {
    setSort(Object.values(status).join(','));
    setPage(1);
  };

  const deleteUser = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.DELETE, { workspaceName: workspace, userId: id }),
      'DELETE'
    );
    if (res.ok) {
      await fetchListWorkspaces();
      notifications.show({
        message: 'Delete users successfully',
        color: 'green',
      });
    }
  };

  const deleteUsers = async (ids: string[]) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.DELETE_MANY, { workspaceName: workspace }),
      'DELETE',
      {
        data: {
          ids,
        },
      }
    );
    if (res.ok) {
      notifications.show({
        message: 'Delete users successfully',
        color: 'green',
      });
    }
  };

  const createWorkspace = async (workspaceData: WorkspaceType) => {
    const createWorkspaceRes = await callApiWithAuth(
      getApiPath(PATHS.WORKSPACES.CREATE_WORKSPACE),
      'POST',
      {
        data: workspaceData,
      }
    );
    if (createWorkspaceRes.ok) {
      await fetchListWorkspaces();
      notifications.show({
        message: 'Create workspace successfully',
        color: 'green',
      });
      setCreateModalOpened(false);
    } else {
      notifications.show({
        message: 'Create user failed',
        color: 'red',
      });
    }
  };

  const editUser = async (userData: WorkspaceType) => {
    if (!userData?._id) return;

    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.UPDATE, { workspaceName: workspace, userId: userData._id }),
      'PUT',
      {
        data: userData,
      }
    );

    if (res.ok) {
      await fetchListWorkspaces();
      notifications.show({
        message: 'Create user successfully',
        color: 'green',
      });
      setCreateModalOpened(false);
    } else {
      notifications.show({
        message: 'Create user failed',
        color: 'red',
      });
    }
  };

  const fetchListWorkspaces = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.WORKSPACES.GET_ALL_WORKSPACES, {
        search,
        page,
        sort,
      }),
      'GET'
    );

    if (res?.ok) {
      setWorkspaces(res.data);
      setTotalRecords(res.total);
    }
  };

  useEffect(() => {
    fetchListWorkspaces();
  }, [search, page, sort]);

  return (
    <Box pb={padding}>
      <Text fw="bolder" mb="lg" fz="xl">
        Workspaces
      </Text>
      <DataTable
        records={workspaces}
        columns={columns}
        page={page}
        setPage={setPage}
        query={search}
        totalRecord={totalRecords}
        setQuery={setSearch}
        handleCreateNewRecord={() => setCreateModalOpened(true)}
        handleDeleteSelectedRecords={deleteSelectedRecords}
        handleSortStatusChange={sortStatusChange}
        handleAddRecord={() => setCreateModalOpened(true)}
        isAdding
      />
      <WorkspaceInfoModal
        opened={createModalOpened}
        onClose={() => {
          setCreateModalOpened(false);
          setClickedWorkspace(null);
        }}
        onSubmit={clickedWorkspace ? editUser : createWorkspace}
        workspaceData={clickedWorkspace}
      />
      <ConfirmModal
        title="Delete workspace?"
        description="This action can not be undo! Are you sure you want to do this?"
        opened={deleteWorkspaceModalOpened}
        onClose={() => {
          setDeleteModalOpened(false);
          setClickedWorkspace(null);
        }}
        onConfirm={() => clickedWorkspace?._id && deleteUser(clickedWorkspace._id)}
      />
    </Box>
  );
};

Workspaces.layout = Shell;
Workspaces.displayName = 'Page.Workspaces';

export default Workspaces;
