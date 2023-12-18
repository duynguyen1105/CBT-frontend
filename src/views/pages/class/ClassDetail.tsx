import { ActionIcon, Box, Button, Center, Flex, Group, Text, TextInput } from '@mantine/core';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'store';
import { LayoutComponent } from 'types/layout';
import { QuestionType } from 'types/question';
import QuestionForm from 'views/components/base/form/Question/FormQuestion';
import Shell from 'views/layout/Shell';
import { ClassType } from '../../../types/class';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { TableType } from '../../components/base/dataTable';

const ClassDetail: LayoutComponent = () => {
  const columns: DataTableColumn<TableType>[] = [
    { accessor: '_id', width: '20%', sortable: true, title: 'ID' },
    { accessor: 'name', sortable: true, title: 'Full name' },
    { accessor: 'email', sortable: true },
    { accessor: 'gender', width: '5%', sortable: true },
    {
      accessor: 'actions',
      title: <Center>Actions</Center>,
      width: '5%',
      textAlignment: 'right',
      render: (user) => (
        <Group spacing={4} position="center" noWrap>
          <ActionIcon
            color="red"
            onClick={() => {
              // setDeleteModalOpened(true);
              // setClickedUser(user as UserType);
            }}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];
  const { workspace } = useSelector((state) => state.app.userInfo);
  const params = useParams();
  const classId = params.class_id;
  const [classDetail, setClassDetail] = useState<ClassType>();

  const handleSaveQuestion = async (question: QuestionType) => {
    if (classId && classId !== '-') {
      await callApiWithAuth(
        getApiPath(PATHS.QUESTIONS.UPDATE, { workspaceName: workspace, classId: classId }),
        'PUT',
        {
          data: question,
        }
      );
    } else {
      const res = await callApiWithAuth(
        getApiPath(PATHS.QUESTIONS.CREATE, { workspaceName: workspace }),
        'POST',
        {
          data: question,
        }
      );

      if (res) {
        setClassDetail(res.data);
      }
    }
  };

  const fetchClassDetail = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.CLASSES.GET_INFO, { workspaceName: workspace, classId: id }),
      'GET'
    );

    if (res) {
      console.log(res.data);

      setClassDetail(res.data);
    }
  };

  useEffect(() => {
    fetchClassDetail(params.class_id?.toString() || '');
  }, []);

  return (
    <Box>
      <Text fz={35}>Class Detail</Text>
      <Flex gap="xl">
        <TextInput placeholder="Class name" label="Class name" withAsterisk />
        <TextInput placeholder="Class name" label="Description" withAsterisk />
      </Flex>
      <Box mt={20}>
        <Flex justify="space-between" mb={10}>
          <Text size="md">Students</Text>
          <Button>Add Student</Button>
        </Flex>
        <DataTable
          records={classDetail?.users}
          columns={columns}
          withBorder
          withColumnBorders
          striped
        />
      </Box>
    </Box>
  );
};

ClassDetail.layout = Shell;
ClassDetail.displayName = 'Page.Questions';

export default ClassDetail;
