import { Box, Button, Flex } from '@mantine/core';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useCountdown } from 'hooks/useCountdown';
import { useEffect, useState } from 'react';
import { QUESTION_TYPE, QuestionType } from 'types/question';
import DropdownSelect from 'views/components/questions/DropdownSelect';
import FillInGap from 'views/components/questions/FillInGap';
import SelectMany from 'views/components/questions/SelectMany';
import SelectOne from 'views/components/questions/SelectOne';
import { Countdown } from './Countdown';
import { Form } from 'react-router-dom';
import FormExam from 'views/components/base/form/FormExam';

export const ExamPage = () => {
  const { time } = useCountdown();

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
    <Flex p="md" direction="column" align="center" bg="#d5dbd5">
      <h1>ExamPage</h1>
      <Countdown />
      <FormExam exam={{ _id: '1', questions }} />
    </Flex>
  );
};
