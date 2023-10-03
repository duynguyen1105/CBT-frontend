import { Accordion, ActionIcon, Box, Checkbox, Group, createStyles } from '@mantine/core';
import { IconBulb } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useId, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import { IQuestion, fakeSelectMany } from 'types/question';
import Text from '../base/Text';

const useStyle = createStyles<string, {}>(() => ({
  description: {
    color: 'teal',
  },
  radioCorrect: {
    borderColor: 'teal',
  },
}));

interface SelectManyProps {
  questionNo?: number;
  question?: IQuestion;
}
const SelectMany: LayoutComponent = (props: SelectManyProps) => {
  const { questionNo = 1, question = fakeSelectMany } = props;
  const localId = useId();
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'SelectMany' });

  const questionContent = question?.content ?? 'Question content here...';
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };
  const sanitizedData = () => ({ __html: DOMPurify.sanitize(questionContent) });
  return (
    <Accordion defaultValue={localId} miw={'100%'} variant="filled">
      <Accordion.Item value={localId}>
        <Accordion.Control>
          <Group>
            <Text size="md">{`Question ${questionNo} ${
              question?.title ? `: ${question?.title}` : ''
            }`}</Text>
            <ActionIcon color="blue" variant="light" onClick={handleFeedback}>
              <IconBulb size="1.125rem" />
            </ActionIcon>
          </Group>
        </Accordion.Control>
        <Accordion.Panel>
          <Box pl="sm" mt="sm">
            <div dangerouslySetInnerHTML={sanitizedData()} />
            <Checkbox.Group mt={'sm'}>
              {question?.answers.map((answer, index) => (
                <Checkbox
                  mt="sm"
                  value={`${answer.order}`}
                  label={answer.content}
                  error={showFeedback && !answer.isCorrect ? answer.feedback : null}
                  description={showFeedback && answer.isCorrect ? answer.feedback : null}
                  classNames={{
                    description: classes.description,
                    input: showFeedback && answer.isCorrect ? classes.radioCorrect : '',
                  }}
                />
              ))}
            </Checkbox.Group>
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default SelectMany;
