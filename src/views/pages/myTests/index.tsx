import { ActionIcon, Box, Center, Divider, Flex, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import PageURL from 'apps/PageURL';
import defaultTheme from 'apps/theme';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'store';
import { LayoutComponent } from 'types/layout';
import { QuestionType } from 'types/question';
import { DataTable, TableType } from 'views/components/base/dataTable';
import { PreviewQuestionModal } from 'views/components/modal/previewQuestion';
import Shell from 'views/layout/Shell';
import { TestCard } from './TestCard';
import { TEST_STATUS, TestType } from '../../../types/test';

const { padding } = defaultTheme.layout;

const MyTest: LayoutComponent = () => {
  const columns: DataTableColumn<TableType>[] = [
    { accessor: '_id', sortable: true, title: 'ID' },
    { accessor: 'title', sortable: true },
    { accessor: 'description', sortable: true },

    {
      accessor: 'timeSetting',
      sortable: true,
      render: (record) =>
        new Date(record.timeSetting.startTime).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      title: 'Start time',
    },
    {
      accessor: 'timeSetting',
      sortable: true,
      render: (record) =>
        new Date(record.timeSetting.finishTime).toLocaleString('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      title: 'Finish time',
    },
    {
      accessor: 'timeSetting',
      sortable: true,
      render: (record) => `${record.timeSetting.duration} minutes`,
      title: 'Duration',
    },

    {
      accessor: 'actions',
      title: <Center>Actions</Center>,
      textAlignment: 'right',
      render: (record: TableType) => (
        <Group spacing={4} position="center" noWrap>
          <ActionIcon color="blue">
            <IconEdit
              size={16}
              onClick={() => navigate(PageURL.TESTS_DETAIL.replace(':test_id', record._id))}
            />
          </ActionIcon>
          <ActionIcon color="red">
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  const navigate = useNavigate();
  const { workspace } = useSelector((state) => state.app.userInfo);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecord, setTotalRecord] = useState(1);
  const [sort, setSort] = useState('');
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [deleteUserModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedQuestion, setClickedQuestion] = useState<QuestionType | null>(null);
  const [tests, setTests] = useState<TestType[]>([]);
  const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false);

  const deleteSelectedRecords = (records: TableType[]) => {
    deleteQuestions(records.map((user) => user._id));
  };

  const sortStatusChange = (status: DataTableSortStatus) => {
    setSort(Object.values(status).join(','));
    setPage(1);
  };

  const deleteTest = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.TESTS.DELETE, { workspaceName: workspace, questionId: id }),
      'DELETE'
    );
    if (res.ok) {
      await fetchListTests();
      notifications.show({
        message: 'Delete test successfully',
        color: 'green',
      });
    }
  };

  const deleteQuestions = async (ids: string[]) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.QUESTIONS.DELETE_MANY, { workspaceName: workspace }),
      'DELETE',
      {
        data: {
          ids,
        },
      }
    );
    if (res.ok) {
      notifications.show({
        message: 'Delete questions successfully',
        color: 'green',
      });
    }
  };

  const createQuestion = async (question: QuestionType) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.QUESTIONS.CREATE, { workspaceName: workspace }),
      'POST',
      {
        data: question,
      }
    );

    if (res.ok) {
      await fetchListTests();
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

  const editQuestion = async (questionData: QuestionType) => {
    if (!questionData?._id) return;

    const res = await callApiWithAuth(
      getApiPath(PATHS.USERS.UPDATE, { workspaceName: workspace, questionId: questionData._id }),
      'PUT',
      {
        data: questionData,
      }
    );

    if (res.ok) {
      await fetchListTests();
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

  const fetchListTests = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.TESTS.GET_LIST, { workspaceName: workspace, search, page, sort }),
      'GET'
    );

    if (res.ok) {
      setTests(res.data);
      setTotalRecord(res.total);
    }
  };

  const handleCreateTest = () => {
    navigate(PageURL.TESTS_DETAIL.replace(':question_id', '-'));
  };

  useEffect(() => {
    fetchListTests();
  }, [search, page, sort]);
  console.log(tests);

  return (
    <Box pb={padding}>
      <Box>
        <Text size="25px" color="cyan" my="md">
          On Going
        </Text>
        <Flex align="center" wrap="wrap" gap="lg">
          {tests
            .filter(
              (test) =>
                new Date(test.timeSetting.startTime) < new Date() &&
                new Date(test.timeSetting.finishTime) > new Date()
            )
            .map((test) => (
              <TestCard test={test} status={TEST_STATUS.ONGOING} />
            ))}
        </Flex>
      </Box>

      <Divider m={20} />

      <Box>
        <Text size="25px" my="md" color="teal">
          Upcoming
        </Text>
        <Flex align="center" wrap="wrap" gap="lg">
          {tests
            .filter((test) => new Date(test.timeSetting.startTime) > new Date())
            .map((test) => (
              <TestCard test={test} status={TEST_STATUS.UPCOMING} />
            ))}
        </Flex>
      </Box>

      <Divider m={20} />

      <Box>
        <Text size="25px" my="md" color="orange">
          Finished
        </Text>
        <Flex align="center" wrap="wrap" gap="lg">
          {tests
            .filter((test) => new Date(test.timeSetting.finishTime) < new Date())
            .map((test) => (
              <TestCard test={test} status={TEST_STATUS.FINISHED} />
            ))}
        </Flex>
      </Box>
    </Box>
  );
};

MyTest.layout = Shell;
MyTest.displayName = 'Page.MyTest';

export default MyTest;