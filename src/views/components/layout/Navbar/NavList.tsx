import {createStyles} from '@mantine/core';
import {FC, useCallback} from 'react';
import {useLocation} from 'react-router-dom';

import {NavItem} from 'apps/navbar';
import {useSelector} from 'store';

import NavLink from 'views/components/base/NavLink';

export interface NavListProps {
  list: NavItem[];
}

const flatternItemURL = (item: NavItem): Array<RegExp | string> => {
  const rs: Array<RegExp | string> = [];

  item.url && rs.push(item.url);

  if (item.children?.length) {
    item.children.forEach((c) => rs.push(...flatternItemURL(c)));
  }

  return rs;
};

// const {color} = defaultTheme.layout;

const useStyle = createStyles<string, {}>(() => ({
  navLink: {
    padding: 15,
    borderRadius: 0,
    flexFlow: 'row nowrap',
    gap: 10,
    position: 'relative',
    '&:hover': {
      background: '#F9ECEF',
    },
    '&.active': {
      color: '#E1000A',
      background: '#F9ECEF',
      '&:hover': {
        background: '#F9ECEF',
      },
    },
    '&.active::before': {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      content: '""',
      width: 5,
      borderRadius: 0,
      background: '#E1000A',
    },

    '.mantine-NavLink-icon': {
      marginLeft: 10,
      marginRight: 0,
    },

    '.mantine-NavLink-body': {
      height: 20,
      display: 'inline-flex',
    },
  },
}));

const NavList: FC<NavListProps> = (props) => {
  const {list} = props;
  const {classes, cx} = useStyle({}, {name: 'Navbar-List'});
  const {collapsed} = useSelector((state) => state.app.navbar);
  const {pathname} = useLocation();

  const isActive = useCallback(
    (item: NavItem) => {
      const actives = flatternItemURL(item).map((pattern) => {
        if (pattern instanceof RegExp) {
          return !!pathname.match(pattern);
        }

        return pathname === pattern;
      });

      return actives.includes(true);
    },
    [pathname]
  );

  return (
    <>
      {list.map((nav, index) => {
        if (nav.children?.length) {
          return (
            <NavLink
              key={index}
              label={collapsed ? undefined : nav.label}
              icon={nav.icon}
              className={cx(classes.navLink, isActive(nav) && 'active')}
              active={isActive(nav)}
              rightSection={collapsed}
            >
              {!collapsed && <NavList list={nav.children} />}
            </NavLink>
          );
        }

        return (
          <NavLink
            key={index}
            label={collapsed ? undefined : nav.label}
            href={nav.url}
            icon={nav.icon}
            className={cx(classes.navLink, isActive(nav) && 'active')}
            active={isActive(nav)}
          />
        );
      })}
    </>
  );
};

NavList.displayName = 'Navbar.List';
export default NavList;
