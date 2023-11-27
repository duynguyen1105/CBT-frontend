import { Accordion } from '@mantine/core';
import { useId } from 'react';
import RichTextEditorCustom from '../base/RichTextEditorCustom';

interface DescriptionProps {}

function Description(props: DescriptionProps) {
  const descriptionId = useId();
  return (
    <Accordion defaultValue={descriptionId} miw={'100%'} variant="filled">
      <Accordion.Item value={descriptionId}>
        <Accordion.Control>Description</Accordion.Control>
        <Accordion.Panel>
          <RichTextEditorCustom editor={null} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default Description;
