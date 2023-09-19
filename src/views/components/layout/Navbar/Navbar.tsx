import {createStyles, Navbar as MNavbar} from '@mantine/core';
import {FC} from 'react';

import defaultTheme from 'apps/theme';
import {useSelector} from 'store';

import NavFooter from './NavFooter';
import NavPrimary from './NavPrimary';

const {width, collapsedWidth} = defaultTheme.layout.navbar;

const useStyle = createStyles<string, {}>(() => ({
  navbar: {
    transition: 'all ease-in-out 0.3s',
    borderRight: 'none',
  },
}));

const Navbar: FC = () => {
  const {collapsed} = useSelector((state) => state.app.navbar);
  const {classes} = useStyle({}, {name: 'LayoutNavbar'});

  return (
    <MNavbar p={0} className={classes.navbar} width={{base: collapsed ? collapsedWidth : width}}>
      <NavPrimary />
      <NavFooter />
    </MNavbar>
  );
};

Navbar.displayName = 'Layout.Navbar';
export default Navbar;
