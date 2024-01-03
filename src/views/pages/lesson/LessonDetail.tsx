import { Box, Button, Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { LayoutComponent } from 'types/layout';
import { LessonType } from 'types/lesson';
import RichTextEditorCustom from 'views/components/base/RichTextEditorCustom';
import Shell from 'views/layout/Shell';
import { callApiWithAuth, getApiPath } from '../../../api/utils';
import { PATHS } from '../../../api/paths';
import { notifications } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import PageURL from '../../../apps/PageURL';

const { padding } = defaultTheme.layout;

const LessonDetail: LayoutComponent = () => {
  const { workspace } = useGetUserInfo();
  const { lesson_id } = useParams();
  const navigate = useNavigate();

  const [lessonInfo, setLessonInfo] = useState<LessonType>();

  const form = useForm<LessonType>({
    initialValues: {
      title: '',
      content: '',
      questions: [],
    },
  });

  const handleSubmit = async (values: LessonType) => {
    if (!lesson_id || lesson_id === 'new') {
      const res = await callApiWithAuth(
        getApiPath(PATHS.LESSONS.CREATE, { workspaceName: workspace }),
        'POST',
        {
          data: values,
        }
      );
      if (res.ok) {
        notifications.show({
          message: 'Create lesson successfully',
          color: 'green',
        });
        setTimeout(() => {
          navigate(PageURL.LESSONS);
        }, 2000);
      } else {
        notifications.show({
          message: res.message,
          color: 'red',
        });
      }
    } else {
      const res = await callApiWithAuth(
        getApiPath(PATHS.LESSONS.UPDATE, { workspaceName: workspace, lessonId: lesson_id }),
        'PUT',
        {
          data: values,
        }
      );
      if (res.ok) {
        notifications.show({
          message: 'Update lesson successfully',
          color: 'green',
        });
      } else {
        notifications.show({
          message: res.message,
          color: 'red',
        });
      }
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'tiptap-image',
        },
      }),
    ],
    onUpdate({ editor }) {
      form.setValues((value) => ({
        ...value,
        content: editor.getHTML(),
      }));
    },
    content: form.values.content,
    parseOptions: {
      preserveWhitespace: false,
    },
  });

  const fetchLessonInfo = async () => {
    if (!lesson_id || lesson_id === 'new') return;
    const res = await callApiWithAuth(
      getApiPath(PATHS.LESSONS.GET_INFO, { workspaceName: workspace, lessonId: lesson_id }),
      'GET'
    );

    if (res.ok) {
      setLessonInfo(res.data);
      form.setFieldValue('title', res.data.title);
      editor?.commands.setContent(res.data.content);
    }
  };

  useEffect(() => {
    fetchLessonInfo();
  }, [editor]);

  return (
    <Box pb={padding}>
      <Text fw="bolder" mb="lg" fz="xl">
        {lesson_id !== 'new' ? 'Lesson Detail' : 'Create Lesson'}
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex direction="column" gap="md">
          <TextInput label="Title" {...form.getInputProps('title')} />
          <Box>
            <Text size="sm">Content</Text>
            <RichTextEditorCustom editor={editor} />
          </Box>
        </Flex>
        <Button type="submit" mt="md">
          {lesson_id !== 'new' ? 'Save' : 'Submit'}
        </Button>
      </form>
    </Box>
  );
};

LessonDetail.layout = Shell;
LessonDetail.displayName = 'Page.Lessons';

export default LessonDetail;
