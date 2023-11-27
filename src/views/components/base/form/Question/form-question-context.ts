import { createFormContext } from '@mantine/form';
import { QuestionType } from 'types/question';

export const [QuestionFormProvider, useQuestionFormContext, useQuestionForm] =
  createFormContext<QuestionType>();
