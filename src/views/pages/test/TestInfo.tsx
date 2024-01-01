import { PATHS } from 'api/paths';
import { callApiWithAuth, getApiPath } from 'api/utils';
import { useGetUserInfo } from 'hooks/useGetUserInfo';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { TestType } from '../../../types/test';
import FormTest from '../../components/base/form/FormTest';

export const TestInfo = () => {
  const { workspace } = useGetUserInfo();
  const { test_id } = useParams();

  const [testInfo, setTestInfo] = useState<TestType>();

  const fetchTestInfo = async () => {
    if (!test_id || test_id === 'new') return;
    const res = await callApiWithAuth(
      getApiPath(PATHS.TESTS.GET_INFO, { workspaceName: workspace, testId: test_id }),
      'GET'
    );

    if (res.ok) {
      setTestInfo(res.data);
    }
  };

  useEffect(() => {
    fetchTestInfo();
  }, []);

  return <FormTest testInfo={testInfo} />;
};
