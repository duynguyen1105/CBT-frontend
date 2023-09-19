import React, {FC} from 'react';
import {createStyles, Navbar} from '@mantine/core';
import {IconChevronsLeft} from '@tabler/icons-react';

import {slice} from 'slices/app';
import {useDispatch, useSelector} from 'store';

import NavLink from 'views/components/base/NavLink';

export interface NavFooterStyleProps {
  collapsed: boolean;
}

const useStyle = createStyles<string, NavFooterStyleProps>((theme, {collapsed}) => ({
  footer: {
    borderTop: `1px solid ${theme.colors.gray[1]}`,
    minHeight: 50,

    '.mantine-NavLink-body,.mantine-NavLink-label': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '.mantine-NavLink-label': {
      transition: 'transform ease-in-out 0.3s',
      ...(collapsed && {
        transform: 'rotate(180deg)',
      }),
    },
  },
}));

const NavFooter: FC = () => {
  const {collapsed} = useSelector((state) => state.app.navbar);
  const {classes} = useStyle({collapsed}, {name: 'NavbarFooter'});
  const dispatch = useDispatch();

  const handleClick = () => dispatch(slice.actions.toggleNavbar());

  return (
    <Navbar.Section className={classes.footer}>
      <NavLink h={50} label={<IconChevronsLeft />} onClick={handleClick} />
    </Navbar.Section>
  );
};

NavFooter.displayName = 'Layout.Navbar.Footer';
export default NavFooter;
