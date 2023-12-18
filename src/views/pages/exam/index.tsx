import { Button, Flex } from '@mantine/core';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useCountdown } from 'hooks/useCountdown';
import { useEffect, useState } from 'react';
import { QuestionType } from 'types/question';
import FormExam from 'views/components/base/form/FormExam';
import { Countdown } from './Countdown';

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
      <h1>The Final exam</h1>
      <Flex pos="fixed" right="20px" top="20px" direction="column" w="150px" align="center">
        <Countdown />
        <Flex wrap="wrap" justify="center">
          {Array.from({ length: questions.length }).map((_, index) => (
            <Button
              size="xs"
              radius="50%"
              w={30}
              h={30}
              m="2px"
              p={0}
              onClick={() => {
                const el = document.getElementById(`question-${index + 1}`);
                if (!el) return;
                el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {index + 1}
            </Button>
          ))}
        </Flex>
      </Flex>
      <FormExam exam={{ _id: '1', questions }} />
    </Flex>
  );
};
