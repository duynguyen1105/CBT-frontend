import { ActionIcon, Alert, Box, Flex, Text, createStyles } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconAlertCircle, IconBulb, IconCheck, IconCircleCheck, IconX } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { ExamResultType, QuestionType } from 'types/question';
import { checkCorrectByType } from 'views/pages/myTests/checkCorrect';

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
  form?: UseFormReturnType<ExamResultType, (values: ExamResultType) => ExamResultType>;
  isShowFeedback?: boolean;
  userAnswer?: any;
}
const DropdownSelect = ({
  question,
  questionNo = 1,
  form,
  isShowFeedback,
  userAnswer,
}: DropdownSelectProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'DropdownSelect' });
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };

  let newQuestionContent = question?.content;

  for (let index = 0; index < (question.blankAnswer?.length as number); index++) {
    const compAsHtml = ReactDOMServer.renderToStaticMarkup(
      <select
        id={`select-${index}`}
        className={`question-${questionNo}-select`}
        value={userAnswer ?? undefined}
      >
        <option value="">--Choose your answer--</option>
        {question.blankAnswer?.[index].map((answer: any) => (
          <option value={answer.order}>{answer.content}</option>
        ))}
      </select>
    );
    newQuestionContent = newQuestionContent.replace(`@dropdown:answer:${index + 1}`, compAsHtml);
  }

  useEffect(() => {
    const selectEl = document.getElementsByClassName(`question-${questionNo}-select`);
    for (let index = 0; index < (question.blankAnswer?.length as number); index++) {
      const element = selectEl[index] as HTMLSelectElement;
      element.addEventListener('change', (event) => {
        const selectedValue = (event.target as HTMLSelectElement).value;
        form?.setFieldValue(`answers.${questionNo - 1}.${index}`, selectedValue);
      });
    }
  });

  useEffect(() => {
    form?.setFieldValue(`answers.${questionNo - 1}`, []);
  }, []);

  const sanitizedData = () => ({ __html: DOMPurify.sanitize(newQuestionContent) });
  const isCorrect = userAnswer !== undefined && checkCorrectByType(question, userAnswer);

  return (
    <Box p="md" id={`question-${questionNo}`}>
      <Flex gap="md">
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
