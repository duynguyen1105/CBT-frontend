import React, { FC } from 'react';
import { Navbar } from '@mantine/core';
import defaultTheme from 'apps/theme';
import { useSelector } from 'store';

const { padding } = defaultTheme.layout;

const NavSecondary: FC = () => {

  const { show } = useSelector(state => state.app.navbar);

  if (show !== 'secondary') {
    return null;
  }

  return (
    <Navbar.Section grow py={padding}>

    </Navbar.Section>
  );
}

NavSecondary.displayName = 'Layout.Navbar.Secondary';
export default NavSecondary;
