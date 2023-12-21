import { notifications } from '@mantine/notifications';
import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import PageURL from 'apps/PageURL';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { LayoutComponent } from 'types/layout';
import { QuestionType } from 'types/question';
import QuestionForm from 'views/components/base/form/Question/FormQuestion';
import Shell from 'views/layout/Shell';

const QuestionDetail: LayoutComponent = () => {
  const { workspace } = useGetUserInfo();
  const params = useParams();
  const navigate = useNavigate();
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

      if (res.data) {
        setQuestionDetail(res.data);
        notifications.show({
          message: 'Create question successfully',
          color: 'green',
        });
        navigate(PageURL.QUESTIONS)
      } else {
        notifications.show({
          message: res.message,
          color: 'red',
        });
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
