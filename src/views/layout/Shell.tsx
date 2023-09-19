import React, {FC, PropsWithChildren} from 'react';
import {AppShell, AppShellProps, createStyles} from '@mantine/core';

import Navbar from 'views/components/layout/Navbar/Navbar';
import Header from 'views/components/layout/Header/Header';

import defaultTheme from 'apps/theme';

export interface ShellProps extends AppShellProps {}

const {padding} = defaultTheme.layout;

const useStyle = createStyles<string, {}>((theme) => ({
  appShell: {
    '.mantine-AppShell-main': {
      transition: 'padding-left ease-in-out 0.3s',
    },
  },
}));

const Shell: FC<PropsWithChildren<ShellProps>> = (props) => {
  const {children, className, ...rest} = props;
  const {classes, cx} = useStyle({}, {name: 'AppLayout'});

  return (
    <AppShell
      {...rest}
      bg="#F9F9F9"
      padding={padding}
      navbar={<Navbar />}
      header={<Header />}
      className={cx(classes.appShell, className)}
    >
      {children}
    </AppShell>
  );
};

Shell.displayName = 'Shell';
export default Shell;
