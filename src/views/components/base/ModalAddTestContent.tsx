import { Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCirclePlus } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { QUESTION_TYPE, QUESTION_TYPE_LABEL, QuestionType } from 'types/question';
import { DataTable, TableType } from './dataTable';
import { AddQuestionsToTestModal } from '../modal/addQuestionsToTest';

const { padding } = defaultTheme.layout;

type ModalAddTestContentProps = {
  onConfirm?: (data: QuestionType[]) => void;
};

function ModalAddTestContent({ onConfirm }: ModalAddTestContentProps) {
  const columns: DataTableColumn<TableType>[] = [
    { accessor: '_id', sortable: true, title: 'ID' },
    { accessor: 'title', sortable: true },
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
  ];

  const { workspace } = useGetUserInfo();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecord, setTotalRecord] = useState(1);
  const [sort, setSort] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const deleteSelectedRecords = (records: TableType[]) => {
    deleteQuestions(records.map((user) => user._id));
  };

  const sortStatusChange = (status: DataTableSortStatus) => {
    setSort(Object.values(status).join(','));
    setPage(1);
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

  useEffect(() => {
    fetchListQuestions();
  }, [search, page, sort]);

  return (
    <Box>
      <Button
        variant="outline"
        color="green"
        rightIcon={<IconCirclePlus size={20} />}
        onClick={() => setIsOpenModal(true)}
      >
        Add More Question
      </Button>
      <AddQuestionsToTestModal
        opened={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        onConfirm={(records) => {
          onConfirm?.(records as QuestionType[]);
        }}
        questions={questions}
        columns={columns}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        totalRecord={totalRecord}
        sortStatusChange={sortStatusChange}
      />
    </Box>
  );
}

export default ModalAddTestContent;
