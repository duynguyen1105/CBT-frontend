import React, { forwardRef, ReactNode } from 'react';
import { Avatar, AvatarProps, Box, createStyles, Group, GroupProps, Text } from '@mantine/core';

export interface UserCardProps extends GroupProps {
  image?: string;
  name?: string;
  secondary?: string;
  icon?: ReactNode;
  avatarProps?: AvatarProps;
}

const useStyle = createStyles<string, {}>(() => ({
  name: {
    flex: 1,
  },
}));

const UserCard = forwardRef<HTMLDivElement, UserCardProps>(function UserCard(props, ref) {
  const { image, name, secondary, icon, avatarProps = {}, ...rest } = props;
  const { classes } = useStyle({});

  return (
    <Group {...rest} ref={ref}>
      {image !== undefined && <Avatar {...avatarProps} src={image} alt={name} />}
      <Box className={classes.name}>
        {!!name && (
          <Text size="sm" weight={500}>
            {name}
          </Text>
        )}
        {!!secondary && (
          <Text color="dimmed" size="xs">
            {secondary}
          </Text>
        )}
      </Box>
      {icon}
    </Group>
  );
});

UserCard.displayName = 'Layout.UserCard';
export default UserCard;
