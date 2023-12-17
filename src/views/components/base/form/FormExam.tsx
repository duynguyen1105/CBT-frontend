import { Box, Button, createStyles } from '@mantine/core';

import defaultTheme from 'apps/theme';

import { useListState } from '@mantine/hooks';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useState } from 'react';
import { useSelector } from 'store';
import { ExamResultType, ExamType, QUESTION_TYPE, QuestionType, TestType } from 'types/question';
import DropdownSelect from 'views/components/questions/DropdownSelect';
import FillInGap from 'views/components/questions/FillInGap';
import SelectMany from 'views/components/questions/SelectMany';
import SelectOne from 'views/components/questions/SelectOne';
import Shell from 'views/layout/Shell';
import { ExamResultFormProvider, useExamResultForm } from './Question/form-question-context';

const { padding } = defaultTheme.layout;

const useStyle = createStyles<string, {}>(() => ({
  steps: {
    maxWidth: 500,
    margin: '0px auto 50px',
  },
}));

const FormExam = ({ exam }: { exam: ExamType }) => {
  const { workspace } = useSelector((state) => state.app.userInfo);

  const form = useExamResultForm({
    initialValues: {
      _id: exam._id,
      answers: [],
    },
  });

  const renderQuestion = (question: QuestionType, questionNo: number) => {
    switch (question.type) {
      case QUESTION_TYPE.DropdownSelect:
        return <DropdownSelect question={question} questionNo={questionNo} />;
      case QUESTION_TYPE.FillInGap:
        return <FillInGap question={question} questionNo={questionNo} />;
      case QUESTION_TYPE.SelectMany:
        return <SelectMany question={question} questionNo={questionNo} form={form} />;
      case QUESTION_TYPE.SelectOne:
        return <SelectOne question={question} questionNo={questionNo} form={form} />;
      default:
        break;
    }
  };

  const checkCorrectByType = (question: QuestionType, answer: any) => {
    switch (question.type) {
      // case QUESTION_TYPE.DropdownSelect:
      //   return question.answer[0].content === answer;
      // case QUESTION_TYPE.FillInGap:
      //   return question.answer[0].content === answer;
      case QUESTION_TYPE.SelectMany:
        return answer.every((ans: any) => Boolean(question.answer[ans].isCorrect));
      case QUESTION_TYPE.SelectOne:
        return Boolean(question.answer[answer].isCorrect);
      default:
        break;
    }
  };

  const checkResult = (data: ExamResultType) => {
    const { answers } = data;
    const result = answers.map((answer, index) => {
      const question = exam.questions[index];
      console.log(index, checkCorrectByType(question, answer));

      return checkCorrectByType(question, answer);
    });
    return result;
  };

  const handleSubmit = (values: ExamResultType) => {
    // console.log(values);
    checkResult(values);
  };

  return (
    <Box pb={padding}>
      <ExamResultFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {exam.questions.map((question, idx) => (
            <div key={question._id}>{renderQuestion(question, idx + 1)}</div>
          ))}
          {/* <Grid justify="center">
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
              </Stepper>
            </Grid.Col>
          </Grid>
          <Group position="apart" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>{active === 1 ? 'Finish' : 'Next'}</Button>
            <Button type="submit">submit</Button>
          </Group> */}
          <Button type="submit">Submit</Button>
        </form>
      </ExamResultFormProvider>
    </Box>
  );
};

export default FormExam;
