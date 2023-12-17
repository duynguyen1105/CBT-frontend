import { Box, Text } from '@mantine/core';
import {
  IconAlarm,
  IconEye,
  IconLayoutDashboard,
  IconListCheck,
  IconMap,
  IconSend,
} from '@tabler/icons-react';
import { FC, useState } from 'react';
import BadgeQuestion from '../base/BadgeQuestion';
import Button from 'views/components/base/Button';
import useStyle from './style';
import DialogSubmit from '../base/DialogSubmit';

const LeftBar: FC = () => {
  const { classes } = useStyle({}, { name: 'LeftBar' });
  const [open, setOpen] = useState<boolean>(false);
  const handleOpenModal = () => {
    setOpen(true);
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.time}>
        <IconAlarm size={32} color="#fff" />
        <Text fz={22} c="#fff" fw={700}>
          119 : 29
        </Text>
      </Box>

      <Box className={classes.listQuestion}>
        <IconLayoutDashboard size={30} />
        <Text fz={18} fw={500}>
          Questions Palette
        </Text>
      </Box>

      <Box className={classes.question}>
        <BadgeQuestion title="1" variant="question" />
        <BadgeQuestion title="2" variant="question" />
        <BadgeQuestion title="3" variant="question" />
        <BadgeQuestion title="4" variant="question" />
        <BadgeQuestion title="5" variant="question" />
        <BadgeQuestion title="6" variant="question" />
        <BadgeQuestion title="7" variant="question" />
        <BadgeQuestion title="8" variant="question" />
        <BadgeQuestion title="9" variant="question" />
        <BadgeQuestion title="10" variant="question" />
        <BadgeQuestion title="11" variant="question" />
        <BadgeQuestion title="12" variant="question" />
        <BadgeQuestion title="13" variant="question" />
        <BadgeQuestion title="14" variant="question" />
        <BadgeQuestion title="15" variant="question" />
        <BadgeQuestion title="16" variant="question" />
        <BadgeQuestion title="17" variant="question" />
        <BadgeQuestion title="18" variant="question" />
        <BadgeQuestion title="19" variant="question" />
        <BadgeQuestion title="20" variant="question" />
        <BadgeQuestion title="21" variant="question" />
        <BadgeQuestion title="22" variant="question" />
        <BadgeQuestion title="23" variant="question" />
        <BadgeQuestion title="24" variant="question" />
        <BadgeQuestion title="25" variant="question" />
        <BadgeQuestion title="26" variant="question" />
        <BadgeQuestion title="27" variant="question" />
        <BadgeQuestion title="28" variant="question" />
        <BadgeQuestion title="29" variant="question" />
        <BadgeQuestion title="30" variant="question" />
      </Box>

      <Box p={12}>
        <Box sx={{ display: 'flex', gap: 12 }}>
          <IconListCheck />
          <Text fz={16}>Preview list</Text>
        </Box>
        <Box mt={8} sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <BadgeQuestion title="1" variant="question" />
          <BadgeQuestion title="2" variant="question" />
          <BadgeQuestion title="3" variant="question" />
          <BadgeQuestion title="4" variant="question" />
          <BadgeQuestion title="5" variant="question" />
          <BadgeQuestion title="6" variant="question" />
          <BadgeQuestion title="7" variant="question" />
          <BadgeQuestion title="8" variant="question" />
          <BadgeQuestion title="9" variant="question" />
          <BadgeQuestion title="10" variant="question" />
          <BadgeQuestion title="11" variant="question" />
          <BadgeQuestion title="12" variant="question" />
        </Box>
      </Box>

      <Box pl={12} sx={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Button fw={400} w={123} rightIcon={<IconEye />}>
          Review
        </Button>
        <Button onClick={handleOpenModal} fw={400} w={123} rightIcon={<IconSend />}>
          Submit
        </Button>
        <Button fw={400} w={123} rightIcon={<IconMap />}>
          Solution
        </Button>
      </Box>

      <DialogSubmit open={open} onClose={() => setOpen(false)} />
    </Box>
  );
};

export default LeftBar;
