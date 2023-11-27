import { Link, RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Editor, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import ImageResize from 'tiptap-imagresize';
import { ActionIcon, Box, createStyles } from '@mantine/core';
import { IconPhoto, IconTag } from '@tabler/icons-react';
import { useCallback } from 'react';
import Text from './Text';
import { QUESTION_TYPE } from 'types/question';

interface RichTextEditorCustomProps {
  editor: Editor | null;
  label?: string;
  type?: QUESTION_TYPE;
  numberOfBlanks?: number;
  setNumberOfBlanks?: (number: number) => void;
}
const useStyle = createStyles<string, {}>((theme) => ({
  wrapper: {
    '.tiptap-image': {
      maxWidth: 400,
    },
  },
}));

function InsertAnswerControl({
  type,
  numberOfBlanks,
  setNumberOfBlanks,
}: {
  type?: QUESTION_TYPE;
  numberOfBlanks?: number;
  setNumberOfBlanks?: (number: number) => void;
}) {
  const { editor } = useRichTextEditorContext();

  if (!type || numberOfBlanks === undefined || !setNumberOfBlanks) return null;
  return (
    <RichTextEditor.Control
      onClick={() => {
        editor?.commands.insertContent(
          type === QUESTION_TYPE.DropdownSelect
            ? ` @dropdown:answer:${numberOfBlanks + 1}`
            : ` @fill-in-gap:answer:${numberOfBlanks + 1}`
        );
        setNumberOfBlanks(numberOfBlanks + 1);
      }}
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

const RichTextEditorCustom = (props: RichTextEditorCustomProps) => {
  const { classes } = useStyle({}, { name: 'RichTextEditorCustom' });

  const { editor, label, type, numberOfBlanks, setNumberOfBlanks } = props;
  // const editor = useEditor({
  //   extensions: [
  //     StarterKit,
  //     Underline,
  //     Link,
  //     Superscript,
  //     SubScript,
  //     Highlight,
  //     TextAlign.configure({ types: ['heading', 'paragraph'] }),
  //     Image.configure({
  //       inline: true,
  //       HTMLAttributes: {
  //         class: 'tiptap-image',
  //       },
  //     }),
  //   ],
  // });
  const addImage = useCallback(() => {
    const url = window.prompt('Enter Image URL');

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  // if (!editor) {
  //   return null;
  // }

  return (
    <Box className={classes.wrapper}>
      {label && <Text size={'sm'}>{label}</Text>}
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
          {(type === QUESTION_TYPE.FillInGap || type === QUESTION_TYPE.DropdownSelect) && (
            <InsertAnswerControl
              type={type}
              numberOfBlanks={numberOfBlanks}
              setNumberOfBlanks={setNumberOfBlanks}
            />
          )}
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Box>
  );
};

RichTextEditorCustom.displayName = 'RichTextEditorCustom';
export default RichTextEditorCustom;
