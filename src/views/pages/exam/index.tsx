import { Button, Flex } from '@mantine/core';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FormExam from 'views/components/base/form/FormExam';
import { TestType } from '../../../types/test';
import { Countdown } from './Countdown';

export const ExamPage = () => {
  const { workspace } = useGetUserInfo();
  const { test_id } = useParams();

  const [testInfo, setTestInfo] = useState<TestType>();

  const fetchTestInfo = async () => {
    if (test_id === undefined) return;
    const res = await callApiWithAuth(
      getApiPath(PATHS.TESTS.GET_INFO, { workspaceName: workspace, testId: test_id }),
      'GET'
    );

    if (res.ok) {
      setTestInfo(res.data);
    }
  };

  useEffect(() => {
    fetchTestInfo();
  }, []);

  if (!testInfo) return null;

  return (
    <Flex p="md" direction="column" align="center" bg="#d5dbd5">
      <h1>The Final exam</h1>
      <Flex
        pos="fixed"
        right="20px"
        top="20px"
        direction="column"
        w="150px"
        align="center"
        gap="lg"
      >
        <Countdown />
        <Flex wrap="wrap">
          {Array.from({ length: testInfo.questions.length }).map((_, index) => (
            <Button
              key={index}
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
      <FormExam exam={{ _id: testInfo?._id as string, questions: testInfo.questions }} />
    </Flex>
  );
};
