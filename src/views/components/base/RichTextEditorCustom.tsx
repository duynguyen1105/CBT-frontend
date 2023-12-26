import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { Editor } from '@tiptap/react';
// import ImageResize from 'tiptap-imagresize';
import { Box, createStyles, FileInput, Text } from '@mantine/core';
import { IconMusic, IconPhoto, IconTag } from '@tabler/icons-react';
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
  imageStyle: {
    '.mantine-FileInput-input': {
      border: 'none',
      padding: 0,
      width: '2.25rem',
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

  const addImage = async (image: File) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'ml_default');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dmeih1fl4/image/upload', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        const { url } = await response.json();
        editor?.commands.insertContent(`<img src="${url}" />`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addAudio = async (audio: File) => {
    const data = new FormData();
    data.append('file', audio);
    data.append('upload_preset', 'ml_default');
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dmeih1fl4/video/upload', {
        method: 'POST',
        body: data,
      });
      if (response.ok) {
        const { url } = await response.json();
        editor?.commands.insertContent(
          `<audio controls><source src="${url}" type="audio/mpeg" /></audio>`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <FileInput
              className={classes.imageStyle}
              icon={<IconPhoto size="26px" strokeWidth={1.5} />}
              accept="image/*"
              onChange={addImage}
            />
            <FileInput
              className={classes.imageStyle}
              icon={<IconMusic size="26px" strokeWidth={1.5} />}
              accept="audio/mpeg3"
              onChange={addAudio}
              value={null}
            />
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
