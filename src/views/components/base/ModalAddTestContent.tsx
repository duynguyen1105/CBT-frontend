import { Box, Button, Menu } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { QUESTION_TYPE, QUESTION_TYPE_LABEL, QuestionType } from 'types/question';
import { AddQuestionsToTestModal } from '../modal/addQuestionsToTest';
import { TableType } from './dataTable';
import { AutoAddQuestionsTest } from '../modal/autoAddQuestionsTest';

type ModalAddTestContentProps = {
  onConfirm?: (data: QuestionType[]) => void;
};

function ModalAddTestContent({ onConfirm }: ModalAddTestContentProps) {
  const { workspace } = useGetUserInfo();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecord, setTotalRecord] = useState(1);
  const [sort, setSort] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isOpenAddManualModal, setIsOpenAddManualModal] = useState(false);
  const [isOpenAutoAddModal, setIsOpenAutoAddModal] = useState(false);

  const sortStatusChange = (status: DataTableSortStatus) => {
    setSort(Object.values(status).join(','));
    setPage(1);
  };

  useEffect(() => {
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
    fetchListQuestions();
  }, [search, page, sort, workspace]);

  return (
    <Box>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button variant="outline" color="green" rightIcon={<IconCirclePlus strokeWidth={1.5} />}>
            Add More Questions
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item onClick={() => setIsOpenAddManualModal(true)}>
            Add questions manually
          </Menu.Item>
          <Menu.Item onClick={() => setIsOpenAutoAddModal(true)}>Auto generate questions</Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <AddQuestionsToTestModal
        opened={isOpenAddManualModal}
        onClose={() => setIsOpenAddManualModal(false)}
        onConfirm={(records) => {
          onConfirm?.(records as QuestionType[]);
        }}
        questions={questions}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        totalRecord={totalRecord}
        sortStatusChange={sortStatusChange}
      />

      <AutoAddQuestionsTest
        opened={isOpenAutoAddModal}
        onClose={() => setIsOpenAutoAddModal(false)}
        onConfirm={(records) => {
          onConfirm?.(records as QuestionType[]);
        }}
      />
    </Box>
  );
}

export default ModalAddTestContent;
