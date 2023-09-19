import React, { forwardRef, PropsWithChildren } from 'react';
import { Box, BoxProps, createStyles } from '@mantine/core';
import defaultTheme from 'apps/theme';

export interface MainCardProps extends BoxProps {}

const { padding } = defaultTheme.layout;

const useStyle = createStyles<string, {}>((theme) => ({
  root: {
    padding,
    borderRadius: 8,
    backgroundColor: theme.colors.gray[8]
  }
}));

const MainCard = forwardRef<HTMLDivElement, PropsWithChildren<MainCardProps>>(
  function MainCard(props, ref) {

    const { children, className, ...rest } = props;
    const { classes, cx } = useStyle({}, { name: 'Card' });

    return (
      <Box {...rest} ref={ref} className={cx(classes.root, className)}>
        {children}
      </Box>
    );
  }
);

MainCard.displayName = 'MainCard';
export default MainCard;
