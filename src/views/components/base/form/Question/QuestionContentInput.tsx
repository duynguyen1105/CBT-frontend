import {Link, RichTextEditor, useRichTextEditorContext} from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import ImageResize from 'tiptap-imagresize';
import {ActionIcon, Box, createStyles, Text} from '@mantine/core';
import {IconPhoto, IconRectangle, IconTag} from '@tabler/icons-react';
import {useCallback, useEffect, useState} from 'react';
import {useQuestionFormContext} from './form-question-context';

interface QuestionContentInputProps {
  label?: string;
}
const useStyle = createStyles<string, {}>((theme) => ({
  wrapper: {
    '.tiptap-image': {
      maxWidth: 400,
    },
  },
}));

function InsertAnswerControl() {
  const {editor} = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => editor?.commands.insertContent(' @dropdown:1 ')}
      aria-label="Insert blank"
      title="Insert blank"
      px={5}
    >
      <IconTag stroke={1.5} size="1rem" />
      <Text size="sm" ml={5}>
        Insert blank
      </Text>
    </RichTextEditor.Control>
  );
}

const QuestionContentInput = (props: QuestionContentInputProps) => {
  const {classes, cx} = useStyle({}, {name: 'QuestionContentInput'});
  const form = useQuestionFormContext();
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(form.values.content);
    editor?.commands.setContent(form.values.content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.content]);

  const {label} = props;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({types: ['heading', 'paragraph']}),
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'tiptap-image',
        },
      }),
    ],
    onUpdate({editor}) {
      form.setValues({content: editor.getHTML()});
    },
    content: content,
    parseOptions: {
      preserveWhitespace: false,
    },
  });
  const addImage = useCallback(() => {
    const url = window.prompt('Enter Image URL');

    if (url) {
      editor?.chain().focus().setImage({src: url}).run();
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
          <span style={{marginLeft: 5, color: 'red'}}>*</span>
        </Text>
      )}
      {form?.errors?.content && (
        <Text fz="xs" color="red">
          {form.errors.content}
        </Text>
      )}
      <RichTextEditor
        editor={editor}
        labels={{
          boldControlLabel: label,
        }}
      >
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignJustify />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.ControlsGroup>
            <ActionIcon onClick={addImage}>
              <IconPhoto size="2rem" strokeWidth={1.5} />
            </ActionIcon>
          </RichTextEditor.ControlsGroup>
          <InsertAnswerControl />
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Box>
  );
};

QuestionContentInput.displayName = 'QuestionContentInput';
export default QuestionContentInput;
