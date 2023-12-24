import { Box, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import defaultTheme from 'apps/theme';
import { useEffect } from 'react';
import { UserType } from 'types/user';
import { DataTable, TableType } from '../base/dataTable';
import { QuestionType } from 'types/question';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';

type Props = {
  opened: boolean;
  questions: QuestionType[];
  columns: DataTableColumn<TableType>[];
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
  columns,
  page,
  setPage,
  search,
  setSearch,
  totalRecord,
  sortStatusChange,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Add question" size="xl">
      <Box pb={padding}>
        <DataTable
          records={questions}
          columns={columns}
          page={page}
          setPage={setPage}
          query={search}
          setQuery={setSearch}
          totalRecord={totalRecord}
          isAdding
          handleAddRecord={(records) => {
            onConfirm?.(records as QuestionType[]);
            onClose();
          }}
          handleCreateNewRecord={() => null}
          handleDeleteSelectedRecords={() => null}
          handleSortStatusChange={sortStatusChange}
        />
      </Box>
    </Modal>
  );
};
