import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'store';
import { LayoutComponent } from 'types/layout';
import { QuestionType } from 'types/question';
import QuestionForm from 'views/components/base/form/Question/FormQuestion';
import Shell from 'views/layout/Shell';

const QuestionDetail: LayoutComponent = () => {
  const { workspace } = useSelector((state) => state.app.userInfo);
  const params = useParams();
  const questionId = params.question_id;
  const [questionDetail, setQuestionDetail] = useState<QuestionType | undefined>();

  useEffect(() => {
    if (questionId !== '-') {
      fetchQuestionDetail(questionId!);
    }
  }, [questionId]);

  const handleSaveQuestion = async (question: QuestionType) => {
    if (questionId && questionId !== '-') {
      await callApiWithAuth(
        getApiPath(PATHS.QUESTIONS.UPDATE, { workspaceName: workspace, questionId: questionId }),
        'PUT',
        {
          data: question,
        }
      );
    } else {
      const res = await callApiWithAuth(
        getApiPath(PATHS.QUESTIONS.CREATE, { workspaceName: workspace }),
        'POST',
        {
          data: question,
        }
      );

      if (res) {
        setQuestionDetail(res.data);
      }
    }
  };

  const fetchQuestionDetail = async (id: string) => {
    const res = await callApiWithAuth(
      getApiPath(PATHS.QUESTIONS.GET_INFO, { workspaceName: workspace, questionId: id }),
      'GET'
    );

    if (res) {
      setQuestionDetail(res.data);
    }
  };
  return <QuestionForm content={questionDetail} onSaveQuestion={handleSaveQuestion} />;
};

QuestionDetail.layout = Shell;
QuestionDetail.displayName = 'Page.Questions';

export default QuestionDetail;
