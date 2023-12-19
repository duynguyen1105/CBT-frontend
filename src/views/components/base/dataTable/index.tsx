import { Flex, Text, TextInput } from '@mantine/core';
import { IconCirclePlus, IconSearch, IconTrash } from '@tabler/icons-react';
import { DataTableColumn, DataTableSortStatus, DataTable as MDataTable } from 'mantine-datatable';
import { useState } from 'react';
import Button from '../Button';

type Props<T> = {
  columns: DataTableColumn<T>[];
  records: T[];
  totalRecord: number;
  page: number;
  query: string;
  isAdding?: boolean;
  isNotCreateOrAdd?: boolean;
  setPage: (p: number) => void;
  setQuery: (q: string) => void;
  handleSortStatusChange: (status: DataTableSortStatus) => void;
  handleDeleteSelectedRecords: (records: TableType[]) => void;
  handleCreateNewRecord: () => void;
  onRowClick?: (record: T) => void;
  handleAddRecord?: (records: TableType[]) => void;
};
export type TableType = { [key in string]: any };

const PAGE_SIZE = 10;

export const DataTable = ({
  columns,
  records,
  page,
  query,
  totalRecord,
  isAdding,
  isNotCreateOrAdd,
  handleAddRecord,
  setPage,
  setQuery,
  handleSortStatusChange,
  handleDeleteSelectedRecords,
  handleCreateNewRecord,
  onRowClick,
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
      {isNotCreateOrAdd ? null : isAdding && handleAddRecord ? (
        <Flex gap={16} justify="flex-end">
          <Button
            onClick={() => handleAddRecord(selectedRecords)}
            w="max-content"
            leftIcon={<IconCirclePlus size={16} />}
          >
            Add
          </Button>
        </Flex>
      ) : (
        <Flex gap={16} justify="space-between">
          <Flex gap={16} w="80%">
            <TextInput
              sx={{ flexBasis: '60%' }}
              placeholder="Search here..."
              icon={<IconSearch size={16} />}
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <Button
              w="max-content"
              variant="outline"
              leftIcon={<IconTrash size={16} />}
              color="red"
              disabled={!selectedRecords.length}
              onClick={() => handleDeleteSelectedRecords(selectedRecords)}
            >
              <Text weight={400}>
                {selectedRecords.length
                  ? `Delete ${
                      selectedRecords.length === 1
                        ? 'one selected record'
                        : `${selectedRecords.length} selected records`
                    }`
                  : 'Select records to delete'}
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
      )}

      <MDataTable<{ [key in string]: string }>
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
        totalRecords={totalRecord}
        recordsPerPage={PAGE_SIZE}
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        idAccessor="_id"
        onRowClick={onRowClick}
      />
    </Flex>
  );
};
