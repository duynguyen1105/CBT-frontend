import { Box, Button, Modal, Text } from '@mantine/core';

import defaultTheme from 'apps/theme';

import { notifications } from '@mantine/notifications';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import PageURL from 'apps/PageURL';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ExamResultType, ExamType, QUESTION_TYPE, QuestionType } from 'types/question';
import DropdownSelect from 'views/components/questions/DropdownSelect';
import FillInGap from 'views/components/questions/FillInGap';
import SelectMany from 'views/components/questions/SelectMany';
import SelectOne from 'views/components/questions/SelectOne';
import { checkCorrectByType } from 'views/pages/myTests/checkCorrect';
import { ExamResultFormProvider, useExamResultForm } from './Question/form-question-context';

const { padding } = defaultTheme.layout;

type Props = {
  exam: ExamType;
  isShowResult?: boolean;
  userAnswer?: any;
  expired?: boolean;
};

const FormExam = ({ exam, isShowResult, userAnswer, expired }: Props) => {
  const { workspace, _id } = useGetUserInfo();
  const { test_id } = useParams();

  const form = useExamResultForm({
    initialValues: {
      _id: exam._id,
      answers: [],
    },
  });

  const renderQuestion = (question: QuestionType, questionNo: number, userAnswer: any) => {
    switch (question.type) {
      case QUESTION_TYPE.DropdownSelect:
        return (
          <DropdownSelect
            question={question}
            questionNo={questionNo}
            isShowFeedback={isShowResult}
            form={form}
            userAnswer={userAnswer}
          />
        );
      case QUESTION_TYPE.FillInGap:
        return (
          <FillInGap
            question={question}
            questionNo={questionNo}
            form={form}
            isShowFeedback={isShowResult}
            userAnswer={userAnswer}
          />
        );
      case QUESTION_TYPE.SelectMany:
        return (
          <SelectMany
            question={question}
            questionNo={questionNo}
            form={form}
            isShowFeedback={isShowResult}
            userAnswer={userAnswer}
          />
        );
      case QUESTION_TYPE.SelectOne:
        return (
          <SelectOne
            question={question}
            questionNo={questionNo}
            form={form}
            isShowFeedback={isShowResult}
            userAnswer={userAnswer}
          />
        );
      default:
        break;
    }
  };

  const checkResult = (data: ExamResultType) => {
    const { answers } = data;
    const result = answers.map((answer, index) => {
      const question = exam.questions[index];
      return checkCorrectByType(question, answer);
    });

    return result;
  };

  const handleSubmit = async (values: ExamResultType) => {
    if (!test_id)
      return notifications.show({
        message: 'Something went wrong',
        color: 'red',
      });

    const res = await callApiWithAuth(
      getApiPath(PATHS.TESTS.SUBMIT_TEST, {
        workspaceName: workspace,
        userId: _id,
        testId: test_id,
      }),
      'PUT',
      {
        data: values.answers,
      }
    );

    if (res.ok) {
      notifications.show({
        message: 'Submit successfully',
        color: 'green',
      });
      setTimeout(() => {
        window.location.assign(PageURL.MY_TESTS);
      }, 2000);
    } else {
      notifications.show({
        message: 'Submit failed',
        color: 'red',
      });
    }
  };

  return (
    <>
      {
        <Box pb={padding}>
          <ExamResultFormProvider form={form}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              {isShowResult && !!userAnswer && (
                <Text align="center" fz="lg" color="cyan">
                  {`Result: ${
                    exam.questions
                      .map((q, idx) => checkCorrectByType(q, userAnswer[idx]))
                      .filter((item) => item).length
                  } / ${exam.questions.length}`}
                </Text>
              )}
              {exam.questions.map((question, idx) => (
                <div key={question._id}>{renderQuestion(question, idx + 1, userAnswer?.[idx])}</div>
              ))}

              {!isShowResult && <Button type="submit">Submit</Button>}
              <Modal
                opened={expired ?? false}
                onClose={() => {}}
                withCloseButton={false}
                closeOnClickOutside={false}
                closeOnEscape={false}
                title="Test is expired"
              >
                <Text>This test has been expired!</Text>
                <Button mt={10} component={Link} to={'/my-tests'}>
                  Back to my tests
                </Button>
              </Modal>
            </form>
          </ExamResultFormProvider>
        </Box>
      }
    </>
  );
};

export default FormExam;
