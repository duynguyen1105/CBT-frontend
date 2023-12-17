import { Box } from '@mantine/core';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useCountdown } from 'hooks/useCountdown';
import { useEffect, useState } from 'react';
import { QUESTION_TYPE, QuestionType } from 'types/question';
import DropdownSelect from 'views/components/questions/DropdownSelect';
import FillInGap from 'views/components/questions/FillInGap';
import SelectMany from 'views/components/questions/SelectMany';
import SelectOne from 'views/components/questions/SelectOne';

const renderQuestion = (question: QuestionType, questionNo: number) => {
  switch (question.type) {
    case QUESTION_TYPE.DropdownSelect:
      return <DropdownSelect question={question} questionNo={questionNo} />;
    case QUESTION_TYPE.FillInGap:
      return <FillInGap question={question} questionNo={questionNo} />;
    case QUESTION_TYPE.SelectMany:
      return <SelectMany question={question} questionNo={questionNo} />;
    case QUESTION_TYPE.SelectOne:
      return <SelectOne question={question} questionNo={questionNo} />;
    default:
      break;
  }
};

export const ExamPage = () => {
  // const { time } = useCountdown();

  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const fetchListQuestions = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.QUESTIONS.GET_LIST, { workspaceName: 'ws1' }),
      'GET'
    );

    if (res.ok) {
      setQuestions(res.data);
    }
  };

  useEffect(() => {
    fetchListQuestions();
  }, []);

  return (
    <Box p="md">
      <h1>ExamPage</h1>
      {/* <div>Countdown: {time}</div> */}
      {questions.map((question, idx) => (
        <div key={question._id}>{renderQuestion(question, idx + 1)}</div>
      ))}
    </Box>
  );
};
