import { Modal, createStyles } from '@mantine/core';
import { QUESTION_TYPE, QuestionType } from 'types/question';
import DropdownSelect from '../questions/DropdownSelect';
import FillInGap from '../questions/FillInGap';
import SelectMany from '../questions/SelectMany';
import SelectOne from '../questions/SelectOne';

type Props = {
  opened: boolean;
  data: QuestionType | null;
  onClose: () => void;
};

const useStyle = createStyles<string, {}>(() => ({
  wrapper: {
    img: {
      maxWidth: 550,
    },
  },
}));

export const PreviewQuestionModal = ({ opened, data, onClose }: Props) => {
  const { classes } = useStyle({}, { name: 'PreviewQuestion' });

  if (!data) return null;

  const { type } = data;

  const getComponent = () => {
    switch (type) {
      case QUESTION_TYPE.DropdownSelect:
        return <DropdownSelect question={data} />;
      case QUESTION_TYPE.FillInGap:
        return <FillInGap question={data} />;
      case QUESTION_TYPE.SelectMany:
        return <SelectMany question={data} />;
      case QUESTION_TYPE.SelectOne:
        return <SelectOne question={data} />;
      default:
        break;
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} centered size="lg" className={classes.wrapper}>
      {getComponent()}
    </Modal>
  );
};
