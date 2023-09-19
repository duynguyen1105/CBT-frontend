import { ActionIcon, Box, Center, Group } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';

import defaultTheme from 'apps/theme';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import { UserType } from 'types/user';

import { DataTable, TableType } from 'views/components/base/dataTable';
import { UserInfoModal } from 'views/components/modal/userInfoModal';
import Shell from 'views/layout/Shell';

const { padding } = defaultTheme.layout;

const Users: LayoutComponent = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [clickedUser, setClickedUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

  const columns: DataTableColumn<TableType>[] = [
    { accessor: '_id', width: '20%', sortable: true, title: 'ID' },
    { accessor: 'name', sortable: true, title: 'Full name' },
    { accessor: 'email', sortable: true },
    { accessor: 'gender', width: '5%', sortable: true },
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
              setClickedUser(user as UserType);
            }}
          >
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => deleteUser(user._id)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  const deleteSelectedRecords = (records: TableType[]) => {
    deleteUsers(records.map((user) => user._id));
  };

  const sortStatusChange = (status: DataTableSortStatus) => {
    console.log(status);
    setPage(1);
  };

  const deleteUser = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.DELETE, { workspaceName: 'ws1', userId: id }),
      'DELETE'
    );
    if (res.ok) {
      await fetchListUsers();
      notifications.show({
        message: 'Delete users successfully',
        color: 'green',
      });
    }
  };

  const deleteUsers = async (ids: string[]) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.DELETE_MANY, { workspaceName: 'ws1' }),
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

  const createUser = async (userData: UserType) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.REGISTER, { workspaceName: 'ws1' }),
      'POST',
      {
        data: userData,
      }
    );

    if (res.ok) {
      await fetchListUsers();
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

  const fetchListUsers = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.GET_LIST, { workspaceName: 'ws1' }),
      'GET'
    );

    if (res.ok) {
      setUsers(res.data);
    }
  };

  useEffect(() => {
    fetchListUsers();
  }, []);

  return (
    <Box pb={padding}>
      <DataTable
        records={users}
        columns={columns}
        page={page}
        setPage={setPage}
        query={query}
        setQuery={setQuery}
        handleCreateNewRecord={() => setCreateModalOpened(true)}
        handleDeleteSelectedRecords={deleteSelectedRecords}
        handleSortStatusChange={sortStatusChange}
      />
      <UserInfoModal
        opened={createModalOpened}
        onClose={() => {
          setCreateModalOpened(false);
          setClickedUser(null);
        }}
        onSubmit={createUser}
        userData={clickedUser}
      />
    </Box>
  );
};

Users.layout = Shell;
Users.displayName = 'Page.User';

export default Users;
