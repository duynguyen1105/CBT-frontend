import {Flex, Text, TextInput} from '@mantine/core';
import {IconCirclePlus, IconSearch, IconStack2} from '@tabler/icons-react';
import {DataTableColumn, DataTableSortStatus, DataTable as MDataTable} from 'mantine-datatable';
import {useState} from 'react';
import Button from '../Button';

type Props<T> = {
  columns: DataTableColumn<T>[];
  records: T[];
  page: number;
  query: string;
  setPage: (p: number) => void;
  setQuery: (q: string) => void;
  handleSortStatusChange: (status: DataTableSortStatus) => void;
  handleDeleteSelectedRecords: (records: TableType[]) => void;
  handleCreateNewRecord: () => void;
};
export type TableType = {[key in string]: string};

const PAGE_SIZE = 100;

export const DataTableQuestions = ({
  columns,
  records,
  page,
  query,
  setPage,
  setQuery,
  handleSortStatusChange,
  handleDeleteSelectedRecords,
  handleCreateNewRecord,
}: Props<TableType>) => {
  const [selectedRecords, setSelectedRecords] = useState<TableType[]>([]);

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'name',
    direction: 'asc',
  });

  const onSortStatusChange = (status: DataTableSortStatus) => {
    handleSortStatusChange(status);
    setSortStatus(status);
  };

  return (
    <Flex gap="lg" direction="column">
      <Flex gap={16} justify="space-between">
        <Flex gap={16} w="80%">
          <TextInput
            sx={{flexBasis: '60%'}}
            placeholder="Search here..."
            icon={<IconSearch size={16} />}
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
          />
          <Button
            w="max-content"
            variant="outline"
            leftIcon={<IconStack2 size={16} />}
            color="green"
            disabled={!selectedRecords.length}
            onClick={() => handleDeleteSelectedRecords(selectedRecords)}
          >
            <Text weight={400}>
              {selectedRecords.length
                ? `${
                    selectedRecords.length === 1
                      ? 'One selected question'
                      : `${selectedRecords.length} selected questions`
                  }`
                : 'Select questions to add'}
            </Text>
          </Button>
        </Flex>
        <Button
          onClick={handleCreateNewRecord}
          w="max-content"
          leftIcon={<IconCirclePlus size={16} />}
        >
          Create
        </Button>
      </Flex>

      <MDataTable<{[key in string]: string}>
        records={records}
        columns={columns}
        withBorder
        withColumnBorders
        striped
        sortStatus={sortStatus}
        onSortStatusChange={onSortStatusChange}
        noRecordsText="No records to show"
        page={page}
        onPageChange={setPage}
        totalRecords={1000}
        recordsPerPage={PAGE_SIZE}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
      />
    </Flex>
  );
};
