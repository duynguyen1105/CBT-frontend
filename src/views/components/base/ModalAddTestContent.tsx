import { Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconCirclePlus } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useSelector } from 'store';
import { QUESTION_TYPE, QUESTION_TYPE_LABEL, QuestionType } from 'types/question';
import { DataTable, TableType } from './dataTable';

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

  const { workspace } = useSelector((state) => state.app.userInfo);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecord, setTotalRecord] = useState(1);
  const [sort, setSort] = useState('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);

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
    <Button
      variant="outline"
      color="green"
      rightIcon={<IconCirclePlus size={20} />}
      onClick={() =>
        modals.open({
          size: 'xl',
          title: 'Add question',
          children: (
            <Box pb={padding}>
              <DataTable
                records={questions}
                columns={columns}
                page={page}
                setPage={setPage}
                totalRecord={totalRecord}
                query={search}
                isAdding
                handleAddRecord={(records) => {
                  onConfirm?.(records as QuestionType[]);
                  modals.closeAll();
                }}
                setQuery={setSearch}
                handleCreateNewRecord={() => null}
                handleDeleteSelectedRecords={deleteSelectedRecords}
                handleSortStatusChange={sortStatusChange}
              />
            </Box>
          ),
        })
      }
    >
      Add More Question
    </Button>
    // <Menu shadow="md" width={200}>
    //   <Menu.Target>

    //   </Menu.Target>

    //   <Menu.Dropdown>
    //     <Menu.Label>Add new content</Menu.Label>
    //     <Menu.Item icon={<IconInfoCircle size={20} />}>Description</Menu.Item>
    //     <Menu.Item
    //       icon={<IconQuestionMark size={20} />}
    //       onClick={() =>
    //         modals.open({
    //           size: 'xl',
    //           title: 'Add question',
    //           children: (
    //             <Box pb={padding}>
    //               <DataTable
    //                 records={questions}
    //                 columns={columns}
    //                 page={page}
    //                 setPage={setPage}
    //                 totalRecord={totalRecord}
    //                 query={search}
    //                 isAdding
    //                 handleAddRecord={(records) => {
    //                   console.log(records);
    //                   modals.closeAll();
    //                 }}
    //                 setQuery={setSearch}
    //                 handleCreateNewRecord={() => null}
    //                 handleDeleteSelectedRecords={deleteSelectedRecords}
    //                 handleSortStatusChange={sortStatusChange}
    //               />
    //             </Box>
    //           ),
    //           // onConfirm: () => console.log('Add question'),
    //         })
    //       }
    //     >
    //       Question
    //     </Menu.Item>
    //     <Menu.Item icon={<IconStack2 size={20} />}>Section</Menu.Item>
    //   </Menu.Dropdown>
    // </Menu>
  );
}

export default ModalAddTestContent;
