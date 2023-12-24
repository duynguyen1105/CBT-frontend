import { ActionIcon, Alert, Box, Group, Text, createStyles } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconAlertCircle, IconBulb, IconCheck, IconCircleCheck, IconX } from '@tabler/icons-react';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { ExamResultType, QuestionType } from 'types/question';
import ReactDOMServer from 'react-dom/server';
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
const FillInGap = ({
  question,
  questionNo = 1,
  form,
  isShowFeedback,
  userAnswer,
}: DropdownSelectProps) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const { classes } = useStyle({}, { name: 'FillInGap' });
  const handleFeedback = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowFeedback(!showFeedback);
  };

  let newQuestionContent = question?.content;
  console.log(question.blankAnswer, userAnswer);

  for (let index = 0; index < (question.blankAnswer?.length as number); index++) {
    const compAsHtml = ReactDOMServer.renderToStaticMarkup(
      <input
        id={`input-${index}`}
        name={`input-${index}`}
        className={`question-${questionNo}-fillingap`}
        value={userAnswer !== undefined ? userAnswer[index] : undefined}
      />
    );
    newQuestionContent = newQuestionContent.replace(`@fill-in-gap:answer:${index + 1}`, compAsHtml);
  }

  useEffect(() => {
    const selectEl = document.getElementsByClassName(`question-${questionNo}-fillingap`);

    for (let index = 0; index < (question.blankAnswer?.length as number); index++) {
      const element = selectEl[index] as HTMLInputElement;

      element.addEventListener('change', (event) => {
        const selectedValue = (event.target as HTMLInputElement).value;
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
      <Group>
        {userAnswer !== undefined &&
          (isCorrect ? <IconCheck color="green" /> : <IconX color="red" />)}
        <Text size="md">{`Question ${questionNo} ${
          question?.title ? `: ${question?.title}` : ''
        }`}</Text>

        {isShowFeedback && (
          <ActionIcon color="blue" variant="light" onClick={handleFeedback}>
            <IconBulb size="1.125rem" />
          </ActionIcon>
        )}
      </Group>

      <Box my="md" className={classes.root}>
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
