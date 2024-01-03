import { LayoutComponent } from 'types/layout';
import Lessons from 'views/pages/lesson';
import Overview from 'views/pages/overview';
import Question from 'views/pages/question';
import QuestionDetail from 'views/pages/question/QuestionDetail';
import Test from 'views/pages/test';
import ClassPage from '../views/pages/class';
import ClassDetail from '../views/pages/class/ClassDetail';
import LessonDetail from '../views/pages/lesson/LessonDetail';
import MyTest from '../views/pages/myTests';
import { TestInfo } from '../views/pages/test/TestInfo';
import Users from '../views/pages/users';
import Workspace from '../views/pages/workspace';
import PageURL from './PageURL';
import Workspaces from 'views/pages/workspaces';

export interface RouteItem {
  path: string;
  element: LayoutComponent;
}

export const userRoutes: RouteItem[] = [
  {
    path: PageURL.MY_TESTS,
    element: MyTest,
  },
  {
    path: PageURL.LESSONS,
    element: Lessons,
  },
];

export const adminRoutes: RouteItem[] = [
  {
    path: PageURL.WORKSPACE,
    element: Workspace,
  },
  {
    path: PageURL.QUESTIONS,
    element: Question,
  },
  {
    path: PageURL.USERS,
    element: Users,
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
  {
    path: PageURL.LESSONS,
    element: Lessons,
  },
  {
    path: PageURL.LESSONS_DETAIL,
    element: LessonDetail,
  },
];

export const superAdminRoutes: RouteItem[] = [
  {
    path: PageURL.OVERVIEW,
    element: Overview,
  },
  {
    path: PageURL.WORKSPACES,
    element: Workspaces,
  },
];
