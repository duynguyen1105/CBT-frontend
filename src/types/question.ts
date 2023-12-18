import { UserType } from './user';

export enum QUESTION_TYPE {
  SelectOne = 'SELECT_ONE',
  SelectMany = 'SELECT_MANY',
  Matching = 'MATCHING',
  DropdownSelect = 'DROPDOWN_SELECT',
  FillInGap = 'FILL_IN_THE_GAPS',
  Essay = 'ESSAY',
  Record = 'RECORD',
}

export const QUESTION_TYPE_LABEL = {
  [QUESTION_TYPE.SelectOne]: 'Select One',
  [QUESTION_TYPE.SelectMany]: 'Select Many',
  [QUESTION_TYPE.Matching]: 'Matching',
  [QUESTION_TYPE.DropdownSelect]: 'Dropdown Select',
  [QUESTION_TYPE.FillInGap]: 'Fill in the gaps',
  [QUESTION_TYPE.Essay]: 'Essay',
  [QUESTION_TYPE.Record]: 'Record',
};

export type IQuestionListItem = {
  id: string;
  content: string;
  category_id: string;
  type: string;
  active: string;
  level: string;
  score: string;
};

export type ExamType = {
  _id: string;
  // title: string;
  // description: string;
  // timeSetting?: {
  //   startTime?: Date;
  //   finishTime?: Date;
  //   duration?: number;
  // };
  // password?: string;
  // displayOptions?: {
  //   afterSubmit?: {
  //     showScore?: boolean;
  //     showAnswer?: boolean;
  //     showFeedback?: boolean;
  //   };
  //   afterDeadline?: {
  //     showScore?: boolean;
  //     showAnswer?: boolean;
  //     showFeedback?: boolean;
  //   };
  // };
  questions: QuestionType[];
};

export type ExamResultType = {
  _id: string;
  answers: any[];
};

export interface QuestionType {
  _id?: string;
  title: string;
  content: string;
  type: QUESTION_TYPE;
  active: string;
  level?: string;
  score?: number;
  category_id: string;
  audio?: File | null;
  answer: AnswerType[];
  blankAnswer?: AnswerType[][];
}
export interface AnswerType {
  id?: string;
  content: string;
  isCorrect: boolean;
  order: number;
  scorePercent: number;
  penaltyScore: number;
  feedback: string;
}

export interface IAnswerAPI {
  id?: string;
  content: string;
  isCorrect: boolean;
  order: number;
  scorePercent: number;
  penaltyScore: number;
  feedback: string;
}

