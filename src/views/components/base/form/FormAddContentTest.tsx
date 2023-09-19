import {Accordion, createStyles} from '@mantine/core';
import React from 'react';
import FormAddContentTestPage from './FormAddContentTestPage';

const useStyles = createStyles((theme) => ({
  control: {
    backgroundColor: '#fff',
    borderRadius: theme.radius.sm,
  },
}));

function FormAddContentTest() {
  const {classes, cx} = useStyles();

  return (
    <Accordion
      variant="separated"
      defaultValue={['page1', 'page2']}
      multiple
      classNames={{control: classes.control}}
    >
      <Accordion.Item value="page1" my="md">
        <Accordion.Control>Page 1</Accordion.Control>
        <Accordion.Panel px={20}>
          <FormAddContentTestPage />
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="page2" my="md">
        <Accordion.Control>Page 2</Accordion.Control>
        <Accordion.Panel px={20}>
          <FormAddContentTestPage />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
}

export default FormAddContentTest;
