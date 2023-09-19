import {createFormContext} from '@mantine/form';
import {IQuestion} from 'types/question';

export const [QuestionFormProvider, useQuestionFormContext, useQuestionForm] =
  createFormContext<IQuestion>();
