import { Accordion, ActionIcon, Alert, Box, Group, createStyles } from '@mantine/core';
import { IconAlertCircle, IconBulb, IconCircleCheck } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useId, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import { IQuestion, fakeDropdownSelect } from 'types/question';
import Text from '../base/Text';

const useStyle = createStyles<string, {}>(() => ({
  root: {
    '& > .placeholder': {
      color: 'gray',
    },
  },
}));

interface DropdownSelectProps {
  questionNo?: number;
  question?: IQuestion;
}
const DropdownSelect: LayoutComponent = (props: DropdownSelectProps) => {
  const { questionNo = 1, question = fakeDropdownSelect } = props;
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'DropdownSelect' });
  const localId = useId();
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };
  const selectAnswer = `<select>
    <option value="" class="placeholder">--Choose your answer--</option>
    ${question.answers
      .map((answer) => `<option value="${answer.order}">${answer.content}</option>`)
      .join('')}
  </select>`;

  let n = 0;
  const newQuestionContent = question?.content.replaceAll(/<ans>(.*?)<\/ans>/g, (v) => {
    n++;
    return selectAnswer.replace('<select>', `<select id="select-${n}">`);
  });

  // question?.content ?? 'Question content here...';

  const sanitizedData = () => ({ __html: DOMPurify.sanitize(newQuestionContent) });
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
          <Box my="md" classNames={classes.root}>
            <Box pl="sm" mt="sm">
              <div dangerouslySetInnerHTML={sanitizedData()} />
            </Box>
            {showFeedback &&
              question.answers.map((answer) =>
                answer.isCorrect ? (
                  <Alert
                    mt="sm"
                    icon={<IconCircleCheck size="1rem" />}
                    title={answer.content}
                    color="cyan"
                  >
                    {answer.feedback}
                  </Alert>
                ) : (
                  <Alert
                    mt="sm"
                    icon={<IconAlertCircle size="1rem" />}
                    title={answer.content}
                    color="red"
                  >
                    {answer.feedback}
                  </Alert>
                )
              )}
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default DropdownSelect;
