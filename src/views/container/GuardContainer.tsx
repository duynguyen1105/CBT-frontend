import React, { FC, PropsWithChildren } from "react";

const GuardContainer: FC<PropsWithChildren> = props => {

  const { children } = props;

  return (
    <>{ children }</>
  );
}

GuardContainer.displayName = 'GuardContainer';
export default GuardContainer;
