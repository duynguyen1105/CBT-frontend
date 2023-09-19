import React, {FC, PropsWithChildren} from 'react';
import {MantineProvider} from '@mantine/core';
import {Notifications} from '@mantine/notifications';
import {RootState, useSelector} from 'store';
import themeConfig from 'apps/theme';

const ThemeContainer: FC<PropsWithChildren> = (props) => {
  const {children} = props;
  const {theme} = useSelector((state: RootState) => state.app);

  return (
    <MantineProvider
      theme={{
        ...themeConfig.variant[theme],
        colorScheme: theme,
      }}
      withGlobalStyles
      withCSSVariables
      withNormalizeCSS
    >
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  );
};

ThemeContainer.displayName = 'ThemeContainer';
export default ThemeContainer;
