import {Box, Modal, Table, createStyles} from '@mantine/core';
import {FC} from 'react';
import BadgeQuestion from './BadgeQuestion';
import Button from 'views/components/base/Button';
import {IconArrowNarrowLeft, IconSend} from '@tabler/icons-react';

const useStyle = createStyles<string, {}>(() => ({
  table: {
    '& > thead': {
      '& > th': {
        border: '1px solid #000',
        fontWeight: 600,
        fontSize: 16,
      },
    },
    '& > tbody': {
      '& > tr': {
        height: 30,
        '& > td': {
          border: '1px solid #999',
          fontWeight: 500,
          fontSize: 16,
          textAlign: 'center',
          padding: 0,
        },
      },
    },
  },
}));

export interface DialogSubmitProps {
  open: boolean;
  onClose: () => void;
}

const fakeData = [
  {
    question: 1,
    status: 'Answered',
  },
  {
    question: 12,
    status: 'Not Answered',
  },
];

const rows = fakeData.map((element) => (
  <tr key={element.question}>
    <td>
      <BadgeQuestion title={element.question.toString()} variant="question" />
    </td>
    <td>{element.status}</td>
  </tr>
));

const DialogSubmit: FC<DialogSubmitProps> = (props) => {
  const {open, onClose} = props;
  const {classes} = useStyle({}, {name: 'Dialogsubmit'});
  return (
    <Modal opened={open} onClose={onClose} title="Preview and Submit">
      <Box h={365} sx={{border: '1px solid #000', display: 'flex', alignItems: 'flex-start'}}>
        <Table className={classes.table}>
          <thead>
            <th>Question</th>
            <th>Status</th>
          </thead>
          <tbody>{rows}</tbody>
        </Table>

        <Table className={classes.table}>
          <thead>
            <th>Question</th>
            <th>Status</th>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: 12}}>
        <Button onClick={onClose} leftIcon={<IconArrowNarrowLeft />} fw={500} variant="outline">
          Back to test
        </Button>
        <Button fw={500} rightIcon={<IconSend />}>
          Accept and Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default DialogSubmit;
