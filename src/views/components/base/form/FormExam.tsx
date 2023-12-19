import { Box, Button } from '@mantine/core';

import defaultTheme from 'apps/theme';

import { ExamResultType, ExamType, QUESTION_TYPE, QuestionType } from 'types/question';
import DropdownSelect from 'views/components/questions/DropdownSelect';
import FillInGap from 'views/components/questions/FillInGap';
import SelectMany from 'views/components/questions/SelectMany';
import SelectOne from 'views/components/questions/SelectOne';
import { ExamResultFormProvider, useExamResultForm } from './Question/form-question-context';

const { padding } = defaultTheme.layout;

type Props = {
  exam: ExamType;
  isShowResult?: boolean;
  userAnswer?: any;
};

const FormExam = ({ exam, isShowResult, userAnswer }: Props) => {
  // const { workspace } = useSelector((state) => state.app.userInfo);

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
          <FillInGap question={question} questionNo={questionNo} isShowFeedback={isShowResult} />
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
      // console.log(index, checkCorrectByType(question, answer));

      return checkCorrectByType(question, answer);
    });
    console.log(result[1]);

    return result;
  };

  const handleSubmit = (values: ExamResultType) => {
    console.log(values);
    // checkResult(values);
  };

  return (
    <Box pb={padding}>
      <ExamResultFormProvider form={form}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {exam.questions.map((question, idx) => (
            <>
              <div key={question._id}>{renderQuestion(question, idx + 1, userAnswer[idx])}</div>
            </>
          ))}

          {!isShowResult && <Button type="submit">Submit</Button>}
        </form>
      </ExamResultFormProvider>
    </Box>
  );
};

export default FormExam;
