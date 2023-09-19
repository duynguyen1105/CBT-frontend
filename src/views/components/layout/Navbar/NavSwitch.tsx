import React, { FC } from 'react';
import { createStyles, Navbar, SegmentedControl } from '@mantine/core';
import { useDispatch, useSelector } from 'store';
import { AppNavbarVariant, slice } from 'slices/app';
import defaultTheme from 'apps/theme';

const { padding, color } = defaultTheme.layout;

const useStyle = createStyles<string, {}>((theme) => ({
  switch: {
    minHeight: 50
  },
  segmented: {
    display: 'flex',
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.gray[9],

    '.mantine-SegmentedControl-label': {
      height: 42,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center'
    },
    '.mantine-SegmentedControl-indicator': {
      height: 42,
      border: '2px solid transparent',
      background: `
        linear-gradient(0deg, rgb(41, 41, 51) 0%, rgb(41, 41, 51) 100%) 
        padding-box padding-box, 
        linear-gradient(99deg, rgb(${color.secondary.rgb}) 0%, rgb(${color.secondary.rgb}) 0%, rgb(${color.primary.rgb}) 100%, rgb(${color.primary.rgb}) 100%) border-box border-box
      `
    }
  },
}));

const NavSwitch: FC = () => {

  const { classes } = useStyle({}, { name: 'NavbarSwitch' });
  const { show, collapsed } = useSelector(state => state.app.navbar);
  const dispatch = useDispatch();

  const handleChange = (value: keyof AppNavbarVariant) => {
    dispatch(slice.actions.switchNavbar(value));
  }

  if (collapsed) {
    return null;
  }

  return (
    <Navbar.Section className={classes.switch} mt={padding}>
      <SegmentedControl
        value={show}
        onChange={handleChange}
        data={[
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' }
        ]}
        className={classes.segmented}
        radius="xl"
      />
    </Navbar.Section>
  );
}

NavSwitch.displayName = 'Layout.Navbar.Switch';
export default NavSwitch;
