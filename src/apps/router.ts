import { LayoutComponent } from 'types/layout';
import Dashboard from 'views/pages/dashboard';
import Question from 'views/pages/question';
import QuestionDetail from 'views/pages/question/QuestionDetail';
import Test from 'views/pages/test';
import Users from 'views/pages/users';
import ClassPage from '../views/pages/class';
import ClassDetail from '../views/pages/class/ClassDetail';
import MyTest from '../views/pages/myTests';
import { TestInfo } from '../views/pages/test/TestInfo';
import PageURL from './PageURL';

export interface RouteItem {
  path: string;
  element: LayoutComponent;
}

export const userRoute: RouteItem[] = [
  // {
  //   path: '/login',
  //   element: Login,
  // },
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
    element: ClassPage,
  },
  {
    path: PageURL.CLASS_DETAIL,
    element: ClassDetail,
  },
  // {
  //   path: PageURL.USERS,
  //   element: Users,
  // },
  {
    path: PageURL.TESTS,
    element: Test,
  },
  {
    path: PageURL.TESTS_DETAIL,
    element: TestInfo,
  },
  {
    path: PageURL.MY_TESTS,
    element: MyTest,
  },
  // {
  //   path: '/exam',
  //   element: ExamPage,
  // },
];

export const adminRoutes: RouteItem[] = [
  {
    path: PageURL.USERS,
    element: Users,
  },
];

export const superAdminRoutes: RouteItem[] = [];
