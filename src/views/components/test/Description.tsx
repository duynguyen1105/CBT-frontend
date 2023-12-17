import { Accordion } from '@mantine/core';
import { Link } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useId, useState } from 'react';
import RichTextEditorCustom from '../base/RichTextEditorCustom';

interface DescriptionProps {}

function Description(props: DescriptionProps) {
  const descriptionId = useId();
  const [content, setContent] = useState('');
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
      setContent(editor.getHTML());
    },
    content: content,
    parseOptions: {
      preserveWhitespace: false,
    },
  });

  return (
    <Accordion defaultValue={descriptionId} miw={'100%'} variant="filled">
      <Accordion.Item value={descriptionId}>
        <Accordion.Control>Description</Accordion.Control>
        <Accordion.Panel>
          <RichTextEditorCustom editor={editor} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default Description;
