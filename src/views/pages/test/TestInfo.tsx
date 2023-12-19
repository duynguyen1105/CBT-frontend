import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'store';
import { TestType } from '../../../types/test';
import FormTest from '../../components/base/form/FormTest';

export const TestInfo = () => {
  const { workspace } = useSelector((state) => state.app.userInfo);
  const { test_id } = useParams();

  const [testInfo, setTestInfo] = useState<TestType>();

  const fetchTestInfo = async () => {
    if (!test_id || test_id === 'new') return;
    const res = await callApiWithAuth(
      getApiPath(PATHS.TESTS.GET_INFO, { workspaceName: workspace, testId: test_id }),
      'GET'
    );

    if (res.ok) {
      console.log(res.data);

      setTestInfo(res.data);
    }
  };

  useEffect(() => {
    fetchTestInfo();
  }, []);

  return <FormTest testInfo={testInfo} />;
};
