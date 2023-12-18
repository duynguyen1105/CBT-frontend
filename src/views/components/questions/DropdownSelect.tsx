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
  isShowFeedback?: boolean;
}
const DropdownSelect = ({ question, questionNo = 1, isShowFeedback }: DropdownSelectProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'DropdownSelect' });
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };

  let newQuestionContent = question?.content;

  for (let index = 0; index < (question.blankAnswer?.length as number); index++) {
    const selectAnswer = `<select id="select-${index}">
    <option value="" class="placeholder">--Choose your answer--</option>
    ${question.blankAnswer?.[index]
      .map((answer: any) => `<option value="${answer.order}">${answer.content}</option>`)
      .join('')}
  </select>`;

    newQuestionContent = newQuestionContent.replace(`@dropdown:answer:${index + 1}`, selectAnswer);
  }

  const sanitizedData = () => ({ __html: DOMPurify.sanitize(newQuestionContent) });
  return (
    <Box p="md" id={`question-${questionNo}`}>
      <Group>
        <Text size="md">{`Question ${questionNo} ${
          question?.title ? `: ${question?.title}` : ''
        }`}</Text>

        {isShowFeedback && (
          <ActionIcon color="blue" variant="light" onClick={handleFeedback}>
            <IconBulb size="1.125rem" />
          </ActionIcon>
        )}
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

export default DropdownSelect;
