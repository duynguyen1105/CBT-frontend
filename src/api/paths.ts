const USERS = {
  GET_LIST: 'users/{workspaceName}',
  DELETE_MANY: 'users/{workspaceName}/delete',
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
  ADD_TO_WORKSPACE: 'users/{workspaceName}/addUser',
  DELETE: 'users/{workspaceName}/{userId}',
};

const WORKSPACES = {
  GET_LIST_CLASSES: 'workspaces/{workspace_id}/classes',
  CREATE_CLASS: 'workspaces/{workspace_id}/classes',
};
const QUESTIONS = {
  GET_LIST: 'questions/',
  GET_DETAIL: 'questions/:question_id',
  CATEGORY: 'questions/categories',
};

export const PATHS = {
  USERS,
  WORKSPACES,
  QUESTIONS,
};
