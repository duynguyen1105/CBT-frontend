import {Link, RichTextEditor} from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// import ImageResize from 'tiptap-imagresize';
import {ActionIcon, Box, createStyles} from '@mantine/core';
import {IconPhoto} from '@tabler/icons-react';
import {useCallback} from 'react';
import Text from './Text';

interface RichTextEditorCustomProps {
  label?: string;
}
const useStyle = createStyles<string, {}>((theme) => ({
  wrapper: {
    '.tiptap-image': {
      maxWidth: 400,
    },
  },
}));

const RichTextEditorCustom = (props: RichTextEditorCustomProps) => {
  const {classes, cx} = useStyle({}, {name: 'RichTextEditorCustom'});

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
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Box>
  );
};

RichTextEditorCustom.displayName = 'RichTextEditorCustom';
export default RichTextEditorCustom;
