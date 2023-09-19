import React, { forwardRef, PropsWithChildren } from "react";
import { Title as MTitle, TitleProps } from '@mantine/core';
import useTranslate from "hooks/useTranslate";

const Title = forwardRef<HTMLHeadingElement, PropsWithChildren<TitleProps>>(
  function Title(props, ref){

    const { children, ...rest } = props;
    const child = useTranslate(children);

    return (
      <MTitle {...rest} ref={ref}>
        {child}
      </MTitle>
    )
  }
);

Title.displayName = 'Title';
export type { TitleProps };
export default Title;
