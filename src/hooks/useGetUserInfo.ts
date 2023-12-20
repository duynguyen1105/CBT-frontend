import { COOKIE_AUTH_TOKEN, STORAGE_USER_INFO } from 'apps/constants';
import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { UserType } from 'types/user';

export const useGetUserInfo = () => {
  const userInfoFromLocalStorage = localStorage.getItem(STORAGE_USER_INFO);
  const userInfoFromCookies = Cookies.get(COOKIE_AUTH_TOKEN);
  const userInfo: UserType = useMemo(() => {
    if (userInfoFromLocalStorage) {
      return JSON.parse(userInfoFromLocalStorage);
    }
    if (userInfoFromCookies) {
      return JSON.parse(userInfoFromCookies);
    }
    return null;
  }, [userInfoFromLocalStorage, userInfoFromCookies]);

  return userInfo;
};
