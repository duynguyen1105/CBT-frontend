import { ActionIcon, Box, Center, Group, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import PageURL from 'apps/PageURL';
import defaultTheme from 'apps/theme';
import DOMPurify from 'dompurify';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LayoutComponent } from 'types/layout';
import { QUESTION_TYPE, QUESTION_TYPE_LABEL, QuestionType } from 'types/question';
import { DataTable, TableType } from 'views/components/base/dataTable';
import { ConfirmModal } from 'views/components/modal/confirmModal';
import { PreviewQuestionModal } from 'views/components/modal/previewQuestion';
import Shell from 'views/layout/Shell';

const { padding } = defaultTheme.layout;

const Questions: LayoutComponent = () => {
  const columns: DataTableColumn<TableType>[] = [
    { accessor: '_id', sortable: true, title: 'ID' },
    { accessor: 'title', sortable: true },
    {
      accessor: 'content',
      sortable: true,
      render: (data) => (
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }} />
      ),
    },
    {
      accessor: 'type',
      width: '10%',
      sortable: true,
      render: (data) => QUESTION_TYPE_LABEL[data.type as QUESTION_TYPE],
    },
    { accessor: 'category', width: '10%', sortable: true, title: 'Category' },
    {
      accessor: 'label',
      width: '10%',
      sortable: true,
      render: (data) => data.label?.join(', '),
    },
    {
      accessor: 'actions',
      title: <Center>Actions</Center>,
      textAlignment: 'right',
      render: (record: TableType) => (
        <Group spacing={4} position="center" noWrap>
          <ActionIcon
            color="cyan"
            onClick={() => {
              setIsPreviewModalOpened(true);
              setClickedQuestion(record as any);
            }}
          >
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon color="blue">
            <IconEdit
              size={16}
              onClick={() => navigate(PageURL.QUESTIONS_DETAIL.replace(':question_id', record._id))}
            />
          </ActionIcon>
          <ActionIcon
            color="red"
            onClick={() => {
              setDeleteModalOpened(true);
              setClickedQuestion(record as QuestionType);
            }}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  const navigate = useNavigate();
  const { workspace } = useGetUserInfo();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecord, setTotalRecord] = useState(1);
  const [sort, setSort] = useState('');
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [deleteQuestionModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedQuestion, setClickedQuestion] = useState<QuestionType | null>(null);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false);

  const deleteSelectedRecords = (records: TableType[]) => {
    deleteQuestions(records.map((user) => user._id));
  };

  const sortStatusChange = (status: DataTableSortStatus) => {
    setSort(Object.values(status).join(','));
    setPage(1);
  };

  const deleteQuestion = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.QUESTIONS.DELETE, { workspaceName: workspace, questionId: id }),
      'DELETE'
    );
    if (res.ok) {
      await fetchListQuestions();
      notifications.show({
        message: 'Delete question successfully',
        color: 'green',
      });
    }
    setDeleteModalOpened(false);
    setClickedQuestion(null);
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
      await fetchListQuestions();
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
      await fetchListQuestions();
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

  const fetchListQuestions = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.QUESTIONS.GET_LIST, { workspaceName: workspace, search, page, sort }),
      'GET'
    );

    if (res.ok) {
      setQuestions(res.data);
      setTotalRecord(res.total);
    }
  };

  const handleCreateQuestion = () => {
    navigate(PageURL.QUESTIONS_DETAIL.replace(':question_id', '-'));
  };

  useEffect(() => {
    fetchListQuestions();
  }, [search, page, sort]);

  return (
    <Box pb={padding}>
      <Text fw="bolder" mb="lg" fz="xl">
        Questions
      </Text>
      <DataTable
        records={questions}
        columns={columns}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        query={search}
        setQuery={setSearch}
        handleCreateNewRecord={handleCreateQuestion}
        handleDeleteSelectedRecords={deleteSelectedRecords}
        handleSortStatusChange={sortStatusChange}
      />
      <PreviewQuestionModal
        data={clickedQuestion}
        opened={isPreviewModalOpened}
        onClose={() => {
          setIsPreviewModalOpened(false);
          setClickedQuestion(null);
        }}
      />
      <ConfirmModal
        title="Delete question?"
        description="Are you sure you want to delete this question?"
        opened={deleteQuestionModalOpened}
        onClose={() => {
          setDeleteModalOpened(false);
          setClickedQuestion(null);
        }}
        onConfirm={() => clickedQuestion?._id && deleteQuestion(clickedQuestion?._id)}
      />
    </Box>
  );
};

Questions.layout = Shell;
Questions.displayName = 'Page.Questions';

export default Questions;
