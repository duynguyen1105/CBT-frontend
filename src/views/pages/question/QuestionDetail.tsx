import QuestionForm from 'views/components/base/form/Question/FormQuestion';
import {useParams} from 'react-router';
import {useEffect, useState} from 'react';
import {callApiWithAuth, getApiPath} from 'api/utils';
import {PATHS} from 'api/paths';
import {IQuestion, IQuestionAPI, QUESTIONTYPE} from 'types/question';

function QuestionDetail() {
  const params = useParams();
  const questionId = params.question_id;
  const [questionDetail, setQuestionDetail] = useState<IQuestionAPI | undefined>();

  useEffect(() => {
    if (questionId !== '-') {
      fetchQuestionDetail(questionId!);
    }
  }, [questionId]);

  const handleSaveQuestion = async (question: IQuestion) => {
    const res = await callApiWithAuth(getApiPath(PATHS.QUESTIONS.GET_LIST), 'POST', {
      data: {
        ...question,
        type: 'single',
        answers: question.answers.map((ans) => ({
          ...ans,
          right: ans.right ? 'Y' : 'N',
        })),
      },
    });

    if (res) {
      // const newQuestion = {...res.data};
      setQuestionDetail(res.data);
    }
  };

  const fetchQuestionDetail = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.QUESTIONS.GET_DETAIL.replace(':question_id', id)),
      'GET'
    );

    if (res) {
      setQuestionDetail(res.data);
    }
  };
  return <QuestionForm content={questionDetail} onSaveQuestion={handleSaveQuestion} />;
}

export default QuestionDetail;
