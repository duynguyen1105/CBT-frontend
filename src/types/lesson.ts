import { QuestionType } from './question';

export type LessonType = {
  _id?: string;
  title: string;
  content: string;
  questions: QuestionType[];
};

export type Option = {
  value: string;
  label: string;
  icon: JSX.Element;
  id: string;
};
