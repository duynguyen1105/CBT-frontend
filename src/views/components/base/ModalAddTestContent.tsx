import {ActionIcon, Button, Group, Menu, Text} from '@mantine/core';
import {modals} from '@mantine/modals';
import {
  IconCirclePlus,
  IconEye,
  IconInfoCircle,
  IconQuestionMark,
  IconStack2,
} from '@tabler/icons-react';
import {DataTableColumn, DataTableSortStatus} from 'mantine-datatable';
import {useState} from 'react';
import {TableType} from './dataTable';
import {DataTableQuestions} from './dataTable/DataTableQuestions';

const recordsFake = [
  {
    id: 'ab1e3aa6-3116-4e0d-a33d-9262aac86747',
    title: 'Pfeffer and Sons',
    createdAt: '22-04-2023, 22:20',
    category: 'Tyler',
    level: 'MA',
  },
  {
    id: '6c2c52f1-e197-4892-ae8e-5b5e42c226cb',
    title: 'Hettinger, Willms and Connelly',
    createdAt: '22-04-2023, 22:20',
    category: 'Deltona',
    level: 'NJ',
  },
  {
    id: '9a2e51e0-5bbe-49af-a748-546509792e28',
    title: 'Champlin - Spencer',
    createdAt: '22-04-2023, 22:20',
    category: 'Deerfield Beach',
    level: 'IN',
  },
  {
    id: '41e6105b-1115-4414-aaa6-ace1944ab3f2',
    title: 'Zulauf, McLaughlin and Jaskolski',
    createdAt: '22-04-2023, 22:20',
    category: 'Georgetown',
    level: 'SD',
  },
  {
    id: 'dcc6476c-2b6c-4acd-955f-32a0337b5832',
    title: 'Shanahan - Turcotte',
    createdAt: '22-04-2023, 22:20',
    category: 'McLean',
    level: 'MT',
  },
  {
    id: 'ccdbb85d-2175-4865-a69c-a76557216364',
    title: 'Gutkowski Inc',
    createdAt: '22-04-2023, 22:20',
    category: 'Flagstaff',
    level: 'AL',
  },
  {
    id: '19df3e35-1577-48a7-9e2f-f79c4f6c36ef',
    title: 'Stark Inc',
    createdAt: '22-04-2023, 22:20',
    category: 'Jupiter',
    level: 'MI',
  },
  {
    id: '5e50f063-6620-491c-904c-fe8e40488802',
    title: 'Schmidt and Sons',
    createdAt: '22-04-2023, 22:20',
    category: 'Peoria',
    level: 'MO',
  },
  {
    id: 'a46de859-251b-42f6-a6c4-1642beba6b56',
    title: 'Mohr - Raynor',
    createdAt: '22-04-2023, 22:20',
    category: 'Battle Creek',
    level: 'VT',
  },
  {
    id: '06f55c10-2481-4b5d-9a70-d8845f5e1381',
    title: 'Tromp, Runolfsson and Bahringer',
    createdAt: '22-04-2023, 22:20',
    category: 'Frisco',
    level: 'OK',
  },
];

const columns: DataTableColumn<TableType>[] = [
  {accessor: 'title', width: '60%', sortable: true},
  {accessor: 'createdAt', width: '30%', sortable: true},
  {accessor: 'category', width: 130, sortable: true},
  {accessor: 'level', width: 80, sortable: true},
  {
    accessor: 'actions',
    width: 70,
    title: <Text mr="xs">View</Text>,
    textAlignment: 'right',
    render: (company: any) => (
      <Group spacing={4} position="center" noWrap>
        <ActionIcon color="blue" onClick={() => console.log(company)}>
          <IconEye size={16} />
        </ActionIcon>
      </Group>
    ),
  },
];

function ModalAddTestContent() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const handleDeleteSelectedRecords = (records: TableType[]) => {
    console.log(records);
  };

  const handleSortStatusChange = (status: DataTableSortStatus) => {
    console.log(status);
    setPage(1);
  };

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="outline" color="green" rightIcon={<IconCirclePlus strokeWidth={1.5} />}>
          Add More
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Add new content</Menu.Label>
        <Menu.Item icon={<IconInfoCircle size={20} />}>Description</Menu.Item>
        <Menu.Item
          icon={<IconQuestionMark size={20} />}
          onClick={() =>
            modals.openConfirmModal({
              size: 'xl',
              title: 'Add question',
              closeOnConfirm: false,
              labels: {confirm: 'Add', cancel: 'Cancel'},
              children: (
                <DataTableQuestions
                  records={recordsFake}
                  columns={columns}
                  page={page}
                  setPage={setPage}
                  query={query}
                  setQuery={setQuery}
                  handleCreateNewRecord={() => console.log('11')}
                  handleDeleteSelectedRecords={handleDeleteSelectedRecords}
                  handleSortStatusChange={handleSortStatusChange}
                />
              ),
              onConfirm: () => console.log('Add question'),
            })
          }
        >
          Question
        </Menu.Item>
        <Menu.Item icon={<IconStack2 size={20} />}>Section</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default ModalAddTestContent;
