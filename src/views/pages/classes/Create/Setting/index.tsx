import { Box, Grid, Tabs, Text, TextInput } from '@mantine/core';
import { FC } from 'react';
import { CreateClassesTabs } from '../../util';
import useStyle from './style';
import { DateInput } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';
import RichTextEditorCustom from 'views/components/base/RichTextEditorCustom';
import { DATE_FORMAT } from 'apps/constants';

const Setting: FC = () => {
  const { classes } = useStyle({}, { name: 'CreateClassesSetting' });
  return (
    <Tabs.Panel value={CreateClassesTabs.SETTING}>
      <Grid className={classes.root}>
        <Grid.Col span={12}>
          <TextInput h={50} label="Title" placeholder="Insert Test title text..." />
          <Box mt={24}>
            <RichTextEditorCustom editor={null} label="Question Content" />
          </Box>

          <Box mt={24}>
            <Text fz={16} fw={700}>
              Time
            </Text>
            <Box sx={{ display: 'flex', gap: 24 }}>
              <DateInput
                className={classes.inputDate}
                rightSection={<IconCalendarEvent />}
                w="30%"
                valueFormat={DATE_FORMAT}
                label="Begin"
                placeholder="Select Date Begin"
              />
              <DateInput
                className={classes.inputDate}
                rightSection={<IconCalendarEvent />}
                w="30%"
                valueFormat={DATE_FORMAT}
                label="End"
                placeholder="Select Date End"
              />
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </Tabs.Panel>
  );
};
export default Setting;
