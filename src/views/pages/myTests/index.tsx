import { Box, Divider, Flex, Text } from '@mantine/core';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { useEffect, useState } from 'react';
import { LayoutComponent } from 'types/layout';
import Shell from 'views/layout/Shell';
import { TEST_STATUS, TestType } from '../../../types/test';
import { TestCard } from './TestCard';

const { padding } = defaultTheme.layout;

const MyTest: LayoutComponent = () => {
  const { workspace, _id } = useGetUserInfo();

  const [tests, setTests] = useState<{ test: TestType; userAnswer: any }[]>([]);

  const fetchListTests = async () => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.TESTS.GET_MY_TESTS, { workspaceName: workspace, userId: _id }),
      'GET'
    );

    if (res.ok) {
      setTests(res.data);
    }
  };

  useEffect(() => {
    fetchListTests();
  }, []);

  return (
    <Box pb={padding}>
      <Box>
        <Text size="25px" color="cyan" my="md">
          On Going
        </Text>
        <Flex align="center" wrap="wrap" gap="lg">
          {tests
            .filter(
              (test) =>
                !!test.test &&
                new Date(test.test.timeSetting.startTime) < new Date() &&
                new Date(test.test.timeSetting.finishTime) > new Date() &&
                !test.userAnswer
            )
            .map((test) => (
              <TestCard test={test.test} status={TEST_STATUS.ONGOING} />
            ))}
        </Flex>
      </Box>

      <Divider m={20} />

      <Box>
        <Text size="25px" my="md" color="teal">
          Upcoming
        </Text>
        <Flex align="center" wrap="wrap" gap="lg">
          {tests
            .filter((test) => !!test.test && new Date(test.test.timeSetting.startTime) > new Date())
            .map((test) => (
              <TestCard test={test.test} status={TEST_STATUS.UPCOMING} />
            ))}
        </Flex>
      </Box>

      <Divider m={20} />

      <Box>
        <Text size="25px" my="md" color="orange">
          Finished
        </Text>
        <Flex align="center" wrap="wrap" gap="lg">
          {tests
            .filter(
              (test) =>
                !!test.test &&
                (new Date(test.test.timeSetting.finishTime) < new Date() || !!test.userAnswer)
            )
            .map((test) => (
              <TestCard
                key={test.test._id}
                test={test.test}
                status={TEST_STATUS.FINISHED}
                userAnswer={test.userAnswer}
              />
            ))}
        </Flex>
      </Box>
    </Box>
  );
};

MyTest.layout = Shell;
MyTest.displayName = 'Page.MyTest';

export default MyTest;
