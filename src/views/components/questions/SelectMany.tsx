import { ActionIcon, Box, Checkbox, Group, createStyles } from '@mantine/core';
import { IconBulb } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useState } from 'react';
import { QuestionType } from 'types/question';
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
  question: QuestionType;
  questionNo?: number;
}
const SelectMany = ({ question, questionNo = 1 }: SelectManyProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'SelectMany' });

  const questionContent = question?.content ?? 'Question content here...';
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };
  const sanitizedData = () => ({ __html: DOMPurify.sanitize(questionContent) });
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
      <Box pl="sm" mt="sm">
        <div dangerouslySetInnerHTML={sanitizedData()} />
        <Checkbox.Group mt={'sm'}>
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
