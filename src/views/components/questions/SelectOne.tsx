import { ActionIcon, Box, Group, Radio, Text, createStyles } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconBulb } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { ExamResultType, QuestionType } from 'types/question';

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
}
const SelectOne = ({ question, questionNo = 1, form, isShowFeedback }: SelectOneProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'SelectOne' });

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
        <Radio.Group
          mt={'sm'}
          onChange={(value) => form?.setFieldValue(`answers.${questionNo - 1}`, Number(value))}
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
