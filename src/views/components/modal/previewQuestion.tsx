import { Checkbox, Group, Modal, Radio, Title, TypographyStylesProvider } from '@mantine/core';
import { IQuestion, QUESTION_TYPE } from 'types/question';

type Props = {
  opened: boolean;
  data: IQuestion;
  onClose: () => void;
};

export const PreviewQuestionModal = ({ opened, data, onClose }: Props) => {
  const { type, title, answers, content } = data;
  console.log(answers);

  return (
    <Modal opened={opened} onClose={onClose} centered size="lg">
      <Title>{title}</Title>
      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </TypographyStylesProvider>
      {type === QUESTION_TYPE.SelectOne && (
        <Radio.Group>
          <Group>
            {answers.map(({ content }) => (
              <Radio label={content} value={content} />
            ))}
          </Group>
        </Radio.Group>
      )}
      {type === QUESTION_TYPE.SelectMany && (
        <Checkbox.Group>
          <Group>
            {answers.map(({ content }) => (
              <Checkbox label={content} value={content} />
            ))}
          </Group>
        </Checkbox.Group>
      )}
    </Modal>
  );
};
