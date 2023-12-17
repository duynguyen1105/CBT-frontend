import { ActionIcon, Alert, Box, Group, createStyles, Text } from '@mantine/core';
import { IconAlertCircle, IconBulb, IconCircleCheck } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { QuestionType } from 'types/question';

const useStyle = createStyles<string, {}>(() => ({
  root: {
    '& > .placeholder': {
      color: 'gray',
    },
  },
}));

interface DropdownSelectProps {
  question: QuestionType;
  questionNo?: number;
}
const FillInGap = ({ question, questionNo = 1 }: DropdownSelectProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'FillInGap' });
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };

  let newQuestionContent = question?.content;

  for (let index = 0; index < (question.blankAnswer?.length as number); index++) {
    const selectAnswer = `<input id="input-${index}" name="input-${index}" />`;

    newQuestionContent = newQuestionContent.replace(
      `@fill-in-gap:answer:${index + 1}`,
      selectAnswer
    );
  }

  const sanitizedData = () => ({ __html: DOMPurify.sanitize(newQuestionContent) });
  return (
    <Box p="md">
      <Group>
        <Text size="md">{`Question ${questionNo} ${
          question?.title ? `: ${question?.title}` : ''
        }`}</Text>
        <ActionIcon color="blue" variant="light" onClick={handleFeedback}>
          <IconBulb size="1.125rem" />
        </ActionIcon>
      </Group>

      <Box my="md" classNames={classes.root}>
        <Box pl="sm" mt="sm">
          <div dangerouslySetInnerHTML={sanitizedData()} />
        </Box>
        {showFeedback &&
          question?.blankAnswer?.map((blnk, index) => (
            <>
              <Text size="sm" color="dark">{`Blank ${index + 1}`}</Text>
              {blnk.map((answer: any) =>
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
            </>
          ))}
      </Box>
    </Box>
  );
};

export default FillInGap;
