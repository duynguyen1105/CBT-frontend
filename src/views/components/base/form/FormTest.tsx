import {
  Accordion,
  Box,
  Button,
  Center,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  PasswordInput,
  Stepper,
  Text,
  TextInput,
  createStyles,
} from '@mantine/core';

import defaultTheme from 'apps/theme';

import { DateTimePicker } from '@mantine/dates';
import { useListState } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconArrowRight, IconArticle, IconSettings, IconStackPush } from '@tabler/icons-react';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'store';
import { QuestionType } from 'types/question';
import PageURL from '../../../../apps/PageURL';
import { ClassType } from '../../../../types/class';
import { TestType } from '../../../../types/test';
import { TestAssignment } from '../../../pages/test/TestAssignment';
import FormAddContentTestPage from './FormAddContentTestPage';
import { TestFormProvider, useTestForm } from './Question/form-question-context';

const { padding } = defaultTheme.layout;

const useStyle = createStyles<string, {}>(() => ({
  steps: {
    maxWidth: 500,
    margin: '0px auto 50px',
  },
}));

type Props = {
  testInfo?: TestType;
};

const FormTest = ({ testInfo }: Props) => {
  const navigate = useNavigate();
  const { classes } = useStyle({}, { name: 'FormTest' });
  const [active, setActive] = useState(0);
  const [questions, handlers] = useListState<QuestionType>([]);
  const [selectedClasses, setSelectedClasses] = useState<ClassType[]>([]);
  const nextStep = () => setActive((current) => current + 1);
  const prevStep = () => setActive((current) => current - 1);

  const { workspace } = useSelector((state) => state.app.userInfo);

  const form = useTestForm({
    initialValues: {
      title: '',
      description: '',
      timeSetting: {
        startTime: new Date(),
        finishTime: new Date(),
        duration: 60,
      },

      displayOptions: {
        afterSubmit: {
          showAnswer: true,
          showScore: true,
          showFeedback: true,
        },
        afterDeadline: {
          showAnswer: true,
          showScore: true,
          showFeedback: true,
        },
      },
      password: '',
      questions: [],
    },
    validate: (values: any) => {
      const errors: any = {};

      if (!values.title) {
        errors.title = 'Title is required';
      }

      if (!values.description) {
        errors.description = 'Description is required';
      }

      return errors;
    },
  });

  useEffect(() => {
    if (!!testInfo) {
      const newTestInfo = {
        ...testInfo,
        timeSetting: {
          startTime: new Date(testInfo.timeSetting.startTime),
          finishTime: new Date(testInfo.timeSetting.finishTime),
          duration: testInfo.timeSetting.duration,
        },
      };

      form.setValues(newTestInfo);
      handlers.setState(newTestInfo.questions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testInfo]);

  const handleSaveTest = async (test: TestType) => {
    const isUpdate = !!testInfo;
    const path = isUpdate
      ? getApiPath(PATHS.TESTS.UPDATE, {
          workspaceName: workspace,
          testId: testInfo._id as string,
        })
      : getApiPath(PATHS.TESTS.CREATE, { workspaceName: workspace });
    const res = await callApiWithAuth(path, isUpdate ? 'PUT' : 'POST', {
      data: test,
    });
    if (res.ok) {
      notifications.show({
        message: `${isUpdate ? 'Update' : 'Create'} Test successfully`,
        color: 'green',
      });
      setTimeout(() => {
        navigate(PageURL.TESTS);
      }, 1000);
    }
  };

  const handleSubmit = (values: TestType) => {
    handleSaveTest({ ...values, questions, classAssigned: selectedClasses });
  };

  return (
    <Box pb={padding}>
      <TestFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid justify="center">
            <Grid.Col>
              <Stepper
                active={active}
                onStepClick={setActive}
                classNames={{ steps: classes.steps }}
              >
                <Stepper.Step label="Setting" icon={<IconSettings size="1.5rem" />}>
                  <Accordion
                    variant="separated"
                    defaultValue={['general', 'time', 'score', 'display-options', 'security']}
                    multiple
                  >
                    <Accordion.Item value="general">
                      <Accordion.Control>General</Accordion.Control>
                      <Accordion.Panel px={20}>
                        <TextInput
                          label="Title"
                          withAsterisk
                          placeholder="Enter here..."
                          {...form.getInputProps('title')}
                        />
                        <TextInput
                          label="Description"
                          withAsterisk
                          placeholder="Enter here..."
                          mt={10}
                          {...form.getInputProps('description')}
                        />
                      </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="time">
                      <Accordion.Control>Time Setting</Accordion.Control>
                      <Accordion.Panel px={20}>
                        <Group align="center">
                          <DateTimePicker
                            label="Start time"
                            placeholder="Pick date and time"
                            miw={185}
                            mx="0"
                            {...form.getInputProps('timeSetting.startTime')}
                          />
                          <Center pt={25}>
                            <IconArrowRight strokeWidth={1} />
                          </Center>
                          <DateTimePicker
                            label="Finish time"
                            placeholder="Pick date and time"
                            miw={185}
                            mx="0"
                            {...form.getInputProps('timeSetting.finishTime')}
                          />
                          <NumberInput
                            label="Duration (minutes)"
                            ml={10}
                            placeholder="60"
                            {...form.getInputProps('timeSetting.duration')}
                          />
                        </Group>
                      </Accordion.Panel>
                    </Accordion.Item>

                    <Accordion.Item value="display-options">
                      <Accordion.Control>Display Options</Accordion.Control>
                      <Accordion.Panel px={20}>
                        <Grid>
                          <Grid.Col span={4}>
                            <Text size="sm">After submit</Text>
                            <Checkbox
                              mt={10}
                              ml={10}
                              label="Score"
                              checked={form.values.displayOptions?.afterSubmit?.showScore}
                              {...form.getInputProps('displayOptions.afterSubmit.showScore')}
                            />
                            <Checkbox
                              mt={10}
                              ml={10}
                              label="Answer"
                              checked={form.values.displayOptions?.afterSubmit?.showAnswer}
                              {...form.getInputProps('displayOptions.afterSubmit.showAnswer')}
                            />
                            <Checkbox
                              mt={10}
                              ml={10}
                              label="Feedback"
                              checked={form.values.displayOptions?.afterSubmit?.showFeedback}
                              {...form.getInputProps('displayOptions.afterSubmit.showFeedback')}
                            />
                          </Grid.Col>
                          <Grid.Col span={4}>
                            <Text size="sm">After test closed</Text>

                            <Checkbox
                              mt={10}
                              ml={10}
                              label="Score"
                              checked={form.values.displayOptions?.afterDeadline?.showScore}
                              {...form.getInputProps('displayOptions.afterDeadline.showScore')}
                            />
                            <Checkbox
                              mt={10}
                              ml={10}
                              label="Answer"
                              checked={form.values.displayOptions?.afterDeadline?.showAnswer}
                              {...form.getInputProps('displayOptions.afterDeadline.showAnswer')}
                            />
                            <Checkbox
                              mt={10}
                              ml={10}
                              label="Feedback"
                              checked={form.values.displayOptions?.afterDeadline?.showFeedback}
                              {...form.getInputProps('displayOptions.afterDeadline.showFeedback')}
                            />
                          </Grid.Col>
                        </Grid>
                      </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="security">
                      <Accordion.Control>Security</Accordion.Control>
                      <Accordion.Panel px={20}>
                        <PasswordInput
                          label="Password"
                          type="password"
                          maw={200}
                          placeholder="Password"
                          autoComplete="new-password"
                        />
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                </Stepper.Step>
                <Stepper.Step label="Content" icon={<IconArticle size="1.5rem" />}>
                  <FormAddContentTestPage questions={questions} handlers={handlers} />
                </Stepper.Step>
                <Stepper.Step label="Test assignment" icon={<IconStackPush size="1.5rem" />}>
                  <TestAssignment
                    selectedClasses={selectedClasses}
                    setSelectedClasses={setSelectedClasses}
                  />
                </Stepper.Step>
              </Stepper>
            </Grid.Col>
          </Grid>
          <Group position="apart" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            {active !== 2 && <Button onClick={nextStep}>Next</Button>}
            {active === 2 && <Button type="submit">Finish</Button>}
          </Group>
        </form>
      </TestFormProvider>
    </Box>
  );
};

export default FormTest;
