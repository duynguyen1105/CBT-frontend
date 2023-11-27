const USERS = {
  GET_LIST: 'users/{workspaceName}?search={search}&page={page}&sort={sort}',
  DELETE_MANY: 'users/{workspaceName}/delete',
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  ADD_TO_WORKSPACE: 'users/{workspaceName}/addUser',
  DELETE: 'users/{workspaceName}/{userId}',
  UPDATE: 'users/{workspaceName}/{userId}',
};

const WORKSPACES = {
  GET_LIST_CLASSES: 'workspaces/{workspace_id}/classes',
  CREATE_CLASS: 'workspaces/{workspace_id}/classes',
};

const QUESTIONS = {
  GET_LIST: 'questions/{workspaceName}?search={search}&page={page}&sort={sort}',
  DELETE_MANY: 'questions/{workspaceName}/delete',
  CREATE: 'questions/{workspaceName}/createQuestion',
  GET_INFO: 'questions/{workspaceName}/{questionId}',
  UPDATE: 'questions/{workspaceName}/{questionId}',
  DELETE: 'questions/{workspaceName}/{questionId}',
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

export const PATHS = {
  USERS,
  WORKSPACES,
  QUESTIONS,
  CATEGORIES,
  LABELS,
};
