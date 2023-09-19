export enum QUESTIONTYPE {
  SelectOne = 'selectOne',
  SelectMany = 'selectMany',
  Matching = 'matching',
  Dropdown = 'dropdown',
  FillInGap = 'fillInGap',
  Essay = 'essay',
  Record = 'record',
}

export type IQuestionListItem = {
  id: string;
  content: string;
  category_id: string;
  type: string;
  active: string;
  level: string;
  score: string;
};

export interface IQuestion {
  id?: string;
  title: string;
  content: string;
  type: QUESTIONTYPE;
  active: string;
  level?: string;
  score?: number;
  category_id: string;
  audio?: File | null;
  answers: IAnswer[];
}
export interface IAnswer {
  id?: string;
  content: string;
  right: boolean;
  order: number;
  scorePercent: number;
  penaltyScore: number;
  feedback: string;
}
export interface IQuestionAPI {
  id?: string;
  title: string;
  content: string;
  type: QUESTIONTYPE;
  active: string;
  level?: string;
  score?: number;
  category_id: string;
  audio?: File | null;
  answers: IAnswerAPI[];
}
export interface IAnswerAPI {
  id?: string;
  content: string;
  right: 'Y' | 'N';
  order: number;
  scorePercent: number;
  penaltyScore: number;
  feedback: string;
}

//fakedata
export const fakeSelectOne: IQuestion = {
  title: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  content: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  type: QUESTIONTYPE.SelectOne,
  active: 'Y',
  level: 'normal',
  category_id: '1',
  answers: [
    {
      content: 'He is postponing an appointment',
      right: true,
      order: 0,
      scorePercent: 100,
      penaltyScore: 0,
      feedback: 'This is right answer',
    },
    {
      content: 'He needs a record of the report',
      right: false,
      order: 1,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      right: false,
      order: 2,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He will recruit some accountants',
      right: false,
      order: 3,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
  ],
};

export const fakeSelectMany: IQuestion = {
  title: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  content: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  type: QUESTIONTYPE.SelectMany,
  active: 'Y',
  level: 'normal',
  category_id: '1',
  answers: [
    {
      content: 'He is postponing an appointment',
      right: true,
      order: 0,
      scorePercent: 100,
      penaltyScore: 0,
      feedback: 'This is right answer',
    },
    {
      content: 'He needs a record of the report',
      right: false,
      order: 1,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      right: true,
      order: 2,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He will recruit some accountants',
      right: false,
      order: 3,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      right: true,
      order: 4,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He will recruit some accountants',
      right: false,
      order: 5,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
  ],
};

export const fakeDropdownSelect: IQuestion = {
  title: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  content:
    'What does the <ans></ans> imply when he says "Have you <ans></ans> the interview questions we use?"',
  type: QUESTIONTYPE.Dropdown,
  active: 'Y',
  level: 'normal',
  category_id: '1',
  answers: [
    {
      content: 'He is postponing an appointment',
      right: true,
      order: 0,
      scorePercent: 100,
      penaltyScore: 0,
      feedback: 'This is right answer',
    },
    {
      content: 'He needs a record of the report',
      right: false,
      order: 1,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      right: true,
      order: 2,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He will recruit some accountants',
      right: false,
      order: 3,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      right: true,
      order: 4,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He will recruit some accountants',
      right: false,
      order: 5,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
  ],
};

export const fakeFillInGap: IQuestion = {
  title: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  content:
    'What does the <ans></ans> imply when he says "Have you <ans></ans> the interview questions we use?"',
  type: QUESTIONTYPE.FillInGap,
  active: 'Y',
  level: 'normal',
  category_id: '1',
  answers: [
    {
      content: 'He is postponing an appointment',
      right: true,
      order: 0,
      scorePercent: 100,
      penaltyScore: 0,
      feedback: 'This is right answer',
    },
    {
      content: 'He needs a record of the report',
      right: true,
      order: 1,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      right: true,
      order: 2,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
  ],
};
