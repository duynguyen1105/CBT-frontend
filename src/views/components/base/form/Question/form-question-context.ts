import { createFormContext } from '@mantine/form';
import { ExamResultType, QuestionType } from 'types/question';
import { TestType } from '../../../../../types/test';

export const [QuestionFormProvider, useQuestionFormContext, useQuestionForm] =
  createFormContext<QuestionType>();

export const [TestFormProvider, useTestFormContext, useTestForm] = createFormContext<TestType>();

export const [ExamResultFormProvider, useExamResultFormContext, useExamResultForm] =
  createFormContext<ExamResultType>();
