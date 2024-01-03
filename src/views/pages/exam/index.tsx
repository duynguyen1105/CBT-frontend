import { Box, Button, Flex, Modal, PasswordInput, TextInput } from '@mantine/core';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { ReactNode, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FormExam from 'views/components/base/form/FormExam';
import { TestType } from '../../../types/test';
import { Countdown } from './Countdown';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';

const currentDate = dayjs();

export const ExamPage = () => {
  const { workspace } = useGetUserInfo();
  const { test_id } = useParams();

  const [testInfo, setTestInfo] = useState<TestType>();
  const examStartTime = testInfo?.timeSetting?.startTime;
  const examFinishTime = testInfo?.timeSetting?.finishTime;
  const [opened, { open, close }] = useDisclosure(false);
  const [password, setPassword] = useState('');
  const [expired, setExpired] = useState(false);

  const handleSubmitPassword = () => {
    if (password === testInfo?.password) {
      close();
    } else {
      notifications.show({
        message: 'Wrong password',
        color: 'red',
      });
    }
  };

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

  useEffect(() => {
    if (testInfo?.password && testInfo.password.length > 0) open();
  }, [testInfo?.password]);

  useEffect(() => {
    if (examFinishTime && currentDate.isAfter(examFinishTime)) {
      setExpired(true);
    }
  }, [examFinishTime]);

  if (!testInfo) return null;

  return (
    <>
      {opened ? (
        <Modal
          opened={opened}
          onClose={() => {}}
          title="Password"
          overlayProps={{ blur: 4 }}
          closeOnClickOutside={false}
          withCloseButton={false}
        >
          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            mt={10}
            style={{ display: 'flex', marginLeft: 'auto' }}
            size="xs"
            disabled={password.length < 1}
            onClick={handleSubmitPassword}
          >
            Enter
          </Button>
        </Modal>
      ) : (
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
            <Countdown duration={testInfo?.timeSetting?.duration ?? 0} expired={expired} />
            <Flex wrap="wrap">
              {Array.from({ length: testInfo.questions.length }).map((_, index) => (
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
          <FormExam
            exam={{ _id: testInfo?._id as string, questions: testInfo.questions }}
            expired={expired}
          />
        </Flex>
      )}
    </>
  );
};
