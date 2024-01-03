import { STORAGE_USER_INFO } from 'apps/constants';
import { primaryNavbar } from 'apps/navbar';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { slice } from 'slices/app';
import { UserType } from 'types/user';

type Props = {
  routeRole: string[];
};

const GuardContainer: FC<PropsWithChildren & Props> = ({ children, routeRole }) => {
  const userJSON = localStorage.getItem(STORAGE_USER_INFO);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let parsedUser: UserType;

    if (userJSON) {
      try {
        parsedUser = JSON.parse(userJSON) as UserType;
        if (!parsedUser || !routeRole.includes(parsedUser.role)) {
          // notifications.show({
          //   message: 'You do not have permission to access this page',
          //   color: 'red',
          // });
          navigate('/error/403');
        }
        const navBar = primaryNavbar.filter((item) => item.roles.includes(parsedUser.role));

        dispatch(slice.actions.changeNavbar(navBar));
      } catch (error) {
        console.error(error);
      }
    }
  }, [userJSON, routeRole]);

  return <>{children}</>;
};

GuardContainer.displayName = 'GuardContainer';
export default GuardContainer;