//fakedata
export const fakeSelectOne: QuestionType = {
  title: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  content: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  type: QUESTION_TYPE.SelectOne,
  active: 'Y',
  level: 'normal',
  category_id: '1',
  answer: [
    {
      content: 'He is postponing an appointment',
      isCorrect: true,
      order: 0,
      scorePercent: 100,
      penaltyScore: 0,
      feedback: 'This is right answer',
    },
    {
      content: 'He needs a record of the report',
      isCorrect: false,
      order: 1,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      isCorrect: false,
      order: 2,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He will recruit some accountants',
      isCorrect: false,
      order: 3,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
  ],
};

export const fakeSelectMany: QuestionType = {
  title: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  content: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  type: QUESTION_TYPE.SelectMany,
  active: 'Y',
  level: 'normal',
  category_id: '1',
  answer: [
    {
      content: 'He is postponing an appointment',
      isCorrect: true,
      order: 0,
      scorePercent: 100,
      penaltyScore: 0,
      feedback: 'This is right answer',
    },
    {
      content: 'He needs a record of the report',
      isCorrect: false,
      order: 1,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      isCorrect: true,
      order: 2,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He will recruit some accountants',
      isCorrect: false,
      order: 3,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      isCorrect: true,
      order: 4,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He will recruit some accountants',
      isCorrect: false,
      order: 5,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
  ],
};

export const fakeDropdownSelect: QuestionType = {
  title: 'Titlte',
  category_id: '1',
  active: 'Y',
  content: '<p>eqweqw @dropdown:answer:1 @dropdown:answer:2</p>',
  type: QUESTION_TYPE.DropdownSelect,
  answer: [
    {
      content: '',
      penaltyScore: 0,
      order: 0,
      scorePercent: 100,
      isCorrect: true,
      feedback: '',
    },
  ],
  blankAnswer: [
    [
      {
        content: 'eqewqw',
        penaltyScore: 0,
        order: 0,
        scorePercent: 100,
        isCorrect: true,
        feedback: ' eqweqweqw',
      },
      {
        content: 'ẻquheoriuh',
        penaltyScore: 0,
        order: 0,
        scorePercent: 0,
        isCorrect: false,
        feedback: 'ỉugiq8oey7grfkjhvwekj',
      },
    ],
    [
      {
        content: '21765386',
        penaltyScore: 0,
        order: 0,
        scorePercent: 0,
        isCorrect: false,
        feedback: 'ùadjhgaj',
      },
      {
        content: 'eqwe',
        penaltyScore: 0,
        order: 0,
        scorePercent: 100,
        isCorrect: true,
        feedback: '12312312',
      },
    ],
  ],
};
// export const fakeDropdownSelect: QuestionType = {
//   title: 'What does the man imply when he says "Have you seen the interview questions we use?"',
//   content:
//     'What does the @dropdown:answer imply when he says "Have you @dropdown:answer the interview questions we use?"',
//   type: QUESTION_TYPE.DropdownSelect,
//   active: 'Y',
//   level: 'normal',
//   category_id: '1',
//   answer: [
//     {
//       content: 'He is postponing an appointment',
//       isCorrect: true,
//       order: 0,
//       scorePercent: 100,
//       penaltyScore: 0,
//       feedback: 'This is right answer',
//     },
//     {
//       content: 'He needs a record of the report',
//       isCorrect: false,
//       order: 1,
//       scorePercent: 0,
//       penaltyScore: 0,
//       feedback: 'This is wrong answer',
//     },
//     {
//       content: 'He wants her to help him with the questions',
//       isCorrect: true,
//       order: 2,
//       scorePercent: 0,
//       penaltyScore: 0,
//       feedback: 'This is wrong answer',
//     },
//     {
//       content: 'He will recruit some accountants',
//       isCorrect: false,
//       order: 3,
//       scorePercent: 0,
//       penaltyScore: 0,
//       feedback: 'This is wrong answer',
//     },
//     {
//       content: 'He wants her to help him with the questions',
//       isCorrect: true,
//       order: 4,
//       scorePercent: 0,
//       penaltyScore: 0,
//       feedback: 'This is wrong answer',
//     },
//     {
//       content: 'He will recruit some accountants',
//       isCorrect: false,
//       order: 5,
//       scorePercent: 0,
//       penaltyScore: 0,
//       feedback: 'This is wrong answer',
//     },
//   ],
// };

export const fakeFillInGap: QuestionType = {
  title: 'What does the man imply when he says "Have you seen the interview questions we use?"',
  content: '<p>eqweqw @dropdown:answer:1 @dropdown:answer:2</p>',
  type: QUESTION_TYPE.FillInGap,
  active: 'Y',
  level: 'normal',
  category_id: '1',
  answer: [
    {
      content: 'He is postponing an appointment',
      isCorrect: true,
      order: 0,
      scorePercent: 100,
      penaltyScore: 0,
      feedback: 'This is right answer',
    },
    {
      content: 'He needs a record of the report',
      isCorrect: true,
      order: 1,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
    {
      content: 'He wants her to help him with the questions',
      isCorrect: true,
      order: 2,
      scorePercent: 0,
      penaltyScore: 0,
      feedback: 'This is wrong answer',
    },
  ],
};
