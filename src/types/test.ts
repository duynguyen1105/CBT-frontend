import { QuestionType } from './question';

export interface Test {
  setting: TestSetting;
  content: TestContent;
}

export interface TestSetting {
  general: TestSettingGeneral;
  schedule: TestSettingSchedule;
  score: TestSettingScore;
  displayOptions: TestSettingDisplayOptions;
  security?: TestSettingSecurity;
}
export interface TestSettingGeneral {
  title: string;
  description?: string;
}
export interface TestSettingSchedule {
  startTime: Date;
  finishTime: Date;
  timeLimit: number;
}

export interface TestSettingScore {
  maxScore: number;
  minScore: number;
  submissionLimit: number;
  scoreMethod: string;
}

export interface TestSettingDisplayOptions {
  whenDoing: string[];
  afterSubmit: string[];
  afterClosed: string[];
}

export interface TestSettingSecurity {
  password: string;
}

export interface TestContent {
  pages: TestContentPage[];
}

export interface TestContentPage {
  pageContent: (IDescription | QuestionType | ISection)[];
}

export interface IDescription {
  description: string;
}

export interface ISection {
  vertical: boolean;
  parts: ISectionPart[];
}

export interface ISectionPart {
  partContent: (IDescription | QuestionType | ISection)[];
}

export type TestType = {
  _id?: string;
  title: string;
  description: string;
  timeSetting: {
    startTime: Date;
    finishTime: Date;
    duration: number;
  };
  password?: string;
  displayOptions?: {
    afterSubmit?: {
      showScore?: boolean;
      showAnswer?: boolean;
      showFeedback?: boolean;
    };
    afterDeadline?: {
      showScore?: boolean;
      showAnswer?: boolean;
      showFeedback?: boolean;
    };
  };
  questions: QuestionType[];
  classAssigned?: any;
};

export const TEST_STATUS = {
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  FINISHED: 'FINISHED',
};

export type TestStatus = (typeof TEST_STATUS)[keyof typeof TEST_STATUS];
