import { UserType } from './user';

export type ClassType = {
  _id?: string;
  name: string;
  description: string;
  // tests: TestType[];
  // exams: ExamType[];
  users: UserType[];
};
