import React, { FC } from 'react';
import { Navbar } from '@mantine/core';
import { useSelector } from 'store';
import NavList from './NavList';
import defaultTheme from 'apps/theme';

const { padding } = defaultTheme.layout;

const NavPrimary: FC = () => {

  const { primary, show } = useSelector(state => state.app.navbar);

  if (show !== 'primary') {
    return null;
  }

  return (
    <Navbar.Section grow py={padding}>
      <NavList list={primary} />
    </Navbar.Section>
  );
}

NavPrimary.displayName = 'Layout.Navbar.Primary';
export default NavPrimary;
