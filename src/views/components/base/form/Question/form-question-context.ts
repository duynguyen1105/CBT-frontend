import { createFormContext } from '@mantine/form';
import { ExamResultType, ExamType, QuestionType, TestType } from 'types/question';

export const [QuestionFormProvider, useQuestionFormContext, useQuestionForm] =
  createFormContext<QuestionType>();

export const [TestFormProvider, useTestFormContext, useTestForm] = createFormContext<TestType>();
export const [ExamResultFormProvider, useExamResultFormContext, useExamResultForm] =
  createFormContext<ExamResultType>();
