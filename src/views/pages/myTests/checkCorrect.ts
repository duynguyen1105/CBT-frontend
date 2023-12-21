import { QUESTION_TYPE, QuestionType } from 'types/question';

export const checkCorrectByType = (question: QuestionType, answer: any) => {
  switch (question.type) {
    // case QUESTION_TYPE.DropdownSelect:
    //   return question.answer[0].content === answer;
    // case QUESTION_TYPE.FillInGap:
    //   return question.answer[0].content === answer;
    case QUESTION_TYPE.SelectMany:
      return (answer || []).every((ans: any) => Boolean(question.answer[ans]?.isCorrect));
    case QUESTION_TYPE.SelectOne:
      return Boolean(question.answer[answer]?.isCorrect);
    default:
      break;
  }
};
