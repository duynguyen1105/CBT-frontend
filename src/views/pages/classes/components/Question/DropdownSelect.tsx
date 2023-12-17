import { Group, Select, Text } from '@mantine/core';
import { FC } from 'react';
import BadgeQuestion from '../base/BadgeQuestion';
import useStyle from './style';
import { IconChevronDown } from '@tabler/icons-react';

const DropdownSelect: FC = () => {
  const { classes } = useStyle({}, { name: 'QuestionComponent' });
  return (
    <>
      <Text fz={13} p={8} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        Another example of cheap technology helping poor people in the countryside is
        <Group my={12}>
          <BadgeQuestion title={'12'} variant="question" />
          <Select
            className={classes.selectCustom}
            rightSection={<IconChevronDown size="1rem" />}
            data={[]}
          />
        </Group>{' '}
        Kerosene lamps and conventional bulbs give off less{' '}
        <Group my={12}>
          <BadgeQuestion title={'12'} variant="question" />
          <Select
            className={classes.selectCustom}
            rightSection={<IconChevronDown size="1rem" />}
            data={[]}
          />
        </Group>{' '}
        than many villages are{' '}
        <Group my={12}>
          <BadgeQuestion title={'12'} variant="question" />
          <Select
            className={classes.selectCustom}
            rightSection={<IconChevronDown size="1rem" />}
            data={[]}
          />
        </Group>{' '}
        GSBF lamps would be cheaper if it weren’t for{' '}
        <Group my={12}>
          <BadgeQuestion title={'12'} variant="question" />
          <Select
            className={classes.selectCustom}
            rightSection={<IconChevronDown size="1rem" />}
            data={[]}
          />
        </Group>{' '}
        Users need to wipe{' '}
        <Group my={12}>
          <BadgeQuestion title={'12'} variant="question" />
          <Select
            className={classes.selectCustom}
            rightSection={<IconChevronDown size="1rem" />}
            data={[]}
          />
        </Group>{' '}
        from the LED in order to keep it working well.
      </Text>
    </>
  );
};

export default DropdownSelect;
