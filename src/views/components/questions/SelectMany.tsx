import { ActionIcon, Box, Checkbox, Flex, Group, Text, createStyles } from '@mantine/core';
import { IconBulb, IconCheckbox } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { ExamResultType, QuestionType } from 'types/question';
import { UseFormReturnType } from '@mantine/form';
import { checkCorrectByType } from 'views/pages/myTests/checkCorrect';

const useStyle = createStyles<string, {}>(() => ({
  description: {
    color: 'teal',
  },
  radioCorrect: {
    borderColor: 'teal',
  },
}));

interface SelectManyProps {
  question: QuestionType;
  questionNo?: number;
  form?: UseFormReturnType<ExamResultType, (values: ExamResultType) => ExamResultType>;
  isShowFeedback?: boolean;
  userAnswer?: any;
}
const SelectMany = ({
  question,
  questionNo = 1,
  form,
  isShowFeedback,
  userAnswer,
}: SelectManyProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'SelectMany' });

  const questionContent = question?.content ?? 'Question content here...';
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };
  const sanitizedData = () => ({ __html: DOMPurify.sanitize(questionContent) });
  const isCorrect = checkCorrectByType(question, userAnswer);
  return (
    <Box p="md" id={`question-${questionNo}`}>
      <Flex>
        <IconCheckbox />
        <Text size="md">{`Question ${questionNo} ${
          question?.title ? `: ${question?.title}` : ''
        }`}</Text>
        {isShowFeedback && (
          <ActionIcon color="blue" variant="light" onClick={handleFeedback}>
            <IconBulb size="1.125rem" />
          </ActionIcon>
        )}
      </Flex>
      <Box pl="sm" mt="sm">
        <div dangerouslySetInnerHTML={sanitizedData()} />
        <Checkbox.Group
          mt={'sm'}
          {...form?.getInputProps(`answers.${questionNo - 1}`)}
          value={userAnswer}
        >
          {question?.answer.map((answer, index) => (
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
    </Box>
  );
};

export default SelectMany;
