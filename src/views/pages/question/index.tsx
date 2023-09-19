import { ActionIcon, Box, Center, Group } from '@mantine/core';
import { IconCheck, IconEdit, IconTrash, IconX } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import PageURL from 'apps/PageURL';
import defaultTheme from 'apps/theme';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { LayoutComponent } from 'types/layout';
import { IQuestionListItem } from 'types/question';
import { TableType } from 'views/components/base/dataTable';
import { DataTableQuestions } from 'views/components/base/dataTable/DataTableQuestions';
import Shell from 'views/layout/Shell';

const { padding } = defaultTheme.layout;

const Questions: LayoutComponent = () => {
  const columns: DataTableColumn<TableType>[] = [
    { accessor: 'id', width: '10%', sortable: true },
    { accessor: 'content', width: '30%', sortable: true },
    { accessor: 'type', width: '15%', sortable: true },
    { accessor: 'category_id', width: '15%', sortable: true, title: 'Category' },
    { accessor: 'level', width: '15%', sortable: true },
    { accessor: 'score', width: '15%', sortable: true },
    {
      accessor: 'active',
      title: <Center>Active</Center>,
      render: ({ active }) => <Center>{active === 'Y' ? <IconCheck color="green" /> : <IconX color="red" />}</Center>,
    },
    {
      accessor: 'actions',
      title: <Center>Actions</Center>,
      textAlignment: 'right',
      render: (record: TableType) => (
        <Group spacing={4} position="center" noWrap>
          <ActionIcon color="blue" onClick={handleEditRecord(record)}>
            <IconEdit size={16} />
          </ActionIcon>
          <ActionIcon color="red" onClick={handleDeleteRecord(record)}>
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [questions, setQuestions] = useState<IQuestionListItem[]>([]);
  const navigate = useNavigate();
  const handleDeleteSelectedRecords = (records: TableType[]) => {
    console.log(records);
  };
  const handleCreateQuestion = () => {
    navigate(PageURL.QUESTIONS_DETAIL.replace(':question_id', '-'));
  };

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    console.log(status);
    setPage(1);
  };

  const fetchListQuestion = async () => {
    const res = await callApiWithAuth(getApiPath(PATHS.QUESTIONS.GET_LIST), 'GET');
    console.log(getApiPath(PATHS.QUESTIONS.GET_LIST));

    if (res) {
      setQuestions(res.data);
    }
  };

  useEffect(() => {
    fetchListQuestion();
  }, []);

  const handleEditRecord = (record: TableType) => () => {
    navigate(PageURL.QUESTIONS_DETAIL.replace(':question_id', record.id));
  };
  const handleDeleteRecord = (record: TableType) => () => {
    console.log(record);
  };
  return (
    <Box pb={padding}>
      <DataTableQuestions
        records={questions}
        columns={columns}
        page={page}
        setPage={setPage}
        query={query}
        setQuery={setQuery}
        handleCreateNewRecord={handleCreateQuestion}
        handleDeleteSelectedRecords={handleDeleteSelectedRecords}
        handleSortStatusChange={handleSortStatusChange}
      />
    </Box>
  );
};

Questions.layout = Shell;
Questions.displayName = 'Page.Questions';

export default Questions;
