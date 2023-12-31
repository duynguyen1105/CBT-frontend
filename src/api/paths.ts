const USERS = {
  GET_LIST: 'users/{workspaceName}?search={search}&page={page}&sort={sort}',
  DELETE_MANY: 'users/{workspaceName}/delete',
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  ADD_TO_WORKSPACE: 'users/{workspaceName}/addUser',
  DELETE: 'users/{workspaceName}/{userId}',
  UPDATE: 'users/{workspaceName}/{userId}',
};

const CLASSES = {
  GET_LIST: 'class/{workspaceName}?search={search}&page={page}&sort={sort}',
  GET_INFO: 'class/{workspaceName}/{classId}',
};

const WORKSPACES = {
  GET_ALL_WORKSPACES: 'workspaces?search={search}&page={page}&sort={sort}',
  CREATE_WORKSPACE: 'workspaces',
  GET_LIST_CLASSES: 'workspaces/{workspace_id}/classes',
  CREATE_CLASS: 'workspaces/{workspace_id}/classes',
  GET_DETAIL: 'workspaces/{workspaceName}',
};

const QUESTIONS = {
  GET_LIST: 'questions/{workspaceName}?search={search}&page={page}&sort={sort}',
  DELETE_MANY: 'questions/{workspaceName}/delete',
  CREATE: 'questions/{workspaceName}/createQuestion',
  GET_INFO: 'questions/{workspaceName}/{questionId}',
  UPDATE: 'questions/{workspaceName}/{questionId}',
  DELETE: 'questions/{workspaceName}/{questionId}',
  RECOMMEND_QUESTIONS:
    'questions/{workspaceName}/recommendQuestions?category={category}&label={label}&size={size}',
};

const TESTS = {
  GET_LIST: 'tests/{workspaceName}?search={search}&page={page}&sort={sort}',
  DELETE_MANY: 'tests/{workspaceName}/delete',
  CREATE: 'tests/{workspaceName}/createTest',
  GET_INFO: 'tests/{workspaceName}/{testId}',
  UPDATE: 'tests/{workspaceName}/{testId}',
  DELETE: 'tests/{workspaceName}/{testId}',
  GET_MY_TESTS: 'tests/{workspaceName}/myTests/{userId}',
  SUBMIT_TEST: 'tests/{workspaceName}/doingTest/{userId}/{testId}',
};

const CATEGORIES = {
  GET_LIST: 'categories/{workspaceName}',
  CREATE: 'categories/{workspaceName}/create',
  DELETE: 'categories/{workspaceName}/{id}',
};

const LABELS = {
  GET_LIST: 'labels/{workspaceName}',
  CREATE: 'labels/{workspaceName}/create',
  DELETE: 'labels/{workspaceName}/{id}',
};

const LESSONS = {
  GET_LIST: 'lessons/{workspaceName}',
  CREATE: 'lessons/{workspaceName}/createLesson',
  DELETE: 'lessons/{workspaceName}/{lessonId}',
  GET_INFO: 'lessons/{workspaceName}/{lessonId}',
  UPDATE: 'lessons/{workspaceName}/{lessonId}',
};

export const PATHS = {
  USERS,
  WORKSPACES,
  QUESTIONS,
  CATEGORIES,
  LABELS,
  TESTS,
  CLASSES,
  LESSONS,
};
