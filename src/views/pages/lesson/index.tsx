import { Accordion, ActionIcon, Box, Button, Flex, Group, Text, Title } from '@mantine/core';
import defaultTheme from 'apps/theme';
import { LayoutComponent } from 'types/layout';
import Shell from 'views/layout/Shell';
import CreateLesson from './LessonDetail';
import { useEffect, useState } from 'react';
import { callApiWithAuth, getApiPath } from '../../../api/utils';
import { PATHS } from '../../../api/paths';
import { useGetUserInfo } from '../../../hooks/useGetUserInfo';
import { LessonType } from '../../../types/lesson';
import DOMPurify from 'dompurify';
import { ROLE } from '../../../apps/constants';
import { useNavigate } from 'react-router';
import PageURL from '../../../apps/PageURL';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { ConfirmModal } from '../../components/modal/confirmModal';

const { padding } = defaultTheme.layout;

const Lessons: LayoutComponent = () => {
  const { workspace, role } = useGetUserInfo();
  const navigate = useNavigate();

  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [clickedLesson, setClickedLesson] = useState<LessonType | null>(null);

  const deleteLesson = async (lessonId: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.LESSONS.DELETE, { workspaceName: workspace, lessonId }),
      'DELETE'
    );
    if (res) {
      setLessons(lessons.filter((lesson) => lesson._id !== lessonId));
      setDeleteModalOpened(false);
      setClickedLesson(null);
    }
  };

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await callApiWithAuth(
        getApiPath(PATHS.LESSONS.GET_LIST, { workspaceName: workspace }),
        'GET'
      );
      if (res) {
        setLessons(res.data);
      }
    };
    fetchLessons();
  }, []);

  return (
    <Box pb={padding}>
      <Text fw="bolder" mb="lg" fz="xl">
        Lessons
      </Text>

      <Accordion variant="contained">
        {lessons.map(({ title, content, _id }) => (
          <Accordion.Item value={_id || content} key={_id} id={_id}>
            <Accordion.Control>
              <Flex justify="space-between">
                <Title order={4}>{title}</Title>
                {role === ROLE.ADMIN_WORKSPACE && (
                  <Group spacing={4} position="center" noWrap>
                    <ActionIcon
                      color="blue"
                      onClick={() =>
                        navigate(PageURL.LESSONS_DETAIL.replace(':lesson_id', _id as string))
                      }
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => {
                        setDeleteModalOpened(true);
                        setClickedLesson({ title, content, _id } as LessonType);
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                )}
              </Flex>
            </Accordion.Control>
            <Accordion.Panel>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {role === ROLE.ADMIN_WORKSPACE && (
        <Button
          mt="md"
          onClick={() => navigate(PageURL.LESSONS_DETAIL.replace(':lesson_id', 'new'))}
        >
          Add Lesson
        </Button>
      )}
      <ConfirmModal
        title="Delete lesson?"
        description="This action can not be undo! Are you sure you want to do this?"
        opened={deleteModalOpened}
        onClose={() => {
          setDeleteModalOpened(false);
          setClickedLesson(null);
        }}
        onConfirm={() => clickedLesson?._id && deleteLesson(clickedLesson._id)}
      />
    </Box>
  );
};

Lessons.layout = Shell;
Lessons.displayName = 'Page.Questions';

export default Lessons;
