import { notifications } from '@mantine/notifications';
import { COOKIE_AUTH_TOKEN } from 'apps/constants';
import Cookies from 'js-cookie';
import { FC, PropsWithChildren, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

const AuthContainer: FC<PropsWithChildren> = () => {
  const token = Cookies.get(COOKIE_AUTH_TOKEN);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if (!token) {
      notifications.show({
        message: 'You are not logged in!',
        color: 'red',
      })
      navigate('/login', { state: { from: location.pathname } })
    }
  }, [])

  return (
    <Outlet />
  );
}

AuthContainer.displayName = 'AuthContainer';
export default AuthContainer;
