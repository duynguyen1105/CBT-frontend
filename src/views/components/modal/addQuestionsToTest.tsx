import { ActionIcon, Center, Group, Modal } from '@mantine/core';
import { IconEdit, IconEye, IconTrash } from '@tabler/icons-react';
import PageURL from 'apps/PageURL';
import defaultTheme from 'apps/theme';
import DOMPurify from 'dompurify';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { QUESTION_TYPE, QUESTION_TYPE_LABEL, QuestionType } from 'types/question';
import { PreviewQuestionModal } from 'views/components/modal/previewQuestion';
import { DataTable, TableType } from '../base/dataTable';
import { useState } from 'react';

type Props = {
  opened: boolean;
  questions: QuestionType[];
  page: number;
  setPage: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  totalRecord: number;
  sortStatusChange: (status: DataTableSortStatus) => void;
  onClose: () => void;
  onConfirm: (data: QuestionType[]) => void;
};

const { padding } = defaultTheme.layout;

export const AddQuestionsToTestModal = ({
  opened,
  questions,
  page,
  setPage,
  search,
  setSearch,
  totalRecord,
  sortStatusChange,
  onClose,
  onConfirm,
}: Props) => {
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
        </Group>
      ),
    },
  ];

  const [clickedQuestion, setClickedQuestion] = useState<QuestionType | null>(null);
  const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false);

  return (
    <Modal opened={opened} onClose={onClose} title="Add question" size="xxl">
      <DataTable
        records={questions}
        columns={columns}
        page={page}
        setPage={setPage}
        totalRecord={totalRecord}
        query={search}
        setQuery={setSearch}
        // isNotCreateAndDelete
        isAdding
        handleCreateNewRecord={() => null}
        handleDeleteSelectedRecords={() => null}
        handleSortStatusChange={sortStatusChange}
        // isAdding
        handleAddRecord={(records) => {
          onConfirm?.(records as QuestionType[]);
          onClose();
        }}
      />
      <PreviewQuestionModal
        data={clickedQuestion}
        opened={isPreviewModalOpened}
        onClose={() => {
          setIsPreviewModalOpened(false);
          setClickedQuestion(null);
        }}
      />
    </Modal>
  );
};
