import { Box, createStyles, Text } from '@mantine/core';
import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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
  const { classes } = useStyle({}, { name: 'QuestionContentInput' });
  const form = useQuestionFormContext();

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
