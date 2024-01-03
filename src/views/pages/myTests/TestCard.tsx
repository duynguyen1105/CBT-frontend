import { Text, Card, RingProgress, Group, useMantineTheme, Flex, Box, Button } from '@mantine/core';
import { TEST_STATUS, TestStatus, TestType } from '../../../types/test';
import { useNavigate } from 'react-router';
import PageURL from '../../../apps/PageURL';
import { modals } from '@mantine/modals';
import FormExam from '../../components/base/form/FormExam';

const stats = [
  { value: 447, label: 'Remaining' },
  { value: 76, label: 'In progress' },
];

type Props = {
  test: TestType;
  status: TestStatus;
  userAnswer?: any;
};

export const TestCard = ({ test, status, userAnswer }: Props) => {
  const { title, timeSetting, description } = test;
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const completed = 1887;
  const total = 2334;
  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text>{stat.value}</Text>
      <Text size="xs" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="md" radius="md" w={500}>
      <Flex gap="lg">
        <Flex gap="xl" direction="column">
          <Text
            fz="xl"
            color={
              status === TEST_STATUS.ONGOING
                ? 'cyan'
                : status === TEST_STATUS.UPCOMING
                ? 'teal'
                : 'orange'
            }
          >
            {title}
          </Text>
          <Box>
            <Text>
              {`From: ${new Date(timeSetting.startTime).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}`}
            </Text>
            <Text>
              {`To: ${new Date(timeSetting.finishTime).toLocaleString('en-US', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })}`}
            </Text>
            <Text>{`Duration: ${timeSetting.duration} minutes`}</Text>
          </Box>
        </Flex>

        <Flex direction="column" justify="space-between">
          <Text fz="md">{description}</Text>
          {status === TEST_STATUS.ONGOING && (
            <Button
              variant="light"
              color="cyan"
              w={200}
              onClick={() => navigate(PageURL.EXAM.replace(':test_id', test._id as string))}
            >
              Start
            </Button>
          )}
          {status === TEST_STATUS.UPCOMING && (
            <Button variant="light" color="teal" w={200} disabled>
              Start
            </Button>
          )}
          {status === TEST_STATUS.FINISHED && (
            <Button
              variant="light"
              color="orange"
              w={200}
              onClick={() =>
                modals.open({
                  size: 'xl',
                  children: (
                    <FormExam
                      exam={{ _id: test?._id as string, questions: test.questions }}
                      isShowResult
                      userAnswer={userAnswer}
                    />
                    // <h1>haha</h1>
                  ),
                })
              }
            >
              View result
            </Button>
          )}
          {/* <div>
            <RingProgress
              roundCaps
              thickness={6}
              size={150}
              sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
              label={
                <div>
                  <Text ta="center" fz="lg">
                    {((completed / total) * 100).toFixed(0)}%
                  </Text>
                  <Text ta="center" fz="xs" c="dimmed">
                    Completed
                  </Text>
                </div>
              }
            />
          </div> */}
        </Flex>
      </Flex>
    </Card>
  );
};
