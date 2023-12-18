import { ActionIcon, Box, Checkbox, Group, Text, createStyles } from '@mantine/core';
import { IconBulb } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { ExamResultType, QuestionType } from 'types/question';
import { UseFormReturnType } from '@mantine/form';

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
}
const SelectMany = ({ question, questionNo = 1, form, isShowFeedback }: SelectManyProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'SelectMany' });

  const questionContent = question?.content ?? 'Question content here...';
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };
  const sanitizedData = () => ({ __html: DOMPurify.sanitize(questionContent) });
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
      <Box pl="sm" mt="sm">
        <div dangerouslySetInnerHTML={sanitizedData()} />
        <Checkbox.Group mt={'sm'} {...form?.getInputProps(`answers.${questionNo - 1}`)}>
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
