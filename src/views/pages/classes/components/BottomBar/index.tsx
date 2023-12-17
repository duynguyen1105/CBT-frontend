import { ActionIcon, Box, Text } from '@mantine/core';
import {
  IconAlarm,
  IconChevronUp,
  IconEye,
  IconLayoutDashboard,
  IconMap,
  IconSend,
} from '@tabler/icons-react';
import { FC, useState } from 'react';
import Button from 'views/components/base/Button';
import useStyle from './style';
import DialogSubmit from '../base/DialogSubmit';

const BottomBar: FC = () => {
  const { classes } = useStyle({}, { name: 'BottomBar' });
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box className={classes.root}>
      <Box className={classes.left}>
        <IconLayoutDashboard size={30} />
        <Text fz={18} fw={500}>
          Questions Palette
        </Text>
      </Box>

      <Box className={classes.center}>
        <IconAlarm size={32} color="#fff" />
        <Text fz={22} c="#fff" fw={700}>
          119 : 29
        </Text>
      </Box>
      <Box className={classes.right}>
        <Box pl={12} sx={{ display: 'flex', gap: 12 }}>
          <Button className={classes.btn} rightIcon={<IconEye />}>
            Review
          </Button>
          <Button onClick={() => setOpen(true)} className={classes.btn} rightIcon={<IconSend />}>
            Submit
          </Button>
          <Button className={classes.btn} rightIcon={<IconMap />}>
            Solution
          </Button>
          <ActionIcon variant="transparent" sx={{ display: 'grid', placeItems: 'center' }}>
            <IconChevronUp color="#fff" size={32} />
          </ActionIcon>
        </Box>
      </Box>

      <DialogSubmit open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default BottomBar;
