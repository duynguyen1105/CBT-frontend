import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import ImageResize from 'tiptap-imagresize';
import { Box, createStyles, Text } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { QUESTION_TYPE } from 'types/question';
import RichTextEditorCustom from '../../RichTextEditorCustom';
import { useQuestionFormContext } from './form-question-context';

interface QuestionContentInputProps {
  label: string;
  type: QUESTION_TYPE;
  numberOfBlanks: number;
  setNumberOfBlanks: (number: number) => void;
}
const useStyle = createStyles<string, {}>((theme) => ({
  wrapper: {
    '.tiptap-image': {
      maxWidth: 400,
    },
  },
}));

const QuestionContentInput = ({
  label,
  type,
  numberOfBlanks,
  setNumberOfBlanks,
}: QuestionContentInputProps) => {
  const { classes, cx } = useStyle({}, { name: 'QuestionContentInput' });
  const form = useQuestionFormContext();
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(form.values.content);
    editor?.commands.setContent(form.values.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.content]);

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
    content: content,
    parseOptions: {
      preserveWhitespace: false,
    },
  });
  const addImage = useCallback(() => {
    const url = window.prompt('Enter Image URL');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <Box className={classes.wrapper}>
      {label && (
        <Text size={'sm'}>
          {label}
          <span style={{ marginLeft: 5, color: 'red' }}>*</span>
        </Text>
      )}
      {form?.errors?.content && (
        <Text fz="xs" color="red">
          {form.errors.content}
        </Text>
      )}
      <RichTextEditorCustom
        editor={editor}
        type={type}
        numberOfBlanks={numberOfBlanks}
        setNumberOfBlanks={setNumberOfBlanks}
      />
    </Box>
  );
};

QuestionContentInput.displayName = 'QuestionContentInput';
export default QuestionContentInput;
