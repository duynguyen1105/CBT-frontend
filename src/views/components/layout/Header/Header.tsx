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

import { IconBell, IconLogout, IconSettings } from '@tabler/icons-react';

import Image from 'views/components/base/Image';
import Button from 'views/components/base/Button';

import defaultTheme from 'apps/theme';
import PageURL from 'apps/PageURL';

import logo from 'assets/images/logo/cbtlogo.png';
import avatar from 'assets/images/avatar.png';

import NotificationContainer from './NotificationContainer';
import UserCard from '../UserCard';

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
                  name="Ken Nguyen"
                  secondary="CBT Team"
                  avatarProps={{
                    radius: 'xl',
                    size: 45,
                  }}
                />
              </Menu.Item>
              <Menu.Item
                component="a"
                href={PageURL.ACCOUNT_SETTING}
                icon={<IconSettings size={20} />}
                className={classes.menuItem}
                styles={{
                  icon: {
                    marginRight: 15,
                  },
                }}
              >
                <Text h={20}>Settings</Text>
              </Menu.Item>
              <Menu.Item
                component="a"
                href={PageURL.LOGOUT}
                icon={<IconLogout size={20} />}
                className={classes.menuItem}
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
