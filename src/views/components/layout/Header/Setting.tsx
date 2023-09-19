import React, { FC, MouseEvent } from 'react';
import { Box, createStyles } from '@mantine/core';

import { IconChevronLeft } from '@tabler/icons-react';

import Title from 'views/components/base/Title';
import Button from 'views/components/base/Button';

export interface SettingProps {
  onClickBack(event: MouseEvent<HTMLButtonElement>) : void;
}

const useStyle = createStyles<string, {}>(() => ({
  setting: {
    flex: 1,

    '.setting-header': {
      display: 'flex',
      alignItems: 'center'
    }
  }
}));

const Setting: FC<SettingProps> = props => {

  const { onClickBack } = props;
  const { classes } = useStyle({}, { name: 'HeaderSetting' });

  return (
    <Box className={classes.setting}>
      <Box className="setting-header">
        <Button unstyled href={undefined} onClick={onClickBack} mr={10}>
          <IconChevronLeft size={36} />
        </Button>
        <Title order={3}>Settings</Title>
      </Box>
    </Box>
  );
}

Setting.displayName = 'Header.Setting';
export default Setting;