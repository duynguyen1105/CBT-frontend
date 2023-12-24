import React, { FC } from 'react';
import { Navbar } from '@mantine/core';
import { useSelector } from 'store';
import NavList from './NavList';
import defaultTheme from 'apps/theme';
import { useGetUserInfo } from 'hooks/useGetUserInfo';

const { padding } = defaultTheme.layout;

const NavPrimary: FC = () => {
  const { primary, show } = useSelector((state) => state.app.navbar);
  const { role } = useGetUserInfo();
  const primaryNav = primary.filter((nav) => nav.roles.includes(role));

  if (show !== 'primary') {
    return null;
  }

  return (
    <Navbar.Section grow py={padding}>
      <NavList list={primaryNav} />
    </Navbar.Section>
  );
};

NavPrimary.displayName = 'Layout.Navbar.Primary';
export default NavPrimary;
