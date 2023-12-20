import { ActionIcon, Box, Flex, Group, Radio, Text, createStyles } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconBulb, IconCheck, IconX } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { ExamResultType, QuestionType } from 'types/question';
import { checkCorrectByType } from 'views/pages/myTests/checkCorrect';

const useStyle = createStyles<string, {}>(() => ({
  description: {
    color: 'teal',
  },
  radioCorrect: {
    borderColor: 'teal',
  },
}));

interface SelectOneProps {
  question: QuestionType;
  questionNo?: number;
  form?: UseFormReturnType<ExamResultType, (values: ExamResultType) => ExamResultType>;
  isShowFeedback?: boolean;
  userAnswer?: any;
}
const SelectOne = ({
  question,
  questionNo = 1,
  form,
  isShowFeedback,
  userAnswer,
}: SelectOneProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'SelectOne' });

  const questionContent = question?.content ?? 'Question content here...';
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };
  const sanitizedData = () => ({ __html: DOMPurify.sanitize(questionContent) });

  const isCorrect = userAnswer !== undefined && checkCorrectByType(question, userAnswer);

  return (
    <Box p="md" id={`question-${questionNo}`}>
      <Flex gap="sm">
        {isCorrect ? <IconCheck color="green" /> : <IconX color="red" />}
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
        <Radio.Group
          mt={'sm'}
          onChange={(value) => form?.setFieldValue(`answers.${questionNo - 1}`, Number(value))}
          value={userAnswer?.toString() ?? undefined}
        >
          {question?.answer?.map((answer, index) => (
            <Radio
              mt="sm"
              value={`${answer.order}`}
              label={answer.content}
              error={showFeedback && !answer.isCorrect ? answer.feedback : null}
              description={showFeedback && answer.isCorrect ? answer.feedback : null}
              classNames={{
                description: classes.description,
                radio: showFeedback && answer.isCorrect ? classes.radioCorrect : '',
              }}
            />
          ))}
        </Radio.Group>
      </Box>
    </Box>
  );
};

export default SelectOne;
