import { notifications } from "@mantine/notifications";
import { STORAGE_USER_INFO } from "apps/constants";
import { FC, PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserType } from "types/user";

type Props = {
  routeRole: string
}

const GuardContainer: FC<PropsWithChildren & Props> = ({ children, routeRole }) => {
  const userJSON = localStorage.getItem(STORAGE_USER_INFO);
  const navigate = useNavigate();

  useEffect(() => {
    let parsedUser;

    if (userJSON) {
      try {
        parsedUser = JSON.parse(userJSON) as UserType;
      } catch (error) {
        console.error(error);
      }
    }

    if (!parsedUser || !parsedUser.role.includes(routeRole)) {
      // notifications.show({
      //   message: 'You do not have permission to access this page',
      //   color: 'red',
      // });
      navigate('/error/403')
    }
  }, [userJSON, routeRole])

  return (
    <>{children}</>
  );
}

GuardContainer.displayName = 'GuardContainer';
export default GuardContainer;
