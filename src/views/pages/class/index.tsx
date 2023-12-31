import { ActionIcon, Box, Center, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconEye, IconTrash } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';

import defaultTheme from 'apps/theme';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import { UserType } from 'types/user';

import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { DataTable, TableType } from 'views/components/base/dataTable';
import { ConfirmModal } from 'views/components/modal/confirmModal';
import { UserInfoModal } from 'views/components/modal/userInfoModal';
import Shell from 'views/layout/Shell';
import { CreateClassModal } from 'views/components/modal/createClassModal';
import { useNavigate } from 'react-router';
import PageURL from 'apps/PageURL';

const { padding } = defaultTheme.layout;

const ClassPage: LayoutComponent = () => {
  const navigate = useNavigate();
  const columns: DataTableColumn<TableType>[] = [
    { accessor: '_id', width: '20%', sortable: true, title: 'ID' },
    { accessor: 'name', sortable: true, title: 'Class name' },
    { accessor: 'description', sortable: true },
    {
      accessor: 'users',
      width: '5%',
      sortable: true,
      render: (record) => record.users?.length,
      title: 'Number of users',
    },
    {
      accessor: 'actions',
      title: <Center>Actions</Center>,
      width: '5%',
      textAlignment: 'right',
      render: (user) => (
        <Group spacing={4} position="center" noWrap>
          <ActionIcon
            color="blue"
            onClick={() => navigate(PageURL.CLASS_DETAIL.replace(':class_id', user._id))}
          >
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              setDeleteModalOpened(true);
              setClickedClass(user as UserType);
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
  const [deleteUserModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedClass, setClickedClass] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

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
      await fetchListUsers();
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

  const createUser = async (userData: UserType) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.REGISTER, { workspaceName: workspace }),
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

  const editUser = async (userData: UserType) => {
    if (!userData?._id) return;

    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.UPDATE, { workspaceName: workspace, userId: userData._id }),
      'PUT',
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
      getApiPath(PATHS.CLASSES.GET_LIST, { workspaceName: workspace, search, page, sort }),
      'GET'
    );

    if (res.ok) {
      setUsers(res.data);
      setTotalRecords(res.total);
    }
  };

  useEffect(() => {
    fetchListUsers();
  }, [search, page, sort]);

  return (
    <Box pb={padding}>
      <Text fw="bolder" mb="lg" fz="xl">
        Classes
      </Text>
      <DataTable
        records={users}
        columns={columns}
        page={page}
        setPage={setPage}
        query={search}
        totalRecord={totalRecords}
        setQuery={setSearch}
        handleCreateNewRecord={() => setCreateModalOpened(true)}
        handleDeleteSelectedRecords={deleteSelectedRecords}
        handleSortStatusChange={sortStatusChange}
      />
      <CreateClassModal
        opened={createModalOpened}
        onClose={() => {
          setCreateModalOpened(false);
          setClickedClass(null);
        }}
      />
      <ConfirmModal
        title="Delete user?"
        description="This action can not be undo! Are you sure you want to do this?"
        opened={deleteUserModalOpened}
        onClose={() => {
          setDeleteModalOpened(false);
          setClickedClass(null);
        }}
        onConfirm={() => clickedClass?._id && deleteUser(clickedClass._id)}
      />
    </Box>
  );
};

ClassPage.layout = Shell;
ClassPage.displayName = 'Page.ClassPage';

export default ClassPage;
