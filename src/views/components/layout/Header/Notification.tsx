import React, { FC, MouseEvent } from 'react';
import { Box, createStyles, Text } from '@mantine/core';

import { IconSettings } from '@tabler/icons-react';

import Title from 'views/components/base/Title';
import Button from 'views/components/base/Button';

export interface NotificationProps {
  onClickSetting(event: MouseEvent<HTMLButtonElement>): void;
}

const useStyle = createStyles<string, {}>(() => ({
  notification: {
    flex: 1,

    '.notification-header': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    '.notification-toolbar': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

const Notification: FC<NotificationProps> = (props) => {
  const { onClickSetting } = props;
  const { classes } = useStyle({}, { name: 'HeaderNotification' });

  return (
    <Box className={classes.notification}>
      <Box className="notification-header">
        <Title order={3}>Notifications</Title>
        <Box className="notification-toolbar">
          <Text fz="sm">Mask all as read</Text>
          <Button unstyled href={undefined} onClick={onClickSetting} ml={10}>
            <IconSettings />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Notification.displayName = 'Header.Notification';
export default Notification;
