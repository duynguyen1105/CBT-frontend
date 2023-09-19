import React, { FC, PropsWithChildren } from 'react';

const AuthContainer: FC<PropsWithChildren> = props => {

  const { children } = props;

  return (
    <>{ children }</>
  );
}

AuthContainer.displayName = 'AuthContainer';
export default AuthContainer;
