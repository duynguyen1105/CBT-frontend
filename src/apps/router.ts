import { LayoutComponent } from 'types/layout';
import Classes from 'views/pages/classes';
import Dashboard from 'views/pages/dashboard';
import Login from 'views/pages/login';
import Question from 'views/pages/question';
import PageURL from './PageURL';
import CreateClasses from 'views/pages/classes/Create';
import Users from 'views/pages/users';
import Test from 'views/pages/test';
import MakeTest from 'views/pages/classes/MakeTest';
import ListeningTest from 'views/pages/classes/MakeTest/ListeningTest';
import ReadingTest from 'views/pages/classes/MakeTest/ReadingTest';
import WritingTest from 'views/pages/classes/MakeTest/WritingTest';
import SpeakingTest from 'views/pages/classes/MakeTest/SpeakingTest';
import QuestionDetail from 'views/pages/question/QuestionDetail';
import TestForm from 'views/components/base/form/FormTest';
import { ExamPage } from 'views/pages/exam';

export interface RouteItem {
  path: string;
  element: LayoutComponent;
}

export const publicRoutes: RouteItem[] = [
  {
    path: '/',
    element: Login,
  },
  {
    path: '/login',
    element: Login,
  },
  {
    path: '/dashboard',
    element: Dashboard,
  },
  {
    path: PageURL.QUESTIONS,
    element: Question,
  },
  {
    path: PageURL.QUESTIONS_DETAIL,
    element: QuestionDetail,
  },
  {
    path: PageURL.CLASSES,
    element: Classes,
  },
  {
    path: PageURL.CREATE_CLASSES,
    element: CreateClasses,
  },
  {
    path: PageURL.MAKE_TEST,
    element: MakeTest,
  },
  {
    path: PageURL.MAKE_TEST_LISTENING,
    element: ListeningTest,
  },
  {
    path: PageURL.MAKE_TEST_READING,
    element: ReadingTest,
  },
  {
    path: PageURL.MAKE_TEST_WRITING,
    element: WritingTest,
  },
  {
    path: PageURL.MAKE_TEST_SPEAKING,
    element: SpeakingTest,
  },
  {
    path: PageURL.USERS,
    element: Users,
  },
  {
    path: PageURL.TESTS,
    element: Test,
  },
  {
    path: PageURL.TESTS_DETAIL,
    element: TestForm,
  },
  // {
  //   path: '/exam',
  //   element: ExamPage,
  // },
];

export const privateRoutes: RouteItem[] = [];
