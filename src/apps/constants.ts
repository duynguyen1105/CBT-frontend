import { QUESTION_TYPE } from 'types/question';

export const APP_LANG_DEFAULT = 'vi';

export const IS_PROD = process.env.NODE_ENV === 'production';

export const COOKIE_AUTH_TOKEN = 'cbt_user_token';

export const STORAGE_USER_INFO = 'cbt_user_info';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const QUESTION_ELEMENT = {
  TITLE: 'title',
  CATEGORY: 'label',
  LABEL: 'category',
  AUDIO: 'audio',
  CONTENT: 'content',
  ANSWER: 'answer',
  BLANK_ANSWER: 'blank_answer',
};

export const ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN_WORKSPACE: 'ADMIN_WORKSPACE',
  USER: 'USER',
};

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

export const QUESTION_ELEMENT_BY_TYPE = {
  [QUESTION_TYPE.SelectOne]: [
    QUESTION_ELEMENT.TITLE,
    QUESTION_ELEMENT.CATEGORY,
    QUESTION_ELEMENT.LABEL,
    QUESTION_ELEMENT.CONTENT,
    QUESTION_ELEMENT.ANSWER,
  ],
  [QUESTION_TYPE.SelectMany]: [
    QUESTION_ELEMENT.TITLE,
    QUESTION_ELEMENT.CATEGORY,
    QUESTION_ELEMENT.LABEL,
    QUESTION_ELEMENT.CONTENT,
    QUESTION_ELEMENT.ANSWER,
  ],
  [QUESTION_TYPE.Matching]: [
    QUESTION_ELEMENT.TITLE,
    QUESTION_ELEMENT.CATEGORY,
    QUESTION_ELEMENT.LABEL,
    QUESTION_ELEMENT.CONTENT,
    QUESTION_ELEMENT.ANSWER,
  ],
  [QUESTION_TYPE.DropdownSelect]: [
    QUESTION_ELEMENT.TITLE,
    QUESTION_ELEMENT.CATEGORY,
    QUESTION_ELEMENT.LABEL,
    QUESTION_ELEMENT.CONTENT,
    QUESTION_ELEMENT.BLANK_ANSWER,
  ],
  [QUESTION_TYPE.FillInGap]: [
    QUESTION_ELEMENT.TITLE,
    QUESTION_ELEMENT.CATEGORY,
    QUESTION_ELEMENT.LABEL,
    QUESTION_ELEMENT.CONTENT,
    QUESTION_ELEMENT.BLANK_ANSWER,
  ],
  [QUESTION_TYPE.Essay]: [
    QUESTION_ELEMENT.TITLE,
    QUESTION_ELEMENT.CATEGORY,
    QUESTION_ELEMENT.LABEL,
    QUESTION_ELEMENT.CONTENT,
    QUESTION_ELEMENT.ANSWER,
  ],
  [QUESTION_TYPE.Record]: [
    QUESTION_ELEMENT.TITLE,
    QUESTION_ELEMENT.CATEGORY,
    QUESTION_ELEMENT.LABEL,
    QUESTION_ELEMENT.AUDIO,
    QUESTION_ELEMENT.CONTENT,
    QUESTION_ELEMENT.ANSWER,
  ],
};

export const LIMIT = {
  USERS: 100,
  QUESTIONS: 100,
  TESTS: 50,
};
