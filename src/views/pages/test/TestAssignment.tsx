import { Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import { QuestionType } from 'types/question';
import { ClassType } from '../../../types/class';
import { TableType } from '../../components/base/dataTable';

const { padding } = defaultTheme.layout;

type Props = {
  selectedClasses: ClassType[];
  setSelectedClasses: (classes: ClassType[]) => void;
  onConfirm?: (data: QuestionType[]) => void;
};

export const TestAssignment = ({ selectedClasses, setSelectedClasses, onConfirm }: Props) => {
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
  ];

  const { workspace } = useSelector((state) => state.app.userInfo);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecord, setTotalRecord] = useState(1);
  const [sort, setSort] = useState('');
  const [classes, setClasses] = useState<ClassType[]>([]);

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

  const fetchListClasses = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.CLASSES.GET_LIST, { workspaceName: workspace, search, page, sort }),
      'GET'
    );

    if (res.ok) {
      setClasses(res.data);
      setTotalRecord(res.total);
    }
  };

  useEffect(() => {
    fetchListClasses();
  }, [search, page, sort]);

  return (
    <Box pb={padding}>
      <DataTable
        records={classes}
        columns={columns}
        withBorder
        withColumnBorders
        striped
        noRecordsText="No records to show"
        page={page}
        onPageChange={setPage}
        totalRecords={totalRecord}
        recordsPerPage={10}
        selectedRecords={selectedClasses}
        onSelectedRecordsChange={setSelectedClasses}
        idAccessor="_id"
      />
    </Box>
  );
};
