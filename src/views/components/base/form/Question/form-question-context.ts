import { createFormContext } from '@mantine/form';
import { QuestionType, TestType } from 'types/question';

export const [QuestionFormProvider, useQuestionFormContext, useQuestionForm] =
  createFormContext<QuestionType>();

export const [TestFormProvider, useTestFormContext, useTestForm] = createFormContext<TestType>();
