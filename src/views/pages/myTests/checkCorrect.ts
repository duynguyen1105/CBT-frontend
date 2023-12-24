import { QUESTION_TYPE, QuestionType } from 'types/question';

export const checkCorrectByType = (question: QuestionType, answer: any) => {
  switch (question.type) {
    case QUESTION_TYPE.DropdownSelect: {
      return question.blankAnswer?.every((ans, index) => {
        return ans[0].content === answer[index];
      });
    }
    case QUESTION_TYPE.FillInGap: {
      return question.blankAnswer?.every((ans, index) => {
        return ans[0].content === answer[index];
      });
    }
    case QUESTION_TYPE.SelectMany:
      return (answer || []).every((ans: any) => Boolean(question.answer[ans]?.isCorrect));
    case QUESTION_TYPE.SelectOne:
      return Boolean(question.answer[answer]?.isCorrect);
    default:
      break;
  }
};
