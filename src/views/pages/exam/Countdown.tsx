import { Button, Flex, Image, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconHourglassHigh } from '@tabler/icons-react';
import { useCountdown } from 'hooks/useCountdown';
import { useEffect } from 'react';
import SubmitImg from '../../../assets/images/exam-submit.png'
import { useParams } from 'react-router';
import { notifications } from '@mantine/notifications';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { PATHS } from 'api/paths';
import { useGetUserInfo } from 'hooks/useGetUserInfo';

type Props = {
  duration: number
  expired: boolean
}

export const Countdown = ({ duration, expired }: Props) => {
  const { time, countdown } = useCountdown(duration, expired);
  const [opened, { open }] = useDisclosure(false);
  const { test_id } = useParams()
  const { workspace, _id } = useGetUserInfo()

  const handleSubmitTest = async () => {
    if (!test_id) return notifications.show({
      message: 'Something went wrong',
      color: 'red'
    });

    const res = await callApiWithAuth(
      getApiPath(PATHS.TESTS.SUBMIT_TEST, { workspaceName: workspace, userId: _id, testId: test_id }),
      'PUT', {
      data: {}
    }
    )
  }

  useEffect(() => {
    if (!expired && countdown === 0) {
      open()
    }
  }, [countdown])

  return (
    <>
      <Flex>
        <IconHourglassHigh />
        <Text color={countdown <= 10 ? 'red' : ''}>{time}</Text>
      </Flex>
      <Modal opened={opened} onClose={() => { }} closeOnClickOutside={false}
        closeOnEscape={false} withCloseButton={false}
        title={`Time's up!`}
      >
        <Modal.Body>
          <Image src={SubmitImg} />
        </Modal.Body>
        <Button fullWidth>Submit</Button>
      </Modal>
    </>
  );
};
