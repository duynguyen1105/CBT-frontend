import React, { FC } from 'react';
import {
  Anchor,
  Avatar,
  Container,
  createStyles,
  Group,
  Header as MHeader,
  Menu,
  Popover,
  Text,
} from '@mantine/core';

import { IconBell, IconLogout, IconSettings, IconUser } from '@tabler/icons-react';

import Image from 'views/components/base/Image';
import Button from 'views/components/base/Button';

import defaultTheme from 'apps/theme';
import PageURL from 'apps/PageURL';

import logo from 'assets/images/logo/cbtlogo.png';
import avatar from 'assets/images/avatar.png';

import NotificationContainer from './NotificationContainer';
import UserCard from '../UserCard';
import Cookies from 'js-cookie';
import { COOKIE_AUTH_TOKEN, STORAGE_USER_INFO } from 'apps/constants';
import { useNavigate } from 'react-router';
import { useGetUserInfo } from 'hooks/useGetUserInfo';

const { header, padding, dropdown } = defaultTheme.layout;

const useStyle = createStyles<string, {}>((theme) => {
  const bgcolor = theme.colorScheme === 'dark' ? theme.colors.gray[9] : undefined;

  return {
    root: {
      backgroundColor: bgcolor,
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
    },
    logo: {
      img: {
        height: `${header.height - 20}px!important`,
        width: 'auto!important',
      },
    },
    menuItem: {
      padding: '15px 20px',

      '.mantine-Menu-itemIcon': {
        marginRight: 15,
      },
    },
  };
});

const Header: FC = () => {
  const { classes } = useStyle({}, { name: 'LayoutHeader' });
  const navigate = useNavigate();
  const userInfo = useGetUserInfo();

  const handleLogout = () => {
    Cookies.remove(COOKIE_AUTH_TOKEN);
    localStorage.removeItem(STORAGE_USER_INFO);
    navigate('/login');
  };

  return (
    <MHeader height={header.height} className={classes.root}>
      <Container fluid className={classes.container} py={0} px={padding}>
        <Anchor href={PageURL.BASE}>
          <Image className={classes.logo} src={logo} alt="CBT" />
        </Anchor>
        <Group>
          <Popover
            shadow="md"
            position="bottom-end"
            offset={20}
            width={dropdown.width.notification}
          >
            <Popover.Target>
              <Button unstyled>
                <IconBell />
              </Button>
            </Popover.Target>
            <Popover.Dropdown mih={520}>
              <NotificationContainer />
            </Popover.Dropdown>
          </Popover>
          <Menu
            position="bottom-end"
            offset={20}
            arrowSize={10}
            width={dropdown.width.profile}
            transitionProps={{
              transition: 'pop',
            }}
          >
            <Menu.Target>
              <Avatar src={avatar} radius="xl" ml={10} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item disabled>
                <UserCard
                  image={avatar}
                  name={userInfo.name}
                  secondary={userInfo.email}
                  avatarProps={{
                    radius: 'xl',
                    size: 45,
                  }}
                />
              </Menu.Item>
              <Menu.Item
                component="a"
                href={PageURL.PROFILE}
                icon={<IconUser size={20} />}
                className={classes.menuItem}
                styles={{
                  icon: {
                    marginRight: 15,
                  },
                }}
              >
                <Text h={20}>Information</Text>
              </Menu.Item>
              <Menu.Item
                component="a"
                icon={<IconLogout size={20} />}
                className={classes.menuItem}
                onClick={handleLogout}
              >
                <Text h={20}>Logout</Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </MHeader>
  );
};

Header.displayName = 'Layout.Header';
export default Header;
