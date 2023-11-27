import { Modal } from '@mantine/core';
import { QUESTION_TYPE, QuestionType } from 'types/question';
import DropdownSelect from '../questions/DropdownSelect';
import SelectOne from '../questions/SelectOne';
import SelectMany from '../questions/SelectMany';
import FillInGap from '../questions/FillInGap';

type Props = {
  opened: boolean;
  data: QuestionType | null;
  onClose: () => void;
};

export const PreviewQuestionModal = ({ opened, data, onClose }: Props) => {
  if (!data) return null;

  const { type, title, answer, content } = data;

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
    <Modal opened={opened} onClose={onClose} centered size="lg">
      {/* <Title>{title}</Title>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </TypographyStylesProvider>
      {type === QUESTION_TYPE.SelectOne && (
        <Radio.Group>
          <Group>
            {answer.map(({ content }) => (
              <Radio label={content} value={content} />
            ))}
          </Group>
        </Radio.Group>
      )}
      {type === QUESTION_TYPE.SelectMany && (
        <Checkbox.Group>
          <Group>
            {answer.map(({ content }) => (
              <Checkbox label={content} value={content} />
            ))}
          </Group>
        </Checkbox.Group>
      )} */}
      {getComponent()}
    </Modal>
  );
};
